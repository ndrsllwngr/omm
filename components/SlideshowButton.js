import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

export const SlideshowButton = ({ name, changeSlide }) => {
  const router = useRouter()
  return (
    <button
      className={`bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded ${
        name === 'prev' ? 'bg-red-900' : 'bg-blue-900'
      }`}
      onClick={(e) => {
        e.preventDefault()
        router.push(changeSlide)
      }}
    >
      {name}
    </button>
  )
}
SlideshowButton.propTypes = {
  name: PropTypes.string,
  changeSlide: PropTypes.string,
}
