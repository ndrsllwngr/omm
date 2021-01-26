import React from 'react'
import PropTypes from 'prop-types'

//Usable by all UI Elements
const bgColors = 'bg-black dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-300'

//Used by Icon Buttons
const highlightTextColors = 'text-custom-green'
const disabledTextColors = 'text-gray-300 dark:text-gray-400 cursor-not-allowed'
const textColors = 'text-white dark:text-black'
const iconBase = 'p-2 rounded focus:outline-none'

//Used by Buttons
const btnBg = bgColors
const btnBase = 'rounded py-2 px-6'
const btnPrimText = textColors
const btnSecTerText = 'text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300'
const btnSecBorder =
  'border border-solid border-black hover:border-gray-700 dark:border-white dark:hover:border-gray-300'

export const VoteBtn = () => {
  return <button></button>
}

export const BaseBtn = ({ children, onClick, className: parentClass }) => {
  return (
    <button onClick={onClick} className={`${btnBase} ${parentClass}`}>
      {children}
    </button>
  )
}
export const PrimaryBtn = ({ children, onClick, className: parentClass }) => {
  return (
    <BaseBtn onClick={onClick} className={`${btnBg} ${btnPrimText} ${parentClass}`}>
      {children}
    </BaseBtn>
  )
}
export const SecondaryBtn = ({ children, onClick, className: parentClass }) => {
  return (
    <BaseBtn onClick={onClick} className={`${btnSecTerText} ${btnSecBorder} ${parentClass}`}>
      {children}
    </BaseBtn>
  )
}
export const TertiaryBtn = ({ children, onClick, className: parentClass }) => {
  return (
    <BaseBtn onClick={onClick} className={`${btnSecTerText} ${parentClass}`}>
      {children}
    </BaseBtn>
  )
}

export const BaseIcon = ({
  children,
  onClick,
  disabled = false,
  toggleState = false,
  className: parentClass,
}) => {
  return (
    <button
      type="button"
      className={`${iconBase} ${bgColors} ${parentClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export const IconBtn = ({ disabled = false, children, onClick, className: parentClass }) => {
  return (
    <BaseIcon
      className={`${disabled ? `${disabledTextColors}` : `${textColors}`} ${parentClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </BaseIcon>
  )
}
export const ToggleIconBtn = ({
  children,
  onClick,
  className: parentClass,
  toggleState = false,
}) => {
  return (
    <BaseIcon
      className={` ${toggleState ? `${highlightTextColors}` : `${textColors}`} ${parentClass}`}
      onClick={onClick}
    >
      {children}
    </BaseIcon>
  )
}

export const ToggleStateIconBtn = ({
  children,
  onClick,
  className: parentClass,
  disabled = false,
  toggleState = false,
}) => {
  return (
    <BaseIcon
      disabled={disabled}
      className={`${
        disabled
          ? `${disabledTextColors}`
          : `${toggleState ? `${highlightTextColors}` : `${textColors}`}`
      }  ${parentClass}`}
      onClick={onClick}
    >
      {children}
    </BaseIcon>
  )
}

BaseIcon.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  toggleState: PropTypes.bool,
  className: PropTypes.string,
}
IconBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}
ToggleIconBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
  toggleState: PropTypes.bool,
  className: PropTypes.string,
}
ToggleStateIconBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  toggleState: PropTypes.bool,
  className: PropTypes.string,
}
BaseBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
}

TertiaryBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
}
SecondaryBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
}
PrimaryBtn.propTypes = {
  onClick: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
}
