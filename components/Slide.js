import React from 'react'
import PropTypes from 'prop-types'

export const Slide = ({ meme }) => {
  return (
    <div className="flex-col max-w-md">
      {/* Meme Title*/}
      <div className="title">{meme.name}</div>
      {/* Meme itself*/}
      <img src={meme.imgPath} width={meme.width} height={meme.height} className="min-w-full" />
      {/* Meme additional Info*/}
      <div className="slide-info">{meme.name}</div>
    </div>
  )
}

Slide.propTypes = {
  meme: PropTypes.shape({
    imgPath: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
  }),
}
