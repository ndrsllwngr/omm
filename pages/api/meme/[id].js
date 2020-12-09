import firebase from '@/lib/firebaseNode'

export default async function memeHandler(req, res) {
  const {
    query: { id },
    method,
  } = req

  const db = firebase.firestore()
  const memeCollection = db.collection('meme')

  switch (method) {
    case 'GET':
      const meme = await memeCollection.doc(id).get()
      // Get data from your database
      if (meme.exists) {
        res.status(200).json(meme.data())
      } else {
        res.status(404)
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
