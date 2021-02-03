import Archiver from 'archiver'
import { MONGODB_COLLECTION } from '@/lib/constants'
import { getMongoDBClient } from '@/lib/mongoDB'
import ObjectID from 'bson-objectid'
import { fabric } from 'fabric'

export default async function memeHandler(req, res) {
  const {
    //TODO filter & search
    query: {},
    method,
  } = req

  // Initialize mongodb variables
  const db = await getMongoDBClient()
  const memeCollection = db.collection(MONGODB_COLLECTION.MEMES)

  switch (method) {
    case 'POST':
      // Get ids from request body
      const ids = req.body.ids

      const objectIDs = ids.map((id) => {
        return new ObjectID(id)
      })
      //TODO search params
      const memes = await memeCollection.find({ _id: { $in: objectIDs } }).toArray()

      if (memes.length <= 0) {
        res.status(404).end('No memes matching the provided criteria found')
        break
      }

      // Initialize archiver
      let zip = Archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
      })

      // Set headers for response
      res.setHeader('Content-Type', 'application/zip')
      res.setHeader('Content-disposition', 'attachment; filename=memes.zip')
      // Send the file to the route output.
      zip.pipe(res)

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
            zip.append(stream, { name: `${meme._id.toString()}.png` })
          })
        })
      })
      // Finalize stream
      Promise.all(imageTasks).then(() => {
        zip.finalize()
      })

      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
