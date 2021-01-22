import React, { useEffect, useLayoutEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  useFabricJson,
  useFabricCanvas,
  useFabricActiveObject,
} from '@/components/context/fabricContext'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import { useImmer } from 'use-immer'

// TODO @NDRS add option to set canvas background color

export const FabricCanvas = ({ jsonData = null }) => {
  const { json, setJson } = useFabricJson()
  const {
    canvas,
    initCanvas,
    loadFromJSON,
    canvasRef,
    resetCanvas,
    setIsCopy,
    resizeCanvas,
  } = useFabricCanvas()
  const { setActiveObject } = useFabricActiveObject()
  const [size, updateSize] = useImmer({
    width: json ? json.width : 500,
    height: json ? json.width : 400,
  })

  const onResize = useCallback(
    (_event, { _element, size, _handle }) => {
      let height = parseInt(size.height)
      let width = parseInt(size.width)
      updateSize((draft) => {
        draft.height = height
        draft.width = width
      })
      console.log(height, width)
      resizeCanvas({ width, height })
    },
    [resizeCanvas, updateSize]
  )
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
  }, [canvasRef, json, canvas, initCanvas, loadFromJSON, setJson, jsonData, setIsCopy])

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
      <ResizableBox
        className="box"
        width={size.width}
        height={size.height}
        minConstraints={[150, 150]}
        maxConstraints={[1000, 1000]}
        onResize={onResize}
      >
        <canvas
          ref={canvasRef}
          id="fabric-canvas"
          width={800}
          height={400}
          style={{ border: '1px solid red' }}
        />
      </ResizableBox>
    </div>
  )
}

FabricCanvas.propTypes = {
  jsonData: PropTypes.any,
}
