import React, { useState, useEffect } from 'react'
import { useFabricActiveObject, useFabricCanvas } from '@/components/context/fabricContext'
//import { getActiveStyle, setActiveProp, setActiveStyle } from '@/components/meme/utils'

export const MemeEditorText = (_props) => {
  const { canvas } = useFabricCanvas()
  const { activeObject } = useFabricActiveObject()
  const [show, setShowTools] = useState(false)
  const [fontStyle, setFontStyle] = useState('normal')
  const [fontSize, setFontSize] = useState(16)
  const [fill, setFill] = useState('#000000')

  useEffect(() => {
    console.log({ activeObject })
    setShowTools(activeObject ? activeObject.get('type') === 'textbox' : false)
    setFontStyle(activeObject ? activeObject.get('fontStyle') : 'normal')
    setFontSize(activeObject ? activeObject.get('fontSize') : 16)
    setFill(activeObject ? activeObject.get('fill') : '#000000')
  }, [activeObject, setShowTools])

  const handleChange = (changedKey, changedValue) => {
    switch (changedKey) {
      case 'fontStyle':
        activeObject.set(changedKey, changedValue)
        activeObject.setCoords()
        activeObject.canvas.requestRenderAll()
        activeObject.canvas.renderAll()
        canvas.requestRenderAll()
        canvas.renderAll()
        setFontStyle(changedValue)
        break
      case 'fontSize':
        activeObject.set(changedKey, changedValue)
        activeObject.setCoords()
        activeObject.canvas.requestRenderAll()
        activeObject.canvas.renderAll()
        canvas.requestRenderAll()
        canvas.renderAll()
        setFontSize(changedValue)
        break
      case 'fill':
        activeObject.set(changedKey, changedValue)
        activeObject.setCoords()
        activeObject.canvas.requestRenderAll()
        activeObject.canvas.renderAll()
        canvas.requestRenderAll()
        canvas.renderAll()
        setFill(changedValue)
        break
      default:
        console.log('Unsupported property', changedKey)
    }
  }

  return (
    <>
      {show && (
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
        </>
      )}
    </>
  )
}
