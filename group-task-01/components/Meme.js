import React from 'react'
import PropTypes from 'prop-types'

export const Meme = ({ myRef, src, alt, top, bottom }) => {
  return (
    <div ref={myRef} className="relative">
      <img src={src} alt={alt} width={640} height={427}></img>
      <span className="absolute text-white text-5xl font-black top-4 left-1/2 meme-shadow transform -translate-x-1/2 text-center uppercase">
        {top}
      </span>
      <span className="absolute text-white text-5xl font-black bottom-4 left-1/2 meme-shadow transform -translate-x-1/2 text-center uppercase">
        {bottom}
      </span>
    </div>
  )
}

Meme.propTypes = {
  myRef: PropTypes.any,
  src: PropTypes.string,
  alt: PropTypes.string,
  top: PropTypes.string,
  bottom: PropTypes.string,
}
