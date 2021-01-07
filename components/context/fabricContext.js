import React, { useCallback, createContext, useState } from 'react'
import { fabric } from 'fabric'
// import { initAligningGuidelines } from '@/components/meme/Guidelines'

export const FabricContext = createContext([])

// https://github.com/saninmersion/react-context-fabricjs
// eslint-disable-next-line react/prop-types
export const FabricContextProvider = ({ children }) => {
  const [canvas, setCanvas] = useState(null)
  const [activeObject, setActiveObject] = useState(null)

  const initCanvas = useCallback((el, options = {}) => {
    const canvasOptions = {
      preserveObjectStacking: false,
      selection: true,
      defaultCursor: 'default',
      backgroundColor: 'white',
      ...options,
    }
    let c = new fabric.Canvas(el, canvasOptions)
    c.renderAll()
    setCanvas(c)
  }, [])

  const loadFromJSON = useCallback((el, json) => {
    let c = new fabric.Canvas(el)
    c.loadFromJSON(
      json,
      () => {
        c.renderAll.bind(c)
        c.setWidth(json.width)
        c.setHeight(json.height)
      },
      function (o, object) {
        fabric.log(o, object)
      }
    )
    c.renderAll()
    setCanvas(c)
  }, [])

  return (
    <FabricContext.Provider
      value={{ canvas, initCanvas, loadFromJSON, activeObject, setActiveObject }}
    >
      {children}
    </FabricContext.Provider>
  )
}
