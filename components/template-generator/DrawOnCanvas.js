import React, { useState, useRef, useEffect } from 'react'
import useStorage from '@/components/hooks/useStorage'
import { PrimaryBtn, SecondaryBtn, TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { MEDIA_TYPE } from '@/lib/constants'

export const DrawOnCanvas = ({ showDialog, closeDialog }) => {
  const { createTemplate } = useStorage()
  const [name, setName] = useState(null)
  const [width] = useState(500)
  const [height] = useState(500)
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null)

  const resetLocalState = () => {
    setName(null)
  }

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
    const dataUrl = canvasRef?.current?.toDataURL('canvas.png')
    fetch(dataUrl)
      .then((res) => {
        return res.blob()
      })
      .then((blob) => {
        createTemplate({
          file: blob,
          meta: { name: name, width: width, height: height },
          callback: closeDialog,
          mediaType: MEDIA_TYPE.IMAGE,
        })
        resetLocalState()
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
          <input
            className={
              'appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
            }
            type="text"
            value={name}
            placeholder={'Description'}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <canvas
              ref={canvasRef}
              className={'bg-white'}
              style={{ border: '1px solid red' }}
              width={width}
              height={height}
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

DrawOnCanvas.propTypes = {
  showDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
}
