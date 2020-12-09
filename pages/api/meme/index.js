import firebase from '@/lib/firebaseNode'
import fs from 'fs'

import tmp from 'tmp'
import Jimp from 'jimp'

export default async function memeHandler(req, res) {
  const {
    query: { id },
    method,
  } = req

  const db = firebase.firestore()
  const storage = firebase.storage().bucket()
  const memeCollection = db.collection('meme')

  //TODO generate fonts with https://www.npmjs.com/package/@rtpa/phaser-bitmapfont-generator

  switch (method) {
    case 'PUT':
      // TODO make it work with a list of content
      const content = req.body.content[0]
      const img = req.body.img

      //TODO support different image file types -> .png
      // Create temporary file
      const tmpobj = tmp.fileSync({ postfix: '.jpg' })

      //Decode base64 image and write to temporary file
      fs.writeFile(tmpobj.name, img, { encoding: 'base64' }, function (err) {
        console.log('File created')
      })

      const jimpImg = await Jimp.read(tmpobj.name)

      const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE)

      const coordX = parseInt(content.coordX)
      const coordY = parseInt(content.coordY)
      const text = content.text

      await jimpImg.print(font, coordX, coordY, text).write(tmpobj.name)

      // Create new Firebase document id
      const document = memeCollection.doc()

      // URI of the image file on the storage
      const memeDestination = 'meme/' + document.id + '.jpg'

      // Upload temporary file to Firebase storage
      await storage.upload(tmpobj.name, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        destination: memeDestination,
        metadata: {
          // Enable long-lived HTTP caching headers
          // Use only if the contents of the file will never change
          // (If the contents will change, use cacheControl: 'no-cache')
          cacheControl: 'public, max-age=31536000',
        },
      })
      // Delete the teporary file
      tmpobj.removeCallback()
      const downloadURL = await storage.file(memeDestination).getSignedUrl({
        action: 'read',
        //TODO better validity
        expires: '03-09-2491',
      })

      const documentData = {
        content: content,
        img: memeDestination,
        downloadURL: downloadURL,
        //TODO enrich with more infos
      }
      document.set(documentData)

      res.status(200).json(documentData)
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
