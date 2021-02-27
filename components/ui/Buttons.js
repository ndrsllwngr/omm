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
const btnPrimMono = 'text-black bg-white hover:bg-gray-300'
const btnSecTerText = 'text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 '
const btnSecBorder =
  'border border-solid border-black hover:border-gray-700 dark:border-white dark:hover:border-gray-300'
const btnSecTerTextMono = 'text-white hover:text-gray-300'
const btnSecBorderMono = 'border border-solid border-white hover:border-gray-300'

//VoteBtn
const voteBtnText = 'text-black dark:text-white'

//Batch
const badgeBg = 'bg-custom-gray dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-300'
const badgeBase = 'rounded-3xl p-2 px-4'
const badgeText = 'text-white dark:text-black'
const badgeBorder = 'border-4 border-solid border-custom-green'

export const VoteBaseBtn = ({ disabled = false, onClick, className: parentClass, children }) => {
  return (
    <button
      className={`inline-flex rounded p-2 self-center focus:outline-none  ${parentClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export const VoteDownBtn = ({ disabled = false, onClick, className: parentClass, children }) => {
  return (
    <VoteBaseBtn
      className={`${
        disabled
          ? 'text-red-500 border-red-500 cursor-not-allowed'
          : `${voteBtnText} hover:text-red-200 dark:hover:text-red-200`
      } ${parentClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </VoteBaseBtn>
  )
}
export const VoteUpBtn = ({ disabled = false, onClick, className: parentClass, children }) => {
  return (
    <VoteBaseBtn
      className={`${
        disabled
          ? 'text-custom-green border-custom-green cursor-not-allowed'
          : `${voteBtnText} hover:text-green-200 dark:hover:text-green-200`
      } ${parentClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </VoteBaseBtn>
  )
}

export const BaseBtn = ({
  children,
  onClick,
  onMouseUp,
  onMouseDown,
  disabled = false,
  className: parentClass,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      className={` ${btnBase} ${parentClass}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export const PrimaryBtn = ({
  children,
  onClick,
  onMouseUp,
  onMouseDown,
  disabled,
  className: parentClass,
  mono = false,
}) => {
  return (
    <BaseBtn
      onClick={onClick}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      className={`
    ${mono ? `${btnPrimMono}` : `${btnBg} ${btnPrimText} `}
    ${parentClass}`}
      disabled={disabled}
    >
      {children}
    </BaseBtn>
  )
}
export const SecondaryBtn = ({
  children,
  onClick,
  onMouseUp,
  onMouseDown,
  disabled,
  mono = false,
  className: parentClass,
}) => {
  return (
    <BaseBtn
      onClick={onClick}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      className={`${
        mono ? `${btnSecTerTextMono} ${btnSecBorderMono}` : `${btnSecTerText} ${btnSecBorder}`
      }  ${parentClass}`}
      disabled={disabled}
    >
      {children}
    </BaseBtn>
  )
}
export const TertiaryBtn = ({
  children,
  onClick,
  onMouseUp,
  onMouseDown,
  disabled,
  className: parentClass,
  mono = false,
}) => {
  return (
    <BaseBtn
      onClick={onClick}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      className={`${mono ? `${btnSecTerTextMono}` : `${btnSecTerText} `} ${parentClass}`}
      disabled={disabled}
    >
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

export const Badge = ({ children, onClick, active = false, className: parentClass }) => {
  return (
    <button
      type="button"
      className={`${badgeBase} ${badgeBg} ${badgeText} ${active ? badgeBorder : ''} ${parentClass}`}
      disabled={active}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
Badge.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  active: PropTypes.bool,
  className: PropTypes.string,
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
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}
TertiaryBtn.propTypes = {
  onClick: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  mono: PropTypes.bool,
  disabled: PropTypes.bool,
}
SecondaryBtn.propTypes = {
  onClick: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  mono: PropTypes.bool,
  disabled: PropTypes.bool,
}
PrimaryBtn.propTypes = {
  onClick: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  mono: PropTypes.bool,
  disabled: PropTypes.bool,
}
VoteDownBtn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}
VoteUpBtn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}
VoteBaseBtn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}
