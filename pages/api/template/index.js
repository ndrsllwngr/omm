import firebase from '@/lib/firebaseNode'
import fs from 'fs'

import tmp from 'tmp'

export default async function memeHandler(req, res) {
  const {
    query: {},
    method,
  } = req

  const db = firebase.firestore()
  const storage = firebase.storage().bucket()
  const templateCollection = db.collection('templates')

  switch (method) {
    case 'PUT':
      const name = req.body.name
      const img = req.body.img
      const tmpObj = tmp.fileSync({ postfix: '.jpg' })

      //Decode base64 image and write to temporary file
      fs.writeFile(tmpObj.name, img, { encoding: 'base64' }, function (err) {
        console.log('File created')
      })

      // Create new Firebase document id
      const document = templateCollection.doc()

      // URI of the image file on the storage
      const memeDestination = 'templates/' + document.id + '.jpg'

      // Upload temporary file to Firebase storage
      await storage.upload(tmpObj.name, {
        gzip: true,
        destination: memeDestination,
        metadata: {
          cacheControl: 'public, max-age=31536000',
        },
      })
      // Delete the temporary file
      tmpObj.removeCallback()

      const documentData = {
        id: document.id,
        name: name,
        img: memeDestination,
        created_at: firebase.firestore.Timestamp.now(),
      }
      await document.set(documentData)
      res.status(200).json(documentData)
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
