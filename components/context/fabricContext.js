import React, { useCallback, createContext, useState, useContext, useEffect, useRef } from 'react'
import { fabric } from 'fabric'
import PropTypes from 'prop-types'
// import { initAligningGuidelines } from '@/components/meme/Guidelines'

const FabricJsonContext = createContext({})
const FabricCanvasContext = createContext({})
const FabricActiveObjectContext = createContext({})

// https://github.com/saninmersion/react-context-fabricjs
export const FabricProvider = ({ children }) => {
  const [canvas, setCanvas] = useState(null)
  const [json, setJson] = useState(null)
  const canvasRef = useRef(null)
  const [activeObject, setActiveObject] = useState(null)

  const initCanvas = useCallback((options = {}) => {
    const canvasOptions = {
      preserveObjectStacking: true,
      selection: true,
      defaultCursor: 'default',
      backgroundColor: 'white',
      ...options,
    }
    let c = new fabric.Canvas(canvasRef.current, canvasOptions)
    c.enableRetinaScaling = true
    c.renderAll()
    setCanvas(c)
    console.log({ src: 'FabricProvider.initCanvas', options, canvas, canvasRef })
  }, [])

  const loadFromJSON = useCallback((json) => {
    let c = new fabric.Canvas(canvasRef.current)
    const customJson = json
    delete customJson.svg
    delete customJson.img
    delete customJson.created_at
    const jsonStr = JSON.stringify(json)
    c.loadFromJSON(
      jsonStr,
      () => {
        c.renderAll.bind(c)
        c.setWidth(json.width)
        c.setHeight(json.height)
      },
      function (o, object) {
        fabric.log('fabric.log', o, object)
      }
    )
    c.renderAll()
    c.calcOffset()
    setCanvas(c)
    console.log({ src: 'FabricProvider.loadFromJSON', json, canvas })
  }, [])

  return (
    <FabricJsonContext.Provider value={{ json, setJson }}>
      <FabricCanvasContext.Provider value={{ canvas, initCanvas, loadFromJSON, canvasRef }}>
        <FabricActiveObjectContext.Provider value={{ activeObject, setActiveObject }}>
          {children}
        </FabricActiveObjectContext.Provider>
      </FabricCanvasContext.Provider>
    </FabricJsonContext.Provider>
  )
}

FabricProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useFabricJson() {
  const context = useContext(FabricJsonContext)
  if (!context) {
    throw new Error(`useFabricJson must be used within a FabricProvider`)
  }
  return context
}

export function useFabricCanvas() {
  const context = useContext(FabricCanvasContext)
  if (!context) {
    throw new Error(`useFabricCanvas must be used within a FabricProvider`)
  }
  return context
}

export function useFabricActiveObject() {
  const context = useContext(FabricActiveObjectContext)
  if (!context) {
    throw new Error(`useFabricActiveObject must be used within a FabricProvider`)
  }
  return context
}

// export function MemeProvider({ children }) {
//   const [memeContext, setMemeContext] = useState(emptyState)
//   const value = useMemo(() => [memeContext, setMemeContext], [memeContext])
//   return <MemeContext.Provider value={value}>{children}</MemeContext.Provider>
// }
