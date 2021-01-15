import React from 'react'
import PropTypes from 'prop-types'
import { SlideshowButton } from '@/components/SlideshowButton'
import { SingleMeme } from '@/components/SingleMeme'

export const Slideshow = ({ prevMeme, meme, nextMeme }) => {
  if (!meme) return <div className="flex flex-row justify-center">loading..</div>
  return (
    <div className="flex flex-row justify-center">
      {/*alternative would be to use css disbable*/}
      {prevMeme && prevMeme.id && <SlideshowButton name="prev" changeSlide={prevMeme.id} />}
      <SingleMeme meme={meme} />
      {nextMeme && nextMeme.id && <SlideshowButton name="next" changeSlide={nextMeme.id} />}
    </div>
  )
}

Slideshow.propTypes = {
  prevMeme: PropTypes.arrayOf(
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
  meme: PropTypes.arrayOf(
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
  nextMeme: PropTypes.arrayOf(
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
