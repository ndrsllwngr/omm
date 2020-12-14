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
      const template = req.body.template

      // Create new Firebase document id
      const document = memeCollection.doc()
      const documentData = {
        id: document.id,
        content: content,
        template: templatesCollection.doc(template),
        created_at: firebase.firestore.Timestamp.now(),
        // CREATED_BY, UP and DOWN votes etc.
      }
      await document.set(documentData)
      //TODO improve download URL by dynamically adding HOST_NAME
      documentData.template = template
      documentData.downloadURL = 'http://localhost:3000/api/meme/image/' + document.id
      res.status(200).json(documentData)
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
