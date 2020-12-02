import React from 'react'
import { SingelViewMeme } from '@/components/SingleViewMeme'
import { getImgFlipMemes } from '@/lib/external-meme-api'

export default {
  title: 'Single View Meme',
}

export const Primary = (args, { loaded: { memes } }) => <SingelViewMeme {...args} memes={memes} />
Primary.loaders = [
  async () => ({
    memes: await getImgFlipMemes(),
  }),
]
