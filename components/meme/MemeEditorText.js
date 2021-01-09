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
} from '@/components/meme/utils'
//import { getActiveStyle, setActiveProp, setActiveStyle } from '@/components/meme/utils'

export const MemeEditorText = (_props) => {
  const { canvas } = useFabricCanvas()
  const { activeObject } = useFabricActiveObject()
  const [enabledTools, setEnabledTools] = useState(false)
  const [fontStyle, setFontStyle] = useState('normal')
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
      default:
        console.log('Unsupported property', changedKey)
    }
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
            <option value="bold">Bold</option>
            <option value="italic">Italic</option>
          </select>
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
