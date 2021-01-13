import firebase from '@/lib/firebaseNode'
import tmp from 'tmp'
import { writeMemeContentToImage } from '@/helpers/imageProcessing'
import Archiver from 'archiver'
import { FIRESTORE_COLLECTION } from '@/lib/constants'

export default async function memeHandler(req, res) {
  const {
    //TODO filter & search
    query: {},
    method,
  } = req

  // Initialize firebase variables
  const db = firebase.firestore()
  const memeCollection = db.collection(FIRESTORE_COLLECTION.MEMES)
  const storage = firebase.storage().bucket()

  switch (method) {
    case 'POST':
      // Get ids from request body
      const ids = req.body.ids

      // Initialize empty list of meme image files
      const tmpImgFiles = []

      // Initialize archiver
      let zip = Archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
      })
      // Set headers for response
      res.setHeader('Content-Type', 'application/zip')
      res.setHeader('Content-disposition', 'attachment; filename=memes.zip')
      // Send the file to the route output.
      zip.pipe(res)

      // Iterate over all ids passed in the route
      for (let id of ids) {
        // Get meme from Firestore
        const meme = await memeCollection.doc(id).get()
        // When meme doesn't exist return 404
        if (!meme.exists) {
          res.status(404).end(`Meme with id ${id} Not Found`)
          return
        }

        // Get template from Firestore
        const template = await meme.data().template.get()
        const imgFileType = template.data().img.split('.').pop()

        // Create temporary file
        const tmpObj = tmp.fileSync({ postfix: `.${imgFileType}` })
        // Add object to image files so it can later be removed
        tmpImgFiles.push({
          name: `${id}.${imgFileType}`,
          file: tmpObj,
        })

        // Download the file from the Firebase storage
        await storage.file(template.data().img).download({
          // Path to download the file to
          destination: tmpObj.name,
        })

        // Write content on meme base img
        await writeMemeContentToImage(tmpObj.name, meme.data().content)
      }
      tmpImgFiles.map((img) => zip.file(img.file.name, { name: img.name }))

      // Finalize stream
      await zip.finalize()

      // Remove temporary files
      tmpImgFiles.map((img) => img.file.removeCallback())
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
