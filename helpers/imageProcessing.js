import Jimp from 'jimp'

export const writeMemeContentToImage = async (imgPath, memeContent) => {
  let jimpImg = await Jimp.read(imgPath)

  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)

  for (let c of memeContent) {
    const coordX = parseInt(c.coordX)
    const coordY = parseInt(c.coordY)
    const text = c.text
    await jimpImg.print(font, coordX, coordY, text)
  }
  await jimpImg.writeAsync(imgPath)
}
