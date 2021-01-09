import React, { useEffect, useLayoutEffect, useCallback } from 'react'
import {
  useFabricJson,
  useFabricCanvas,
  useFabricActiveObject,
} from '@/components/context/fabricContext'

// eslint-disable-next-line react/prop-types
export const FabricCanvas = ({ jsonData = null, width = 500, height = 400 }) => {
  const { json, setJson } = useFabricJson()
  const { canvas, initCanvas, loadFromJSON, canvasRef } = useFabricCanvas()
  const { setActiveObject } = useFabricActiveObject()

  useLayoutEffect(() => {
    console.log({ src: 'FabricCanvas.useLayoutEffect', jsonData, json, canvas, canvasRef })
    if (jsonData) {
      loadFromJSON(jsonData)
    } else if (json) {
      loadFromJSON(json)
      setJson(null)
    } else {
      initCanvas({
        width: width,
        height: height,
      })
    }
  }, [])

  const updateActiveObject = useCallback(
    (e) => {
      if (!e) {
        return
      }
      setActiveObject(canvas.getActiveObject())
      canvas.renderAll()
    },
    [canvas, setActiveObject]
  )

  const onObjectModified = useCallback(
    (e) => {
      if (!e) {
        return
      }
      console.log({ src: 'onObjectModified', 'e.target': e.target })
      canvas.renderAll()
    },
    [canvas]
  )

  useEffect(() => {
    if (!canvas) {
      return
    }
    canvas.on('object:modified', onObjectModified)
    canvas.on('selection:created', updateActiveObject)
    canvas.on('selection:updated', updateActiveObject)
    canvas.on('selection:cleared', updateActiveObject)

    return () => {
      canvas.off('object:modified')
      canvas.off('selection:created')
      canvas.off('selection:cleared')
      canvas.off('selection:updated')
    }
  }, [canvas, updateActiveObject, onObjectModified])

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="fabric-canvas"
        width={800}
        height={400}
        style={{ border: '1px solid red' }}
      />
    </div>
  )
}
