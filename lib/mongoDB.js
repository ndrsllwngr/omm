import { MongoClient } from 'mongodb'

const MONGO_DB_URI = process.env.NEXT_PUBLIC_MONGODB_URI
const MONGO_DB_NAME = process.env.NEXT_PUBLIC_MONGODB_DB_NAME

// Get a valid Realm user access token to authenticate requests
export async function getMongoDBClient() {
  const client = await MongoClient.connect(MONGO_DB_URI)
  return client.db(MONGO_DB_NAME)
}
