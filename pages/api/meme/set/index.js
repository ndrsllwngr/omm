import firebase from '@/lib/firebaseNode'
import tmp from 'tmp'
import { writeMemeContentToImage } from '@/helpers/imageProcessing'
import fs from 'fs'
import Archiver from 'archiver'

export default async function memeHandler(req, res) {
  const {
    //TODO filter & search
    query: {},
    method,
  } = req

  // Initialize firebase variables
  const db = firebase.firestore()
  const memeCollection = db.collection('memes')
  const storage = firebase.storage().bucket()

  switch (method) {
    case 'POST':
      // Get ids from request body
      const ids = req.body.ids
      console.log(ids)

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
        console.log(id)
        // Get meme from Firestore
        const meme = await memeCollection.doc(id).get()
        // When meme doesn't exist return 404
        if (!meme.exists) res.status(404).end(`Meme with id ${id} Not Found`)

        const memeData = meme.data()
        console.log(memeData)

        // Get meme from Firestore
        const template = await memeData.template.get()
        // When template doesn't exist return 404
        if (!template.exists)
          res.status(404).end(`Template of meme ${id} with id ${memeData.template.id} Not Found`)

        // Create temporary object
        const tmpObj = tmp.fileSync({ postfix: '.jpg' })
        // Add object to image files so it can later be removed
        tmpImgFiles.push(tmpObj)

        // Download the file from the Firebase storage
        await storage.file(template.data().img).download({
          // Path to download the file to
          destination: tmpObj.name,
        })

        // Write content on meme base img
        await writeMemeContentToImage(tmpObj.name, memeData.content)

        await zip.file(tmpObj.name, { name: `${id}.jpg` })
      }

      // Return zip as response
      await zip.finalize()
      //tmpImgFiles.map((file) => file.removeCallback())
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
