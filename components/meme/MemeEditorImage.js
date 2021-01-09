import React, { useState, useEffect } from 'react'
import { useFabricActiveObject, useFabricCanvas } from '@/components/context/fabricContext'
import {
  bringForward,
  bringToFront,
  getActiveProp,
  removeSelected,
  sendBackwards,
  sendToBack,
} from '@/components/meme/FabricUtils'
//import { getActiveStyle, setActiveProp, setActiveStyle } from '@/components/meme/utils'

export const MemeEditorImage = (_props) => {
  const { canvas } = useFabricCanvas()
  const { activeObject } = useFabricActiveObject()
  const [enabledTools, setEnabledTools] = useState(false)

  useEffect(() => {
    setEnabledTools(activeObject ? getActiveProp('type', canvas) === 'image' : false)
    if (enabledTools) {
      console.log({ src: 'MemeEditorImage.useEffect', activeObject })
    }
  }, [enabledTools, activeObject, setEnabledTools])

  const handleChange = (changedKey, changedValue) => {
    switch (changedKey) {
      default:
        console.log('Unsupported property', changedKey)
    }
    console.log({
      src: 'MemeEditorImage.handleChange',
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
