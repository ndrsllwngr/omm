import firebase from '@/lib/firebaseNode'

export default async function memeHandler(req, res) {
  const {
    query: { id },
    method,
  } = req

  // Initialize firebase variables
  const db = firebase.firestore()
  const memeCollection = db.collection('memes')

  switch (method) {
    case 'GET':
      // Get meme from Firestore
      const meme = await memeCollection.doc(id).get()
      // When meme doesn't exist return 404
      if (!meme.exists) res.status(404).end(`Meme with id ${id} Not Found`)

      const memeData = meme.data()
      // Substitute template document ref with template id
      memeData.template = memeData.template.id
      // Add download URL to response
      //TODO improve download URL by dynamically adding HOST_NAME
      memeData.downloadURL = `http://localhost:3000/api/meme/image/${meme.id}`
      // Return meme data
      res.status(200).json(memeData)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
