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
      const meme = memeCollection.doc()
      // Create meme data
      const memeData = {
        content: content,
        template: templatesCollection.doc(template_id),
        createdAt: firebase.firestore.Timestamp.now(),
        // TODO CREATED_BY, UP and DOWN votes etc.
      }
      // Upload meme data to Firestore
      await meme.set(memeData)

      // Add id to response
      memeData.id = meme.id
      // Substitute template document ref with template id
      memeData.template = template_id
      // Add download URL to response
      //TODO dynamically add HOST_NAME
      memeData.downloadURL = `http://localhost:3000/api/meme/image/${meme.id}?download=true`
      // Add embed URL to response
      //TODO dynamically add HOST_NAME
      memeData.embedURL = `http://localhost:3000/api/meme/image/${meme.id}`
      res.status(200).json(memeData)
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
