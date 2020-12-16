import React from 'react'
import { Slideshow } from '@/components/Slideshow'
import { SlideshowButton } from '@/components/SlideshowButton'
import mockData from '@/assets/mockData'
const memes = mockData.data.memes

export default {
  title: 'Meme Slideshow',
}

export const MemeSlideshow = () => {
  return <Slideshow memes={memes} />
}

export const MemeSlideshowButtons = () => {
  return (
    <>
      <SlideshowButton name="prev" changeSlide={() => console.log('clickedPrev')} />
      <SlideshowButton name="next" changeSlide={() => console.log('clickedNext')} />
    </>
  )
}
