import React from 'react'
import PropTypes from 'prop-types'

const bgColors = 'bg-black dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-300'
const textColors = 'text-white dark:text-black'
const highlightTextColors = 'text-custom-green'
const disabledTextColors = 'text-gray-300 dark:text-gray-400 cursor-not-allowed'

export const PrimaryIconBtn = ({ disabled = false, children, onClick, addClass = '' }) => {
  return (
    <button
      type="button"
      className={` p-2 rounded ${bgColors}  ${
        disabled ? `${disabledTextColors}` : `${textColors}`
      } ${addClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export const ToggleIconBtn = ({ children, onClick, addClass = '', toggleState = false }) => {
  return (
    <button
      type="button"
      className={`p-2 focus:outline-none ${bgColors}  ${
        toggleState ? `${highlightTextColors}` : `${textColors}`
      } ${addClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export const TogglePlayIconBtn = ({
  children,
  onClick,
  addClass = '',
  disabled = false,
  toggleState = false,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`p-2 focus:outline-none  ${bgColors} ${
        disabled
          ? `${disabledTextColors}`
          : `${toggleState ? `${highlightTextColors}` : `${textColors}`}`
      }  ${addClass}`}
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
ToggleIconBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  toggleState: PropTypes.bool,
  addClass: PropTypes.string,
}
TogglePlayIconBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  toggleState: PropTypes.bool,
  addClass: PropTypes.string,
}
