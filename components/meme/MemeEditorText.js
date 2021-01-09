import React, { useState, useEffect } from 'react'
import { useFabricActiveObject, useFabricCanvas } from '@/components/context/fabricContext'
import {
  bringForward,
  bringToFront,
  removeSelected,
  sendBackwards,
  sendToBack,
  setActiveProp,
  getActiveProp,
  setActiveStyle,
  getObjectCaching,
  setObjectCaching,
  isBold,
  toggleBold,
  setTextAlign,
  setFontFamily,
} from '@/components/meme/FabricUtils'
//import { getActiveStyle, setActiveProp, setActiveStyle } from '@/components/meme/utils'

export const MemeEditorText = (_props) => {
  const { canvas } = useFabricCanvas()
  const { activeObject } = useFabricActiveObject()
  const [enabledTools, setEnabledTools] = useState(false)
  const [fontStyle, setFontStyle] = useState('normal')
  const [textAlignState, setTextAlignState] = useState('Left')
  const [fontFamilyState, setFontFamilyState] = useState('Times New Roman')
  const [fontSize, setFontSize] = useState(16)
  const [fill, setFill] = useState('#000000')

  useEffect(() => {
    setEnabledTools(activeObject ? getActiveProp('type', canvas) === 'textbox' : false)
    if (enabledTools) {
      setFontStyle(activeObject ? activeObject.get('fontStyle') : 'normal')
      setFontSize(activeObject ? activeObject.get('fontSize') : 16)
      setFill(activeObject ? activeObject.get('fill') : '#000000')
      console.log({ src: 'MemeEditorText.useEffect', activeObject })
    }
  }, [enabledTools, activeObject, setEnabledTools])

  const handleChange = (changedKey, changedValue) => {
    setObjectCaching(false, canvas)
    switch (changedKey) {
      case 'fontStyle':
        setActiveStyle(changedKey, changedValue, activeObject, canvas)
        setFontStyle(changedValue)
        break
      case 'fontSize':
        setActiveStyle(changedKey, changedValue, activeObject, canvas)
        setFontSize(changedValue)
        break
      case 'fill':
        setActiveStyle(changedKey, changedValue, activeObject, canvas)
        setFill(changedValue)
        break
      case 'textAlign':
        setTextAlign(changedValue, activeObject, canvas)
        setTextAlignState(changedValue)
        break
      case 'fontFamily':
        setFontFamily(changedValue, activeObject, canvas)
        setFontFamilyState(changedValue)
        break
      case 'fontWeight':
        toggleBold(activeObject, canvas)
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
        <>
          <select value={fontStyle} onChange={(e) => handleChange('fontStyle', e.target.value)}>
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
            value={fontSize}
            onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
          />
          <input
            type={'color'}
            value={fill}
            onChange={(e) => handleChange('fill', e.target.value)}
          />
          <select
            value={textAlignState}
            onChange={(e) => handleChange('textAlign', e.target.value)}
          >
            <option value="Left">Left</option>
            <option value="Center">Center</option>
            <option value="Right">Right</option>
          </select>
          <select
            value={fontFamilyState}
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
        </>
      )}
    </>
  )
}
