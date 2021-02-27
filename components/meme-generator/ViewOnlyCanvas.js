import React, { useEffect, useLayoutEffect } from 'react'
import 'react-resizable/css/styles.css'
import {
  useViewOnlyCanvasCanvas,
  useViewOnlyCanvasJson,
  ViewOnlyCanvasProvider,
} from '@/components/context/viewOnlyCanvasContext'
import { memeType } from '@/components/types/types'

// TODO @NDRS add option to set canvas background color

export const ViewOnlyCanvas = ({ meme }) => {
  return (
    <ViewOnlyCanvasProvider>
      <ViewOnlyCanvasInner meme={meme} />
    </ViewOnlyCanvasProvider>
  )
}

const ViewOnlyCanvasInner = ({ meme }) => {
  const { json, setJson } = useViewOnlyCanvasJson()
  const { canvas, initCanvas, loadFromJSON, canvasRef, resetCanvas } = useViewOnlyCanvasCanvas()

  useEffect(() => {
    return () => resetCanvas()
  }, [resetCanvas])

  useLayoutEffect(() => {
    setJson(meme)
  }, [setJson, meme])

  useLayoutEffect(() => {
    console.log({ src: 'ViewOnlyCanvas.useLayoutEffect', json, canvas, canvasRef })
    if (!canvas && canvasRef.current) {
      if (json) {
        loadFromJSON(json)
        setJson(null)
      }
    }
  }, [canvasRef, json, canvas, initCanvas, loadFromJSON, setJson])

  return (
    <>
      <div>
        <canvas ref={canvasRef} id="view-only-canvas" width={800} height={400} />
      </div>
    </>
  )
}

ViewOnlyCanvas.propTypes = {
  meme: memeType,
}

ViewOnlyCanvasInner.propTypes = {
  meme: memeType,
}
