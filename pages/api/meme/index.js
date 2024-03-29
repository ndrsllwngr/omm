import { MONGODB_COLLECTION } from '@/lib/constants'
import { getMongoDBClient } from '@/lib/mongoDB'
import ObjectID from 'bson-objectid'

export default async function memeHandler(req, res) {
  const { method } = req

  // Initialize mongodb variables
  const db = await getMongoDBClient()
  const memeCollection = db.collection(MONGODB_COLLECTION.MEMES)

  switch (method) {
    case 'PUT':
      // Get the meme from the request body
      let meme = req.body
      // Remove any existing id
      delete meme['_id']
      // Parse ObjectIDs
      if (meme.template?.$oid) {
        meme.template = new ObjectID(meme.template.$oid)
      } else {
        delete meme['template']
      }
      meme.createdBy = new ObjectID(meme.createdBy.$oid)
      if (meme.forkedFrom?.$oid) {
        meme.forkedFrom = new ObjectID(meme.forkedFrom.$oid)
      } else {
        delete meme['forkedFrom']
      }
      // Set createdAt
      meme.createdAt = new Date()
      // Reset variables
      meme.comments = []
      meme.commentCount = 0
      meme.upVotes = []
      meme.downVotes = []
      meme.points = 0
      meme.views = 0

      // Insert into mongoDB
      let result = await memeCollection.insertOne(meme)

      // Return inserted Object
      res.json(result.ops[0])
      break

    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
