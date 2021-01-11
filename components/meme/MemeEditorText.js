import React, { useState, useEffect, useCallback } from 'react'
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
} from '@/components/meme/FabricUtils'
import { useImmer } from 'use-immer'

const textBoxInitialState = {
  text: 'Add your text here',
  fontStyle: 'normal',
  fontSize: 16,
  fill: '#000000',
  textAlign: 'left',
  fontFamily: 'arial',
  fontWeight: 'normal',
}

export const MemeEditorText = (_props) => {
  const { canvas } = useFabricCanvas()
  const { activeObject } = useFabricActiveObject()
  const [textBox, updateTextBox] = useImmer(textBoxInitialState)
  const [enabledTools, setEnabledTools] = useState(false)

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
        })
        console.log({ src: 'MemeEditorText.useEffect', activeObject, textBox })
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
        updateProperty('fontWeight', changedValue)
        break
      case 'text':
        setText(changedValue, activeObject, canvas)
        updateProperty('text', changedValue)
        break
      default:
        console.log('Unsupported property', changedKey)
    }
    setObjectCaching(true, canvas)
    console.log({
      src: 'MemeEditorText.handleChange',
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
          <div>
            <select
              value={textBox.fontStyle}
              onChange={(e) => handleChange('fontStyle', e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
            </select>
            <button onClick={() => handleChange('fontWeight', canvas)}>Bold</button>
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
            <select
              value={textBox.fontFamily}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
            >
              <option value="Times New Roman">Times New Roman</option>
              <option value="Impact">Impact</option>
              <option value="Courier">Courier</option>
            </select>
            <button onClick={() => sendBackwards(canvas)}>Send backwards</button>
            <button onClick={() => sendToBack(canvas)}>Send to back</button>
            <button onClick={() => bringForward(canvas)}>Bring forwards</button>
            <button onClick={() => bringToFront(canvas)}>Bring to front</button>
            <button onClick={() => removeSelected(canvas)}>Remove selected object</button>
          </div>
          <div className={'flex flex-row'}>
            <div className={'flex flex-row'}>
              <textarea
                id="textbox"
                name="textbox"
                rows="2"
                cols="50"
                value={textBox.text}
                onChange={(e) => handleChange('text', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
