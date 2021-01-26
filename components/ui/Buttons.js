import React from 'react'
import PropTypes from 'prop-types'

/*const baseColors = 'bg-black dark:bg-white'*/

export const PrimaryIconBtn = ({ disabled = false, children, onClick, addClass = '' }) => {
  return (
    <button
      type="button"
      className={`${addClass} p-2 rounded bg-black dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-300  ${
        disabled
          ? 'text-gray-300 dark:text-gray-400 cursor-not-allowed'
          : 'text-white dark:text-black'
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export const ToogleIconBtn = ({ children, onClick, addClass = '' }) => {
  return (
    <button
      type="button"
      className={` ${addClass} px-4 items-center focus:outline-none bg-black hover:bg-gray-700 dark:hover:bg-gray-300 dark:bg-white`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

PrimaryIconBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  addClass: PropTypes.string,
}
ToogleIconBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
  addClass: PropTypes.string,
}
