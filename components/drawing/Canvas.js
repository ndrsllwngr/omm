import React, { useState, useLayoutEffect, useRef } from 'react'
import useStorage from '@/lib/useStorage'

export const Canvas = () => {
  const { setFile } = useStorage()
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasContextRef = useRef(null)

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas')
    const canvasContext = canvas.getContext('2d')
    canvasContext.lineCap = 'round'
    canvasContext.strokeStyle = 'black'
    canvasContext.lineWidth = 5
    canvasContextRef.current = canvasContext

    //canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    //console.log('rerender canvas')
  })

  const handleMouseDown = (e) => {
    setIsDrawing(true)
    const { clientX, clientY } = e
    canvasContextRef.current.beginPath()
    canvasContextRef.current.moveTo(clientX, clientY)
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return
    const { clientX, clientY } = e
    canvasContextRef.current.lineTo(clientX, clientY)
    canvasContextRef.current.stroke()
    setIsDrawing(true)
  }

  const handleMouseUp = (e) => {
    canvasContextRef.current.closePath()
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    canvasContextRef.current.clearRect(
      0,
      0,
      document.getElementById('canvas').width,
      document.getElementById('canvas').height
    )
    console.log('clear canvas:', canvasContextRef.current)
  }

  const saveImage = () => {
    const dataUrl = document.getElementById('canvas').toDataURL('canvas.png')
    fetch(dataUrl)
      .then((res) => {
        return res.blob()
      })
      .then((blob) => {
        setFile(blob)
      })
  }

  return (
    <div>
      <canvas
        id="canvas"
        style={{ backgroundColor: 'blue' }}
        width={Window.innerWidth}
        height={Window.innerheight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        Canvas
      </canvas>
      <button onClick={clearCanvas}>Clear Canvas</button>
      <button onClick={saveImage}>Save saveImage</button>
    </div>
  )
}
