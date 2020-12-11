import Jimp from 'jimp'

export default async function writeToImage(imgPath, content) {
  let jimpImg = await Jimp.read(imgPath)

  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)

  for (let c of content) {
    const coordX = parseInt(c.coordX)
    const coordY = parseInt(c.coordY)
    const text = c.text
    await jimpImg.print(font, coordX, coordY, text)
  }
  await jimpImg.writeAsync(imgPath)
}
