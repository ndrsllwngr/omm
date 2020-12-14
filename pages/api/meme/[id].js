import firebase from '@/lib/firebaseNode'

export default async function memeHandler(req, res) {
  const {
    query: { id },
    method,
  } = req

  const db = firebase.firestore()
  const memeCollection = db.collection('memes')

  switch (method) {
    case 'GET':
      const meme = await memeCollection.doc(id).get()
      // Get data from your database
      if (meme.exists) {
        const memeData = meme.data()
        memeData.template = memeData.template.id
        memeData.downloadURL = `http://localhost:3000/api/meme/image/${meme.id}`
        console.log(memeData)
        res.status(200).json(memeData)
      } else {
        res.status(404)
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
