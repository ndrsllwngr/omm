import React from 'react'
import PropTypes from 'prop-types'
import { SlideshowButton } from '@/components/SlideshowButton'
import { Slide } from '@/components/Slide'
import { SINGLEVIEWNAVIGATION } from '@/lib/constants'

export const Slideshow = ({ memes }) => {
  const prevMeme = memes[SINGLEVIEWNAVIGATION.prev]
  const currentMeme = memes[SINGLEVIEWNAVIGATION.current]
  const nextMeme = memes[SINGLEVIEWNAVIGATION.next]

  if (!memes || !currentMeme) return <div>loading..</div>
  return (
    <div className="flex flex-row justify-center">
      {/*alternative would be to use css disbable*/}
      {prevMeme.id && <SlideshowButton name="prev" changeSlide={prevMeme.id} />}
      <Slide meme={currentMeme} />
      {nextMeme.id && <SlideshowButton name="next" changeSlide={nextMeme.id} />}

      {/* // {slideIndex !== memes.length - 1 && (
      //   <SlideshowButton name="next" changeSlide={() => setSlideIndex({ type: 'next' })} />
      // )} */}
    </div>
  )
}

Slideshow.propTypes = {
  memes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.any.isRequired,
      createdBy: PropTypes.string.isRequired,
      upVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
      forkedBy: PropTypes.arrayOf(PropTypes.string),
      forkedFrom: PropTypes.any,
      views: PropTypes.number.isRequired,
      template: PropTypes.shape({
        id: PropTypes.any,
        url: PropTypes.string,
      }).isRequired,
      url: PropTypes.string, // if a real png was created (requirement)
      svg: PropTypes.string.isRequired,
      json: PropTypes.shape({
        background: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        preserveObjectStacking: PropTypes.bool,
        version: PropTypes.string,
        objects: PropTypes.arrayOf(PropTypes.any),
      }).isRequired,
    })
  ),
}
