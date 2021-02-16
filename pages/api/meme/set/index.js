import Archiver from 'archiver'
import { MONGODB_COLLECTION } from '@/lib/constants'
import { getMongoDBClient } from '@/lib/mongoDB'
import { fabric } from 'fabric'
import IncomingForm from 'formidable-serverless'

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
    case 'PUT':
      const form = new IncomingForm()
      form.maxFileSize = 100 * 1024 * 1024
      form.keepExtensions = true
      form.multiples = true

      form.onPart = function (part) {
        console.log({ part })
        if (!part.filename) {
          // let formidable handle all non-file parts
          //form.handlePart(part)
          return
        }
      }
      form.parse(req, function (err, fields, files) {
        console.log({ err, fields, files })
      })

      if (!req.body) {
        res.status(400).end('No file uploaded')
      } else {
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
