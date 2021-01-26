import React from 'react'
import PropTypes from 'prop-types'

const bgColors = 'bg-black dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-300'
const textColors = 'text-white dark:text-black'
const highlightTextColors = 'text-custom-green'
const disabledTextColors = 'text-gray-300 dark:text-gray-400 cursor-not-allowed'

export const VoteBtn = () => {
  return <button></button>
}

export const PrimaryBtn = ({ children, onClick }) => {
  const bg = bgColors
  const text = textColors
  const base = 'rounded py-2 px-6'
  return (
    <button onClick={onClick} className={`${text} ${base} ${bg}`}>
      {children}
    </button>
  )
}

export const SecondaryBtn = ({ children, onClick }) => {
  const text = 'text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300'
  const border =
    'border border-solid border-black hover:border-gray-700 dark:border-white dark:hover:border-gray-300'
  const base = 'rounded p-2'
  return (
    <button onClick={onClick} className={`${text} ${base} ${border}`}>
      {children}
    </button>
  )
}

export const TertiaryBtn = ({ children, onClick }) => {
  const text = 'dark:text-white text-black hover:text-gray-700 dark:hover:text-gray-400'
  const base = 'p-2'
  return (
    <button onClick={onClick} className={`${base} ${text}`}>
      {children}
    </button>
  )
}

export const IconBtn = ({ disabled = false, children, onClick, addClass = '' }) => {
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
export const ToggleStateIconBtn = ({
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

IconBtn.propTypes = {
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
ToggleStateIconBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  toggleState: PropTypes.bool,
  addClass: PropTypes.string,
}
TertiaryBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
}
SecondaryBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
}
PrimaryBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
}
