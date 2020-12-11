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
  const memeCollection = db.collection('meme')

  switch (method) {
    case 'GET':
      // Get data from your database
      const meme = await memeCollection.doc(id).get()
      if (meme.exists) {
        const memeData = meme.data()
        const storage = firebase.storage().bucket()

        const tmpobj = tmp.fileSync({ postfix: '.jpg' })
        const options = {
          // The path to which the file should be downloaded, e.g. "./file.txt"
          destination: tmpobj.name,
        }

        // Downloads the file
        await storage.file(memeData.img).download(options)

        // Write content on meme base img
        await writeToImage(tmpobj.name, memeData.content)

        const imageBuffer = fs.readFileSync(tmpobj.name)
        res.setHeader('Content-Type', 'image/jpg')
        res.send(imageBuffer)

        // Delete the temporary file
        tmpobj.removeCallback()
      } else {
        res.status(404)
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
