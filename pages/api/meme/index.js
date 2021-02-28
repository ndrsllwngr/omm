import Archiver from 'archiver'
import { MONGODB_COLLECTION } from '@/lib/constants'
import { getMongoDBClient } from '@/lib/mongoDB'
import IncomingForm from 'formidable-serverless'
import unzipper from 'unzipper'
import { clearDirectory, getCustomFSPath, customFs } from '@/lib/customFs'
import { getFabric } from '@/lib/canvas'
import ObjectID from 'bson-objectid'

export default async function memeHandler(req, res) {
  const { method } = req

  // Initialize mongodb variables
  const db = await getMongoDBClient()
  const memeCollection = db.collection(MONGODB_COLLECTION.MEMES)

  switch (method) {
    case 'PUT':
      let meme = req.body

      delete meme['_id']
      meme.template = new ObjectID(meme.template.$oid)
      meme.createdBy = new ObjectID(meme.createdBy.$oid)
      meme.createdAt = new Date()
      meme.comments = []
      meme.commentCount = 0
      meme.upVotes = []
      meme.downVotes = []
      meme.points = 0
      meme.views = 0

      let result = await memeCollection.insertOne(meme)
      res.json(result.ops[0])
      break

    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
