import React from 'react'
import { useMeme } from '@/components/context/memeContext'

export const NewMeme = () => {
  const [memeContext] = useMeme()
  return (
    <div className="flex">
      <div ref={memeContext.memeRef} className="flex relative">
        <img src={memeContext.image_url} width={640} height={427}></img>
        <span className="absolute text-white text-lg md:text-5xl font-black top-4 left-1/2 meme-shadow transform -translate-x-1/2 text-center uppercase">
          {memeContext.caption_1_text}
        </span>
        <span className="absolute text-white text-lg md:text-5xl font-black bottom-4 left-1/2 meme-shadow transform -translate-x-1/2 text-center uppercase">
          {memeContext.caption_2_text}
        </span>
      </div>
    </div>
  )
}
