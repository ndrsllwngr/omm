export const getImgFlipMemes = async () => {
  try {
    const res = await fetch(`https://api.imgflip.com/get_memes`)
    const data = await res.json()

    let memes = []
    if (data !== null || data !== undefined) {
      const dataStripped = data.data.memes.map((meme) => {
        return {
          url: meme.url,
          width: meme.width,
          height: meme.height,
          name: meme.name,
        }
      })
      memes = dataStripped
      //console.log({ memes })
    }
    // Pass data to static props fn
    return memes
  } catch (err) {
    console.log('Fetching external API failed ' + err)
  }
}
