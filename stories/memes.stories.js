import React from 'react'
import { Slideshow, SlideshowButton } from '@/components/Slideshow'
import mockData from '@/assets/mockData'
import { OverviewSort } from '@/components/OverviewSort'

const memes = mockData.data.memes

export default {
  title: 'Memes',
}

export const memeSlideshow = () => {
  return <Slideshow memes={memes} />
}

export const memeSlideshowButtons = () => {
  return (
    <>
      <SlideshowButton name="prev" changeSlide={() => console.log('clickedPrev')} />
      <SlideshowButton name="next" changeSlide={() => console.log('clickedNext')} />
    </>
  )
}

export const overviewSort = () => {
  return <OverviewSort />
}
