import React, { useState, useLayoutEffect, useRef } from 'react'
import useStorage from '@/components/hooks/useStorage'
import { PrimaryBtn, SecondaryBtn, TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'

export const Canvas = () => {
  const { setFile } = useStorage()
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasContextRef = useRef(null)
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  useLayoutEffect(() => {
    const canvas = document.getElementById('drawingCanvas')
    if (canvas) {
      const canvasContext = canvas.getContext('2d')
      canvasContext.lineCap = 'round'
      canvasContext.strokeStyle = 'black'
      canvasContext.lineWidth = 5
      canvasContextRef.current = canvasContext
    }

    //canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    //console.log('rerender canvas')
  })

  function getMousePos(evt) {
    const canvas = document.getElementById('drawingCanvas')
    let rect = canvas.getBoundingClientRect()
    return {
      clientX: evt.clientX - rect.left,
      clientY: evt.clientY - rect.top,
    }
  }

  const handleMouseDown = (e) => {
    setIsDrawing(true)
    const { clientX, clientY } = getMousePos(e)
    canvasContextRef.current.beginPath()
    canvasContextRef.current.moveTo(clientX, clientY)
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return
    const { clientX, clientY } = getMousePos(e)
    canvasContextRef.current.lineTo(clientX, clientY)
    canvasContextRef.current.stroke()
    console.log('x, y: ', clientX, clientY)
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
      document.getElementById('drawingCanvas').width,
      document.getElementById('drawingCanvas').height
    )
    console.log('clear canvas:', canvasContextRef.current)
  }

  const saveImage = () => {
    const dataUrl = document.getElementById('drawingCanvas').toDataURL('canvas.png')
    fetch(dataUrl)
      .then((res) => {
        return res.blob()
      })
      .then((blob) => {
        setFile(blob)
      })
  }
  //if (typeof window === 'undefined') return <div>loading...</div>
  return (
    <>
      <PrimaryBtn onClick={open}>Draw on Canvas</PrimaryBtn>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <div className={'flex flex-col'}>
          <div className={'flex flex-row justify-end'}>
            <TertiaryBtn className="close-button" onClick={close}>
              <VisuallyHidden>Close</VisuallyHidden>
              <span aria-hidden>
                <IoClose />
              </span>
            </TertiaryBtn>
          </div>
          <div>
            <canvas
              id="drawingCanvas"
              style={{ backgroundColor: 'blue' }}
              width={300}
              height={300}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              Canvas
            </canvas>
            <SecondaryBtn onClick={clearCanvas}>Clear Canvas</SecondaryBtn>
            <PrimaryBtn onClick={saveImage}>Save</PrimaryBtn>
          </div>
        </div>
      </Dialog>
    </>
  )
}
