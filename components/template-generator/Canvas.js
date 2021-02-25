import React, { useState, useRef, useEffect } from 'react'
import useStorage from '@/components/hooks/useStorage'
import { PrimaryBtn, SecondaryBtn, TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'

export const Canvas = ({ showDialog, closeDialog }) => {
  const { createTemplate } = useStorage()
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx) {
      ctx.lineCap = 'round'
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 5
    }
  })

  function getMousePos(e) {
    const canvas = canvasRef.current
    if (canvas) {
      let rect = canvas?.getBoundingClientRect()
      return {
        clientX: e.clientX - rect?.left,
        clientY: e.clientY - rect?.top,
      }
    }
    return { clientX: 0, clientY: 0 }
  }

  const handleMouseDown = (e) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx) {
      const { clientX, clientY } = getMousePos(e)
      ctx.beginPath()
      ctx.moveTo(clientX, clientY)
    }
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx) {
      const { clientX, clientY } = getMousePos(e)
      ctx.lineTo(clientX, clientY)
      ctx.stroke()
      setIsDrawing(true)
    }
  }

  const handleMouseUp = (_e) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx) {
      ctx.closePath()
    }
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas?.width, canvas?.height)
      console.log('clear canvas:', ctx)
    }
  }

  const saveImage = () => {
    const dataUrl = document.getElementById('drawingCanvas').toDataURL('canvas.png')
    fetch(dataUrl)
      .then((res) => {
        return res.blob()
      })
      .then((blob) => {
        createTemplate(blob, closeDialog)
      })
  }

  return (
    <>
      <Dialog isOpen={showDialog} onDismiss={closeDialog}>
        <div className={'flex flex-col'}>
          <div className={'flex flex-row justify-end'}>
            <TertiaryBtn className="close-button" onClick={closeDialog}>
              <VisuallyHidden>Close</VisuallyHidden>
              <span aria-hidden>
                <IoClose />
              </span>
            </TertiaryBtn>
          </div>
          <div>
            <canvas
              ref={canvasRef}
              className={'bg-white'}
              style={{ border: '1px solid red' }}
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

Canvas.propTypes = {
  showDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
}
