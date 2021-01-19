import React from 'react'
import PropTypes from 'prop-types'
import { SingleMeme } from '@/components/SingleMeme'
import { useRouter } from 'next/router'
import { useAutoPlayDispatch } from '@/components/context/autoplayContext'
import { memeType } from '@/components/types/types'

export const Slideshow = ({ prevMeme, meme, nextMeme, updateMeme }) => {
  if (!meme) return <div className="flex flex-row justify-center">loading..</div>
  return (
    <div className="flex flex-row justify-center">
      {/*alternative would be to use css disbable*/}

      {prevMeme && prevMeme.id && <SlideshowButton name="prev" changeSlide={prevMeme.id} />}
      <SingleMeme meme={meme} updateMeme={updateMeme} />
      {nextMeme && nextMeme.id && <SlideshowButton name="next" changeSlide={nextMeme.id} />}
    </div>
  )
}

Slideshow.propTypes = {
  updateMeme: PropTypes.func,
  prevMeme: memeType,
  meme: memeType,
  nextMeme: memeType,
}

export const SlideshowButton = ({ name, changeSlide }) => {
  const router = useRouter()
  const dispatch = useAutoPlayDispatch()
  return (
    <button
      className={`bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded ${
        name === 'prev' ? 'bg-red-900' : 'bg-blue-900'
      }`}
      onClick={(e) => {
        e.preventDefault()
        router.push(changeSlide)
        dispatch({ type: 'falseBool' })
      }}
    >
      {name}
    </button>
  )
}
SlideshowButton.propTypes = {
  name: PropTypes.string,
  changeSlide: PropTypes.string,
}
