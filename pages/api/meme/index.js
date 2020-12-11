import firebase from '@/lib/firebaseNode'
import fs from 'fs'

import tmp from 'tmp'

export default async function memeHandler(req, res) {
  const {
    query: { id },
    method,
  } = req

  const db = firebase.firestore()
  const storage = firebase.storage().bucket()
  const memeCollection = db.collection('meme')

  switch (method) {
    case 'PUT':
      // TODO make it work with a list of content
      const content = req.body.content
      const img = req.body.img

      //TODO support different image file types -> .png
      // Create temporary file
      const tmpobj = tmp.fileSync({ postfix: '.jpg' })

      //Decode base64 image and write to temporary file
      fs.writeFile(tmpobj.name, img, { encoding: 'base64' }, function (err) {
        console.log('File created')
      })

      // Create new Firebase document id
      const document = memeCollection.doc()

      // URI of the image file on the storage
      const memeDestination = 'meme/' + document.id + '.jpg'

      // Upload temporary file to Firebase storage
      await storage.upload(tmpobj.name, {
        gzip: true,
        destination: memeDestination,
        metadata: {
          cacheControl: 'public, max-age=31536000',
        },
      })
      // Delete the temporary file
      tmpobj.removeCallback()

      /*const downloadURL = await storage.file(memeDestination).getSignedUrl({
        action: 'read',
        //TODO better validity
        expires: '01-01-2050',
      })*/

      const documentData = {
        content: content,
        img: memeDestination,
        // TODO enrich with more infos
        // CREATED_BY, UP and DOWN votes, TEMPLATE ID etc.
      }
      await document.set(documentData)
      //TODO improve download URL by dynamically adding HOST_NAME
      documentData.downloadURL = 'http://localhost:3000/api/meme/image/' + document.id
      res.status(200).json(documentData)
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
