import firebase from '@/lib/firebaseNode'

export default async function memeHandler(req, res) {
  const {
    query: {},
    method,
  } = req

  const db = firebase.firestore()
  const memeCollection = db.collection('memes')
  const templatesCollection = db.collection('templates')

  switch (method) {
    case 'PUT':
      // TODO make it work with a list of content
      const content = req.body.content
      const template_id = req.body.template

      // Create new meme in Firestore
      const document = memeCollection.doc()
      // Create meme data
      const memeData = {
        id: document.id,
        content: content,
        template: templatesCollection.doc(template_id),
        created_at: firebase.firestore.Timestamp.now(),
        // TODO CREATED_BY, UP and DOWN votes etc.
      }
      // Upload meme data to Firestore
      await document.set(memeData)

      // Substitute template document ref with template id
      memeData.template = template_id
      // Add download URL to response
      //TODO improve download URL by dynamically adding HOST_NAME
      memeData.downloadURL = `http://localhost:3000/api/meme/image/${document.id}`
      memeData.downloadURL = `http://localhost:3000/api/meme/image/${meme.id}?download=true`
      memeData.embedURL = `http://localhost:3000/api/meme/image/${meme.id}`
      res.status(200).json(memeData)
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
