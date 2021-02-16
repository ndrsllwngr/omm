import Archiver from 'archiver'
import { MONGODB_COLLECTION } from '@/lib/constants'
import { getMongoDBClient } from '@/lib/mongoDB'
import { fabric } from 'fabric'
import IncomingForm from 'formidable-serverless'
import { createFsFromVolume, Volume } from 'memfs'
import unzipper from 'unzipper'

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

      // Initialize archiver
      let archiver = Archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
      })

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
      // Create new in-memory volume
      const vol = new Volume()
      // Create filesystem from volume
      const fs = createFsFromVolume(vol)
      // Root folder for files
      const rootFolder = './unzip/'
      vol.mkdirSync(rootFolder, { recursive: true })

      // Promise for retrieving the zip file
      let zipPromise = null
      // Initialize variable for zip file
      let content = null

      // Overriding the onPart functions in order to be able to parse the file as a stream into the in-memory fs
      form.onPart = function (part) {
        console.log({ part })
        // Only accept .zip files
        if (!part.filename.includes('.zip')) {
          res.status(400).end(`Wrong filetype: ${part.filename}`)
        }
        if (part.name === 'content') {
          console.log(part.filename)
          let filename = rootFolder + part.filename
          // Add filename to list of filenames
          content = filename
          // Create a new stream for writing to the new file
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

        console.log({ content, zipPromise })

        if (!content) {
          res
            .status(400)
            .end(
              `No 'content' provided, please add a field called 'content' pointing to a .zip file to your 'form-data'`
            )
        }
        // List of promises for processing all the zip files
        const unzipTasks = []
        // Create a stream from the zip
        const zip = fs.createReadStream(content).pipe(unzipper.Parse({ forceStream: true }))

        // Iterate over all the entries in the zip file
        for await (const entry of zip) {
          // Ignore cache folders, hidden files & files which do not end with do not end with .jpg or .png
          if (
            entry.path.startsWith('_') ||
            entry.path.startsWith('.') ||
            !(entry.path.endsWith('.png') || !entry.path.endsWith('.jpg'))
          ) {
            console.log(`Ignoring file ${entry.path} - wrong type`)
            continue
          }

          // Create a new stream for writing to the new file created in the memfs
          let writeStream = fs.createWriteStream(rootFolder + entry.path)

          // Pipe the data from inside the .zip into the memfs file
          entry.pipe(writeStream)
          // Add a new promise to the unzipTasks
          unzipTasks.push(new Promise((fulfill) => writeStream.on('finish', fulfill)))
        }
        console.log(unzipTasks)
        // Wait for all unzipping promises to fulfill
        await Promise.all(unzipTasks)
        // Remove .zip file
        fs.unlinkSync(content)
        fs.readdirSync(rootFolder).forEach((file) => {
          console.log(file)
        })

        // Remove all files from the volume
        vol.reset()
        // If it ran until here: It worked! :P
        res.status(200).end('Successfully unzipped')
      })

      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
