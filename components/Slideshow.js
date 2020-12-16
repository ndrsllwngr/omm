import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { SlideshowButton } from '@/components/SlideshowButton'

const reducer = (slideIndex, arg) => {
  switch (arg.type) {
    case 'next':
      return ++slideIndex
    case 'prev':
      return slideIndex === 0 ? 0 : --slideIndex
    default:
      console.error('Argument not supportet.', arg)
  }
}

export const Slideshow = ({ memes }) => {
  const [slideIndex, setSlideIndex] = useReducer(reducer, 0)
  const meme = memes[slideIndex > memes.length - 1 ? memes.length - 1 : slideIndex]
  if (!memes || !meme) return <div>loading..</div>
  return (
    <div className="flex flex-row justify-center">
      {slideIndex !== 0 && (
        <SlideshowButton name="prev" changeSlide={() => setSlideIndex({ type: 'prev' })} />
      )}

      <div className="flex-col max-w-md">
        <div className="title">{meme.name}</div>
        {/* Meme itself*/}
        <img src={meme.url} width={meme.width} height={meme.height} />
        {/* Meme Info*/}
        <div className="slide-info">{meme.name}</div>
      </div>

      {slideIndex !== memes.length - 1 && (
        <SlideshowButton name="next" changeSlide={() => setSlideIndex({ type: 'next' })} />
      )}
    </div>
  )
}

Slideshow.propTypes = {
  memes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      name: PropTypes.string,
    })
  ),
}
