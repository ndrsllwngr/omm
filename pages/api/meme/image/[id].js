import firebase from '@/lib/firebaseNode'
import tmp from 'tmp'
import fs from 'fs'
import writeToImage from '@/helpers/imageProcessing'

export default async function memeHandler(req, res) {
  const {
    query: { id },
    method,
  } = req

  const db = firebase.firestore()
  const memeCollection = db.collection('memes')

  switch (method) {
    case 'GET':
      // Get data from your database
      const meme = await memeCollection.doc(id).get()
      const template = await meme.data().template.get()
      if (meme.exists) {
        const memeData = meme.data()
        const storage = firebase.storage().bucket()

        const tmpObj = tmp.fileSync({ postfix: '.jpg' })
        const options = {
          destination: tmpObj.name,
        }

        // Downloads the file
        await storage.file(template.data().img).download(options)

        // Write content on meme base img
        await writeToImage(tmpObj.name, memeData.content)

        const imageBuffer = fs.readFileSync(tmpObj.name)
        res.setHeader('Content-Type', 'image/jpg')
        res.send(imageBuffer)

        // Delete the temporary file
        tmpObj.removeCallback()
      } else {
        res.status(404)
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
