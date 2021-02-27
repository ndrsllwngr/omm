import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useFabricActiveObject, useFabricCanvas } from '@/components/context/fabricContext'
import {
  bringForward,
  bringToFront,
  removeSelected,
  sendBackwards,
  sendToBack,
  // setActiveProp,
  getActiveProp,
  setActiveStyle,
  // getObjectCaching,
  setObjectCaching,
  // isBold,
  toggleBold,
  setTextAlign,
  setFontFamily,
  setText,
  // getActiveStyle,
} from '@/components/meme-generator/FabricUtils'
import { useImmer } from 'use-immer'
import { FONT_FAMILY } from '@/lib/constants'
import { useDetectOutsideClick } from '@/components/hooks/useDetectOutsideClick'
import { SpeechToText } from '@/components/SpeechToText'
import { TertiaryBtn } from '@/components/ui/Buttons'

const allowedFonts = [
  FONT_FAMILY.ALLAN,
  FONT_FAMILY.ANTON,
  FONT_FAMILY.COMIC_NEUE,
  FONT_FAMILY.ROBOTO_MONO,
]

const shadows = {
  none: null,
  'shadow-1': {
    id: 'shadow-1',
    color: 'rgba(0,0,0,0.3)',
    blur: 5,
    offsetX: 5,
    offsetY: 5,
  },
}

const textBoxInitialState = {
  text: 'Add your text here',
  fontStyle: 'normal',
  fontSize: 16,
  fill: '#000000',
  textAlign: 'left',
  fontFamily: FONT_FAMILY.ANTON,
  fontWeight: 'normal',
  shadow: null,
}

export const TextToolbar = (_props) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const onClick = () => setIsActive(!isActive)
  const { canvas } = useFabricCanvas()
  const { activeObject } = useFabricActiveObject()
  const [textBox, updateTextBox] = useImmer(textBoxInitialState)
  const [enabledTools, setEnabledTools] = useState(false)

  // TODO check if text box is selected or some chars inside
  useEffect(() => {
    if (canvas) {
      setEnabledTools(activeObject ? getActiveProp('type', canvas) === 'textbox' : false)
      if (enabledTools) {
        updateTextBox((draft) => {
          draft['text'] = activeObject ? activeObject.get('text') : textBoxInitialState['text']
          draft['fontStyle'] = activeObject
            ? activeObject.get('fontStyle')
            : textBoxInitialState['fontStyle']
          draft['fontSize'] = activeObject
            ? activeObject.get('fontSize')
            : textBoxInitialState['fontSize']
          draft['fill'] = activeObject ? activeObject.get('fill') : textBoxInitialState['fill']
          draft['textAlign'] = activeObject
            ? activeObject.get('textAlign')
            : textBoxInitialState['textAlign']
          draft['fontFamily'] = activeObject
            ? activeObject.get('fontFamily')
            : textBoxInitialState['fontFamily']
          draft['fontWeight'] = activeObject
            ? activeObject.get('fontWeight')
            : textBoxInitialState['fontWeight']
          draft['shadow'] = activeObject
            ? activeObject.get('shadow')
            : textBoxInitialState['shadow']
        })
        console.log({ src: 'TextToolbar.useEffect', activeObject, textBox })
        // console.log({
        //   getActiveStyle: getActiveStyle('fontWeight', activeObject, canvas),
        //   getActiveProp: getActiveProp('fontWeight', canvas),
        // })
      }
    }
  }, [canvas, enabledTools, activeObject, setEnabledTools, textBox, updateTextBox])

  const updateProperty = useCallback(
    (key, value) => {
      updateTextBox((draft) => {
        draft[key] = value
      })
    },
    [updateTextBox]
  )

  // TODO throttle input
  const handleChange = (changedKey, changedValue) => {
    setObjectCaching(false, canvas)
    switch (changedKey) {
      case 'fontStyle':
        setActiveStyle(changedKey, changedValue, activeObject, canvas)
        updateProperty(changedKey, changedValue)
        break
      case 'fontSize':
        setActiveStyle(changedKey, changedValue, activeObject, canvas)
        updateProperty(changedKey, changedValue)
        break
      case 'fill':
        setActiveStyle(changedKey, changedValue, activeObject, canvas)
        updateProperty(changedKey, changedValue)
        break
      case 'textAlign':
        setTextAlign(changedValue, activeObject, canvas)
        updateProperty(changedKey, changedValue)
        break
      case 'fontFamily':
        setFontFamily(changedValue, activeObject, canvas)
        updateProperty(changedKey, changedValue)
        break
      case 'fontWeight':
        toggleBold(activeObject, canvas)
        updateProperty(changedKey, changedValue)
        break
      case 'text':
        setText(changedValue, activeObject, canvas)
        updateProperty(changedKey, changedValue)
        break
      case 'shadow':
        setActiveStyle(changedKey, shadows[changedValue], activeObject, canvas)
        updateProperty(changedKey, changedValue)
        break
      default:
        console.log('Unsupported property', changedKey)
    }
    setObjectCaching(true, canvas)
    console.log({
      src: 'TextToolbar.handleChange',
      changedKey,
      changedValue,
      activeObject,
      canvas,
    })
  }

  return (
    <>
      {enabledTools && (
        <div className={'flex flex-col'}>
          <div className={'flex flex-row'}>
            <select
              value={textBox.fontStyle}
              onChange={(e) => handleChange('fontStyle', e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
            </select>
            <TertiaryBtn onClick={() => handleChange('fontWeight', canvas)}>Bold</TertiaryBtn>
            <input
              type="range"
              id="fontSize"
              name="fontSize"
              min="1"
              max="120"
              step="1"
              value={textBox.fontSize}
              onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
            />
            <input
              type={'color'}
              value={textBox.fill}
              onChange={(e) => handleChange('fill', e.target.value)}
            />
            <select
              value={textBox.textAlign}
              onChange={(e) => handleChange('textAlign', e.target.value)}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
            <div className="flex relative">
              <button
                type="button"
                className="inline-flex justify-center w-full border-b-2 shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-gray-200"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={onClick}
                style={{ fontFamily: textBox.fontFamily }}
              >
                {textBox.fontFamily}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isActive && (
                <div
                  ref={dropdownRef}
                  className="origin-top-right absolute right-0 mt-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {allowedFonts.map((font, i) => (
                      <div
                        key={i}
                        onClick={() => handleChange('fontFamily', font)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        style={{ fontFamily: font }}
                      >
                        {font}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <select
              value={textBox.shadow && textBox.shadow.id ? textBox.shadow.id : 'none'}
              onChange={(e) => handleChange('shadow', e.target.value)}
            >
              <option value="none">No shadow</option>
              <option value="shadow-1">Shadow 1</option>
            </select>
            <TertiaryBtn onClick={() => sendBackwards(canvas)}>Send backwards</TertiaryBtn>
            <TertiaryBtn onClick={() => sendToBack(canvas)}>Send to back</TertiaryBtn>
            <TertiaryBtn onClick={() => bringForward(canvas)}>Bring forwards</TertiaryBtn>
            <TertiaryBtn onClick={() => bringToFront(canvas)}>Bring to front</TertiaryBtn>
            <TertiaryBtn onClick={() => removeSelected(canvas)}>Remove selected object</TertiaryBtn>
          </div>
          <div className={'flex flex-row'}>
            <div className={'flex flex-row'}>
              <textarea
                name="text"
                rows="2"
                cols="50"
                value={textBox.text}
                onChange={(e) => handleChange('text', e.target.value)}
              />
              <SpeechToText onChange={handleChange} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
