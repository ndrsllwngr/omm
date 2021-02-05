import React from 'react'
import { Slideshow, SlideshowButton } from '@/components/Slideshow'
import mockData from '@/assets/mockData'
import { Sort } from '@/components/Sort'

const memes = mockData.data.memes

export default {
  title: 'Memes',
}

export const overviewSort = () => {
  return <Sort />
}

export const memeSlideshowButtons = () => {
  return (
    <>
      <SlideshowButton name="prev" changeSlide={() => console.log('clickedPrev')} />
      <SlideshowButton name="next" changeSlide={() => console.log('clickedNext')} />
    </>
  )
}

export const memeSlideshow = () => {
  return <Slideshow memes={memes} />
}
