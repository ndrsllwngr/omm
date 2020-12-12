import React from 'react'

export const SingleViewButton = ({ className, name, changeSlide }) => {
  return (
    <button className={className} onClick={changeSlide}>
      {name}
    </button>
  )
}

SingleViewButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  changeSlide: PropTypes.function,
}
