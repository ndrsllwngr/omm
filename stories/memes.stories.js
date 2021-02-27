import React from 'react'
import { SlideshowButton } from '@/components/Slideshow'
// import mockData from '@/assets/mockData'
import { Sort } from '@/components/Sort'
import { TemplateCollection } from '@/components/meme-generator/TemplateCollection'
import { ImgFlipCollection } from '@/components/meme-generator/ImgFlipCollection'
import { SpeechToText } from '@/components/SpeechToText'
import { TextToSpeech } from '@/components/TextToSpeech'

// const memes = mockData.data.memes

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

// export const memeSlideshow = () => {
//   return <Slideshow memes={memes} />
// }

export const templateCollection = () => <TemplateCollection />

export const imgFlipCollection = () => <ImgFlipCollection />

export const speechToText = () => <SpeechToText showOutput={true} />

export const textToSpeech = () => <TextToSpeech value={'How are you doing?'} />
