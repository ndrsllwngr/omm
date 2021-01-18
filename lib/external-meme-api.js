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
    }
    // Pass data to static props fn
    return memes
  } catch (e) {
    console.error('Fetching external API failed ', e)
  }
}
