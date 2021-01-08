import React, { useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { useFabricCanvas, useFabricActiveObject } from '@/components/context/fabricContext'

// eslint-disable-next-line react/prop-types
export const FabricCanvas = ({ jsonData = null, width = 816, height = 144 }) => {
  const canvasEl = useRef(null)
  const { canvas, initCanvas, loadFromJSON } = useFabricCanvas()
  const { setActiveObject } = useFabricActiveObject()

  useLayoutEffect(() => {
    if (jsonData) {
      loadFromJSON(canvasEl.current, jsonData)
    } else {
      initCanvas(canvasEl.current, {
        width: width,
        height: height,
      })
    }
  }, [canvasEl, initCanvas, loadFromJSON, jsonData, height, width])

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
      console.log('onObjectModified', e.target)
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
        ref={canvasEl}
        id="fabric-canvas"
        width={800}
        height={400}
        style={{ border: '1px solid red' }}
      />
    </div>
  )
}
