import React from 'react'
import PropTypes from 'prop-types'
import { SingleMeme } from '@/components/SingleMeme'
import { useRouter } from 'next/router'
import { useAutoPlayDispatch } from '@/components/context/autoplayContext'
import { useSingleMemeContext } from '@/components/context/singlememeContext'

export const Slideshow = () => {
  const {
    currentMeme,
    updateCurrent,
    prevMeme,
    setPrev,
    nextMeme,
    setNext,
  } = useSingleMemeContext()
  if (!currentMeme) return <div className="flex flex-row justify-center">loading..</div>
  return (
    <div className="flex flex-row justify-center">
      {/*alternative would be to use css disbable*/}

      {prevMeme && prevMeme.id && (
        <SlideshowButton
          name="prev"
          changeSlide={prevMeme.id}
          cb={() => {
            setPrev(null)
            setNext(currentMeme)
            updateCurrent((_draft) => {
              return prevMeme
            })
          }}
        />
      )}
      <SingleMeme meme={currentMeme} updateMeme={updateCurrent} />
      {nextMeme && nextMeme.id && (
        <SlideshowButton
          name="next"
          changeSlide={nextMeme.id}
          cb={() => {
            setNext(null)
            setPrev(currentMeme)
            updateCurrent((_draft) => {
              return nextMeme
            })
          }}
        />
      )}
    </div>
  )
}

export const SlideshowButton = ({ name, changeSlide, cb }) => {
  const router = useRouter()
  const dispatch = useAutoPlayDispatch()
  return (
    <button
      className={`bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded ${
        name === 'prev' ? 'bg-red-900' : 'bg-blue-900'
      }`}
      onClick={(e) => {
        e.preventDefault()
        dispatch({ type: 'falseBool' })
        cb()
        router.push(changeSlide)
      }}
    >
      {name}
    </button>
  )
}
SlideshowButton.propTypes = {
  cb: PropTypes.func,
  name: PropTypes.string,
  changeSlide: PropTypes.string,
}
