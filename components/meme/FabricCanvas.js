import React, { useEffect, useLayoutEffect, useCallback } from 'react'
import {
  useFabricJson,
  useFabricCanvas,
  useFabricActiveObject,
} from '@/components/context/fabricContext'

// eslint-disable-next-line react/prop-types
export const FabricCanvas = ({ jsonData = null }) => {
  const { json, setJson } = useFabricJson()
  const { canvas, initCanvas, loadFromJSON, canvasRef, resetCanvas, setIsCopy } = useFabricCanvas()
  const { setActiveObject } = useFabricActiveObject()

  useLayoutEffect(() => {
    console.log({ src: 'FabricCanvas.useLayoutEffect', jsonData, json, canvas, canvasRef })
    if (!canvas && canvasRef.current) {
      if (json) {
        loadFromJSON(json)
        setIsCopy(json.id)
        setJson(null)
      } else if (jsonData) {
        loadFromJSON(jsonData)
        setIsCopy(json.id)
        setJson(null)
      } else {
        initCanvas({
          width: 500,
          height: 400,
        })
        setIsCopy(null)
      }
    }
  }, [canvasRef, json, canvas, initCanvas, loadFromJSON, setJson, jsonData])

  const updateActiveObject = useCallback(
    (e) => {
      if (!e || (!canvas && !canvasRef.current)) {
        return
      }
      setActiveObject(canvas.getActiveObject())
      canvas.renderAll()
    },
    [canvas, setActiveObject, canvasRef]
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
      resetCanvas()
    }
  }, [canvas, updateActiveObject, onObjectModified, resetCanvas])

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
