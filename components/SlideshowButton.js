import React from 'react'

export const SlideshowButton = ({ name, changeSlide }) => {
  return (
    <button
      className={`bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded ${
        name === 'prev' ? 'bg-red-900' : 'bg-blue-900'
      }`}
      onClick={changeSlide}
    >
      {name}
    </button>
  )
}

SlideshowButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  changeSlide: PropTypes.func,
}
