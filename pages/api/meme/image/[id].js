import { MONGODB_COLLECTION } from '@/lib/constants'
import { getMongoDBClient } from '@/lib/mongoDB'
import ObjectID from 'bson-objectid'
import { getFabric } from '@/lib/canvas'

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

      //Get the json for the canvas from the meme
      const memeJSON = JSON.parse(meme.json)
      //Get the width & height for the canvas from the meme
      const width = memeJSON.width
      const height = memeJSON.height

      // Get fabric
      const fabric = getFabric()
      // Create a new canvas with the desired sizes
      const canvas = new fabric.StaticCanvas(null, { width: width, height: height })

      // Set the response header
      res.setHeader('Content-Type', 'image/png')
      // If the download flag is set -> set the download header
      if (download === 'true') {
        res.setHeader('Content-disposition', `attachment; filename=${id}.png`)
      }

      // Load the JSON on the canvas
      canvas.loadFromJSON(memeJSON, () => {
        // Render the canvas
        canvas.renderAll()

        //Create a .png stream from the canvas
        const stream = canvas.createPNGStream()
        //Write the Stream to the response
        stream.on('data', (chunk) => {
          res.write(chunk)
        })
        // When Stream is done end the response
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
