import React from 'react'
import { Slideshow } from '@/components/Slideshow'
import { getImgFlipMemes } from '@/lib/external-meme-api'

export default {
  title: 'Meme Single View',
}

export const MemeSingleView = (args, { loaded: { memes } }) => <Slideshow {...args} memes={memes} />
MemeSingleView.loaders = [
  async () => ({
    memes: await getImgFlipMemes(),
  }),
]
