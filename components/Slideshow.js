import React from 'react'
import PropTypes from 'prop-types'
import { SingleMeme } from '@/components/SingleMeme'
import { useRouter } from 'next/router'
import { useAutoPlayDispatch } from '@/components/context/autoplayContext'
import { useSingleMemeContext } from '@/components/context/singlememeContext'

export const Slideshow = () => {
  const {
    currentMeme: meme,
    nextMeme,
    prevMeme,
    updateCurrent: updateMeme,
  } = useSingleMemeContext()
  if (!meme) return <div className="flex flex-row justify-center">loading..</div>
  return (
    <div className="flex flex-col justify-center max-w-md mx-auto">
      <div className="flex flex-row justify-between my-2">
        {/*{prevMeme && prevMeme.id && <SlideshowButton name="prev" changeSlide={prevMeme.id} />}
        {nextMeme && nextMeme.id && <SlideshowButton name="next" changeSlide={nextMeme.id} />}*/}
        {prevMeme && prevMeme.id ? (
          <SlideshowButton name="prev" changeSlide={prevMeme.id} />
        ) : (
          <SlideshowButton name="prev" disabled={true} />
        )}
        {nextMeme && nextMeme.id ? (
          <SlideshowButton name="next" changeSlide={nextMeme.id} />
        ) : (
          <SlideshowButton name="next" disabled={true} />
        )}
      </div>
      <SingleMeme meme={meme} updateMeme={updateMeme} />
    </div>
  )
}

export const SlideshowButton = ({ name, changeSlide, disabled }) => {
  const router = useRouter()
  const dispatch = useAutoPlayDispatch()
  return (
    <button
      disabled={disabled}
      className={`rounded-lg ${
        disabled
          ? 'border border-custom-gray'
          : 'bg-custom-gray hover:bg-custom-green hover:stroke-gray'
      } `}
      onClick={(e) => {
        e.preventDefault()
        router.push(changeSlide)
        dispatch({ type: 'falseBool' })
      }}
    >
      <svg
        className={`w-12 h-12 py-2 px-2 ${
          disabled ? 'stroke-gray' : 'stroke-green hover:stroke-gray'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        {name === 'prev' ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        )}
      </svg>
    </button>
  )
}
SlideshowButton.propTypes = {
  name: PropTypes.string,
  changeSlide: PropTypes.string,
  disabled: PropTypes.bool,
}
