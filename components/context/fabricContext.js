import React, { useCallback, createContext, useState, useContext } from 'react'
import { fabric } from 'fabric'
import PropTypes from 'prop-types'
// import { initAligningGuidelines } from '@/components/meme/Guidelines'

const FabricCanvasContext = createContext({})
const FabricActiveObjectContext = createContext({})

// https://github.com/saninmersion/react-context-fabricjs
export const FabricProvider = ({ children }) => {
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
    c.enableRetinaScaling = true
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
    c.enableRetinaScaling = true
    c.renderAll()
    setCanvas(c)
  }, [])

  return (
    <FabricCanvasContext.Provider value={{ canvas, initCanvas, loadFromJSON }}>
      <FabricActiveObjectContext.Provider value={{ activeObject, setActiveObject }}>
        {children}
      </FabricActiveObjectContext.Provider>
    </FabricCanvasContext.Provider>
  )
}

FabricProvider.propTypes = {
  children: PropTypes.node.isRequired,
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
