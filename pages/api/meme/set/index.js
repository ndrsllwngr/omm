import Archiver from 'archiver'
import { MONGODB_COLLECTION } from '@/lib/constants'
import { getMongoDBClient } from '@/lib/mongoDB'
import IncomingForm from 'formidable-serverless'
import unzipper from 'unzipper'
import { clearDirectory, getMemoryFSPath, memoryFs } from '@/lib/memoryFs'
import { getFabric } from '@/lib/canvas'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function memeHandler(req, res) {
  const {
    //TODO filter & search
    query: { search, limit },
    method,
  } = req

  // Initialize mongodb variables
  const db = await getMongoDBClient()
  const memeCollection = db.collection(MONGODB_COLLECTION.MEMES)
  const fabric = getFabric()
  // Initialize archiver
  const archiver = Archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  })

  switch (method) {
    // Using:
    // https://www.npmjs.com/package/archiver
    // https://www.npmjs.com/package/fabric
    case 'GET':
      const lim = parseInt(limit)
      if (lim && lim <= 0) {
        res.status(400).end('Limit has to be a positive number')
        break
      }

      const re = '(?i)' + search
      const query = { title: { $regex: re } }

      const memes = await (lim
        ? memeCollection.find(query).limit(lim)
        : memeCollection.find(query)
      ).toArray()

      console.log({ memes: memes.map((meme) => meme.title), query })

      if (memes.length <= 0) {
        res.status(404).end('No memes matching the provided criteria found')
        break
      }

      // Set headers for response
      res.setHeader('Content-Type', 'application/zip')
      res.setHeader('Content-disposition', 'attachment; filename=memes.zip')
      // Send the file to the route output.
      archiver.pipe(res)

      const imageTasks = memes.map((meme) => {
        return new Promise((resolve, reject) => {
          const memeJSON = JSON.parse(meme.json)
          const width = memeJSON.width
          const height = memeJSON.height

          const canvas = new fabric.StaticCanvas(null, { width: width, height: height })

          canvas.loadFromJSON(memeJSON, () => {
            canvas.renderAll()

            const stream = canvas.createPNGStream()
            stream.on('end', resolve)
            stream.on('error', reject)
            archiver.append(stream, { name: `${meme._id.toString()}.png` })
          })
        })
      })
      // Finalize stream
      Promise.all(imageTasks).then(() => {
        archiver.finalize()
      })

      break

    // Using:
    // https://www.npmjs.com/package/unzipper
    // https://www.npmjs.com/package/formidable
    // https://www.npmjs.com/package/memfs
    case 'PUT':
      // Define new form ('form-data' request body type)
      const form = new IncomingForm()
      form.maxFileSize = 100 * 1024 * 1024
      form.keepExtensions = true
      form.multiples = true

      // Filesystem needs to be imported like this in order for the fs to be patched
      const fs = memoryFs()
      // Root folder for files
      const rootFolder = getMemoryFSPath(Date.now() + '/')
      fs.mkdirSync(rootFolder, { recursive: true })

      // Promise for retrieving the zip file
      let zipPromise = null
      // Initialize variable for zip file
      let content = null

      // Overriding the onPart functions in order to be able to parse the file as a stream into the in-memory fs
      form.onPart = function (part) {
        if (part.name === 'content') {
          // Only accept .zip files
          if (!part.filename.includes('.zip')) {
            res.status(400).end(`Wrong filetype: ${part.filename}`)
          }
          let filename = rootFolder + part.filename
          // Add filename to list of filenames
          content = filename
          // Create a new stream for writing to the new file

          // Create empty file
          // Necessary due to https://github.com/streamich/unionfs/issues/428
          const fd = fs.openSync(filename, 'w')
          let writeStream = fs.createWriteStream(filename)
          // Pipe the data from the request into the new in memory zip file
          part.pipe(writeStream)
          // Add a promise to the retrieval task list to be able to wait for them
          zipPromise = new Promise((fulfill) => writeStream.on('finish', fulfill))
        }
      }

      // Parse the form
      await form.parse(req, async (err, fields, files) => {
        // Wait for the retrieval of all the zips from the request
        // Hint: All of the calls of the previous function will actually be fullfilled here
        await zipPromise
        // If no content was provided return 400
        if (!content) {
          res
            .status(400)
            .end(
              `No 'content' provided, please add a field called 'content' pointing to a .zip file to your 'form-data'`
            )
          return
        }
        // List of promises for processing all the zip files
        const unzipTasks = []
        // Create a stream from the zip
        const zip = fs.createReadStream(content).pipe(unzipper.Parse({ forceStream: true }))

        // Iterate over all the entries in the zip file
        for await (const entry of zip) {
          // Ignore cache folders, hidden files & files which do not end with do not end with .jpg, .png or .json
          if (
            entry.path.startsWith('_') ||
            entry.path.startsWith('.') ||
            (!entry.path.endsWith('.png') &&
              !entry.path.endsWith('.jpg') &&
              !entry.path.endsWith('.json'))
          ) {
            console.log(`Ignoring file ${entry.path} - wrong type`)
            continue
          }

          // Create empty file
          // Necessary due to https://github.com/streamich/unionfs/issues/428
          const fd = fs.openSync(rootFolder + entry.path, 'w')

          // Create a new stream for writing to the new file created in the memfs
          let writeStream = fs.createWriteStream(rootFolder + entry.path)

          // Pipe the data from inside the .zip into the memfs file
          entry.pipe(writeStream)
          // Add a new promise to the unzipTasks
          unzipTasks.push(new Promise((fulfill) => writeStream.on('finish', fulfill)))
        }
        // Wait for all unzipping promises to fulfill
        await Promise.all(unzipTasks)
        // Remove .zip file
        fs.unlinkSync(content)

        fs.readFile(rootFolder + 'content.json', async (err, data) => {
          if (err) {
            // Remove the files from the rootFolder
            clearDirectory(rootFolder)
            res.status(400).end('Error when parsing content.json: ' + err.message)
            return
          }
          try {
            let content = JSON.parse(data)

            // Set headers for response
            res.setHeader('Content-Type', 'application/zip')
            res.setHeader('Content-disposition', 'attachment; filename=memes.zip')
            // Send the zip file we are about to create to the route output.
            archiver.pipe(res)
            // List of meme creation promises
            const memeTasks = []

            // UGLY fix
            // This is an ugly but necessary fix since for some reason the first image rendered will always be blank
            // So here a file called .empty with the first blank image is created
            // Images are apparently like pancakes, the first one is always shit
            let canvas = new fabric.StaticCanvas(null, { width: 0, height: 0 })
            canvas.renderAll()
            const stream = canvas.createPNGStream()
            archiver.append(stream, { name: `.empty` })
            memeTasks.push(
              new Promise((resolve, reject) => {
                stream.on('end', resolve)
                stream.on('error', reject)
              })
            )
            //UGLY fix end
            for (const [i, meme] of content.memes.entries()) {
              // This is the base image we are using for the current meme
              const img = meme.file

              // Iterate over all the contents we want to create memes from (one meme per content)
              for (const [j, content] of meme.contents.entries()) {
                const width = content.width
                const height = content.height

                // Create a new canvas
                let canvas = new fabric.StaticCanvas(null, { width: width, height: height })

                // For all content type images which have img as their src => fix the src to work with the memfs
                content.objects = content.objects.map((object) => {
                  if (object.type === 'image' && object.src === img) {
                    object.src = `file://${rootFolder + img}`
                  }
                  return object
                })

                // Load the content onto the canvas
                canvas = await canvas.loadFromJSON(content)

                // Render the canvas
                canvas.renderAll()

                // Create a stream for creating a png file from the canvas
                const stream = canvas.createPNGStream()
                // Append the file stream to the zip
                archiver.append(stream, { name: `${i}_${j}.png` })
                // Create a promise in order to be able to wait for the meme creation to finish
                memeTasks.push(
                  new Promise((resolve, reject) => {
                    stream.on('end', resolve)
                    stream.on('error', reject)
                  })
                )
              }
            }
            // Wait for meme creation tasks to finish
            await memeTasks
            // Finalize stream
            await archiver.finalize()
          } catch (e) {
            res.status(400).end('Error when parsing content.json: ' + e.message)
          } finally {
            // Remove the files from the rootFolder
            clearDirectory(rootFolder)
          }
        })
      })

      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
