import React from 'react'
import { SingleViewMeme } from '@/components/SingleViewMeme'
import { getImgFlipMemes } from '@/lib/external-meme-api'

export default {
  title: 'Single View',
}

export const SingleView = (args, { loaded: { memes } }) => (
  <SingleViewMeme {...args} memes={memes} />
)
SingleView.loaders = [
  async () => ({
    memes: await getImgFlipMemes(),
  }),
]
