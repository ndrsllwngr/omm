import React, { useState, useEffect } from 'react'
import { useFabricActiveObject, useFabricCanvas } from '@/components/context/fabricContext'
import {
  bringForward,
  bringToFront,
  getActiveProp,
  removeSelected,
  sendBackwards,
  sendToBack,
} from '@/components/meme-generator/FabricUtils'
import { TertiaryBtn } from '@/components/ui/Buttons'

export const ImageToolbar = (_props) => {
  const { canvas } = useFabricCanvas()
  const { activeObject } = useFabricActiveObject()
  const [enabledTools, setEnabledTools] = useState(false)

  useEffect(() => {
    if (canvas) {
      setEnabledTools(activeObject ? getActiveProp('type', canvas) === 'image' : false)
      if (enabledTools) {
        console.log({ src: 'ImageToolbar.useEffect', activeObject })
      }
    }
  }, [canvas, enabledTools, activeObject, setEnabledTools])

  return (
    <>
      {enabledTools && (
        <>
          <TertiaryBtn onClick={() => sendBackwards(canvas)}>Send backwards</TertiaryBtn>
          <TertiaryBtn onClick={() => sendToBack(canvas)}>Send to back</TertiaryBtn>
          <TertiaryBtn onClick={() => bringForward(canvas)}>Bring forwards</TertiaryBtn>
          <TertiaryBtn onClick={() => bringToFront(canvas)}>Bring to front</TertiaryBtn>
          <TertiaryBtn onClick={() => removeSelected(canvas)}>Remove selected object</TertiaryBtn>
        </>
      )}
    </>
  )
}
