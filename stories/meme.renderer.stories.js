import React from 'react'
import { MemeRenderer } from '@/components/MemeRenderer'
import { MEME_KANVAS_INITIAL_STATE } from '@/lib/constants'
import { MemeKanvas } from '@/components/MemeKanvas'

export default { title: 'Meme Generator' }

export const memeRenderer = () => {
  return <MemeRenderer meme={MEME_KANVAS_INITIAL_STATE}></MemeRenderer>
}

export const memeKanvas = () => {
  return <MemeKanvas></MemeKanvas>
}
