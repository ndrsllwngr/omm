import { fabric } from 'fabric'
import { MONGODB_COLLECTION } from '@/lib/constants'
import { getMongoDBClient } from '@/lib/mongoDB'
import ObjectID from 'bson-objectid'
import path from 'path'
import { registerFont } from 'canvas'

export default async function memeHandler(req, res) {
  const {
    query: { id, download },
    method,
  } = req

  // Initialize mongodb variables
  const db = await getMongoDBClient()
  const memeCollection = db.collection(MONGODB_COLLECTION.MEMES)

  switch (method) {
    case 'GET':
      // Get meme from MongoDB
      const meme = await memeCollection.findOne({ _id: new ObjectID(id) }, {})
      // When meme doesn't exist return 404
      if (!meme) {
        res.status(404).end(`Meme with id ${id} Not Found`)
        break
      }

      const memeJSON = JSON.parse(meme.json)
      const width = memeJSON.width
      const height = memeJSON.height

      const canvas = new fabric.StaticCanvas(null, { width: width, height: height })

      try {
        registerFont(path.resolve('./public/assets/fonts/Anton-Regular.ttf'), { family: 'Anton' })
        registerFont(path.resolve('./public/assets/fonts/Allan-Regular.ttf'), { family: 'Allan' })
        registerFont(path.resolve('./public/assets/fonts/ComicNeue-Regular.ttf'), {
          family: 'Comic Neue',
        })
      } catch (e) {
        console.log(e)
      }

      res.setHeader('Content-Type', 'image/png')
      if (download === 'true') {
        res.setHeader('Content-disposition', `attachment; filename=${id}.png`)
      }

      canvas.loadFromJSON(memeJSON, () => {
        canvas.renderAll()

        const stream = canvas.createPNGStream()
        stream.on('data', (chunk) => {
          res.write(chunk)
        })
        stream.on('end', () => {
          res.end()
        })
      })

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
