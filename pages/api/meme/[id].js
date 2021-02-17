import { MONGODB_COLLECTION } from '@/lib/constants'
import { getMongoDBClient } from '@/lib/mongoDB'
import ObjectID from 'bson-objectid'

export default async function memeHandler(req, res) {
  const {
    query: { id },
    method,
  } = req

  // Initialize mongodb variables
  const db = await getMongoDBClient()
  const memeCollection = db.collection(MONGODB_COLLECTION.MEMES)

  switch (method) {
    case 'GET':
      // Get meme from Firestore
      const meme = await memeCollection.findOne({ _id: new ObjectID(id) }, {})
      // When meme doesn't exist return 404
      if (!meme) {
        res.status(404).end(`Meme with id ${id} Not Found`)
        break
      }

      // Add download URL to response
      //TODO improve download URL by dynamically adding HOST_NAME
      meme.downloadURL = `http://localhost:3000/api/meme/image/${meme._id}?download=true`
      // Add embed URL to response
      //TODO dynamically add HOST_NAME
      meme.embedURL = `http://localhost:3000/api/meme/image/${meme._id}`
      // Return meme data
      res.status(200).json(meme)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
