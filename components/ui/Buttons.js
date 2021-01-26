import React from 'react'
import PropTypes from 'prop-types'

//Usable by all UI Elements
const globalColors = 'bg-black dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-300'

//Used by Icon Buttons
const bgColors = globalColors
const iconBase = 'p-2 rounded focus:outline-none font-semibold'
const highlightTextColors = 'text-custom-green'
const disabledTextColors = 'text-gray-300 dark:text-gray-400 cursor-not-allowed'
const textColors = 'text-white dark:text-black'

//Used by Buttons
const btnBase = 'rounded-lg py-2 px-6 mx-1 inline-flex self-center font-semibold'
const btnBg = globalColors
const btnPrimText = textColors

const btnSecTerText = 'text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 '
const btnSecBorder =
  'border border-solid border-black hover:border-gray-700 dark:border-black dark:hover:border-gray-700'
const btnSecTerTextMono = 'text-white hover:text-gray-300'
const btnSecBorderMono = 'border border-solid border-white hover:border-gray-300'

/*export const VoteBtn = () => {
  return <button></button>
}*/

export const BaseBtn = ({ children, onClick, className: parentClass }) => {
  return (
    <button type="button" onClick={onClick} className={` ${btnBase} ${parentClass}`}>
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
export const SecondaryBtn = ({ children, onClick, className: parentClass, mono = false }) => {
  return (
    <BaseBtn
      onClick={onClick}
      className={`${
        mono ? `${btnSecTerTextMono} ${btnSecBorderMono}` : `${btnSecTerText} ${btnSecBorder}`
      }  ${parentClass}`}
    >
      {children}
    </BaseBtn>
  )
}
export const TertiaryBtn = ({ children, onClick, className: parentClass, mono = false }) => {
  return (
    <BaseBtn onClick={onClick} className={`${mono ? `${btnSecTerTextMono}` : `${btnSecTerText} `}`}>
      {children}
    </BaseBtn>
  )
}
export const BaseIcon = ({ children, onClick, disabled = false, className: parentClass }) => {
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
  onClick: PropTypes.func,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}
IconBtn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}
ToggleIconBtn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  toggleState: PropTypes.bool,
  className: PropTypes.string,
}
ToggleStateIconBtn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  toggleState: PropTypes.bool,
  className: PropTypes.string,
}
BaseBtn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
}
TertiaryBtn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  mono: PropTypes.bool,
}
SecondaryBtn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  mono: PropTypes.bool,
}
PrimaryBtn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
}
