import firebase from '@/lib/firebaseNode'
import tmp from 'tmp'
import fs from 'fs'
import path from 'path'
// import { writeMemeContentToImage } from '@/helpers/imageProcessing'
import Jimp from 'jimp'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()
const fontPath = path.resolve('./public/fonts/open-sans/open-sans-64-white/open-sans-64-white.fnt')
const fontData = require(fontPath)

export const writeMemeContentToImage = async (imgPath, memeContent) => {
  // console.log({ serverRuntimeConfig })
  // const foldersTest = fs.readdirSync(serverRuntimeConfig.PROJECT_ROOT)
  // console.log({ foldersTest })
  // const dirRelativeToPublicFolder = 'public/fonts'
  // const dir = path.resolve(serverRuntimeConfig.PROJECT_ROOT, dirRelativeToPublicFolder)
  // console.log({ dir })
  // const filenames = fs.readdirSync(dir)
  // console.log({ filenames })
  // const files = filenames.map((name) =>
  //   path.join(dirRelativeToPublicFolder, name, 'open-sans-64-white', 'open-sans-64-white.fnt')
  // )
  // const pathToFont = files[0]
  // console.log({ pathToFont })
  // console.log(files, files[0])
  // console.log(fs.readdirSync(path.join(process.cwd(), 'node_modules/'))
  console.log({ fontData })
  let jimpImg = await Jimp.read(imgPath)
  const font = await Jimp.loadFont(fontPath)

  for (let c of memeContent) {
    const coordX = parseInt(c.coordX)
    const coordY = parseInt(c.coordY)
    const text = c.text
    await jimpImg.print(font, coordX, coordY, text)
  }
  await jimpImg.writeAsync(imgPath)
}

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
        await writeMemeContentToImage(tmpObj.name, memeData.content)

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
