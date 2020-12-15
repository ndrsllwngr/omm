import React from 'react'

export const SingleViewButton = ({ className, name, changeSlide }) => {
  return (
    <button
      className={`bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded ${className}`}
      onClick={changeSlide}
    >
      {name}
    </button>
  )
}

SingleViewButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  changeSlide: PropTypes.func,
}
