import React from 'react'
import { useFabricCanvas } from '@/components/context/fabricContext'
import { FabricImage } from '@/components/meme/FabricImage'
import { FabricTextBox } from '@/components/meme/FabricTextBox'

export const FabricToolbar = (_props) => {
  const { canvas } = useFabricCanvas()

  const removeObjects = () => {
    canvas.getActiveObjects().forEach((obj) => {
      canvas.remove(obj)
    })
    canvas.discardActiveObject().renderAll()
  }
  return (
    <>
      <FabricTextBox />
      <FabricImage />
      <button onClick={removeObjects}>Delete Selected</button>
    </>
  )
}
