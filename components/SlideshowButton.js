import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useAutoPlayDispatch } from '@/components/context/autoplayContext'

export const SlideshowButton = ({ name, changeSlide }) => {
  const router = useRouter()
  const dispatch = useAutoPlayDispatch()
  return (
    <button
      className={`bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded ${
        name === 'prev' ? 'bg-red-900' : 'bg-blue-900'
      }`}
      onClick={(e) => {
        e.preventDefault()
        router.push(changeSlide)
        dispatch({ type: 'falseBool' })
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
