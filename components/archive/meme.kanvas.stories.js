import React from 'react'
import { MemeRenderer } from '@/components/MemeRenderer'
import { MEME_KANVAS_INITIAL_STATE } from '@/lib/constants'
import { MemeKanvas } from '@/components/archive/MemeKanvas'

export default { title: 'Meme Generator' }

export const memeRenderer = () => {
  return (
    // TODO scale to fit into parent container https://css-tricks.com/scaled-proportional-blocks-with-css-and-javascript/
    <div style={{ transform: 'scale(0.5)' }}>
      <MemeRenderer meme={MEME_KANVAS_INITIAL_STATE} />
    </div>
  )
}

export const memeKanvas = () => {
  return <MemeKanvas />
}
