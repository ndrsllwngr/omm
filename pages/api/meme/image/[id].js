import firebase from '@/lib/firebaseNode'
import tmp from 'tmp'
import fs from 'fs'
import { writeMemeContentToImage } from '@/helpers/imageProcessing'

export default async function memeHandler(req, res) {
  const {
    query: { id, download },
    method,
  } = req

  // Initialize firebase variables
  const db = firebase.firestore()
  const memeCollection = db.collection('memes')
  const storage = firebase.storage().bucket()

  switch (method) {
    case 'GET':
      // Get meme from Firestore
      const meme = await memeCollection.doc(id).get()
      // When meme doesn't exist return 404
      if (!meme.exists) {
        res.status(404).end(`Meme with id ${id} Not Found`)
        break
      }

      const template = await meme.data().template.get()
      const imgFileType = template.data().img.split('.').pop()

      // Create temporary object
      const tmpObj = tmp.fileSync({ postfix: `.${imgFileType}` })

      // Download the file from the Firebase storage
      await storage.file(template.data().img).download({
        // Path to download the file to
        destination: tmpObj.name,
      })

      // Write content on meme base img
      await writeMemeContentToImage(tmpObj.name, meme.data().content)

      // Read image into buffer
      const imageBuffer = fs.readFileSync(tmpObj.name)

      // Set header
      res.setHeader('Content-Type', `image/${imgFileType}`)
      if (download === 'true') {
        res.setHeader('Content-disposition', `attachment; filename=${id}.${imgFileType}`)
      }
      res.send(imageBuffer)

      // Delete the temporary file
      tmpObj.removeCallback()

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
