import firebase from '@/lib/firebaseNode'

const db = firebase.firestore()
const memeCollection = db.collection('memes')

export default async function handler(req, res) {
  const memes = await memeCollection.get()
  // Get data from your database
  res.status(200).json(
    memes.docs.map((meme) => {
      const memeData = meme.data()
      memeData.template = memeData.template.id
      memeData.downloadURL = `http://localhost:3000/api/meme/image/${meme.id}?download=true`
      memeData.embedURL = `http://localhost:3000/api/meme/image/${meme.id}`
      return memeData
    })
  )
}
