import React, { useState } from 'react'
import useStorage from '@/components/hooks/useStorage'
import { PrimaryBtn, SecondaryBtn, TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'

export const WebcamPhoto = () => {
  const [playing, setPlaying] = useState(false)
  const { setFile } = useStorage()
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const HEIGHT = 500
  const WIDTH = 500

  const startVideo = () => {
    setPlaying(true)
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let video = document.getElementsByClassName('app__videoFeed')[0]
        if (video) {
          video.srcObject = stream
        }
      },
      (err) => console.error(err)
    )
  }

  const stopVideo = () => {
    setPlaying(false)
    let video = document.getElementsByClassName('app__videoFeed')[0]
    if (video && video.srcObject) {
      video.srcObject.getTracks()[0].stop()
    }
  }

  const captureVideo = () => {
    let canvas = document.getElementById('canvas')
    let video = document.getElementById('video')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
    canvas.toBlob(
      (blob) => {
        // const img = new Image()
        // img.src = window.URL.createObjectURL(blob)
        setFile(blob)
      },
      'image/png',
      1
    )
  }

  return (
    <>
      <PrimaryBtn onClick={open}>Add WebCam photo</PrimaryBtn>
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
            <div className="app">
              <div className="app__container">
                <video
                  id="video"
                  height={HEIGHT}
                  width={WIDTH}
                  muted
                  autoPlay
                  className="app__videoFeed"
                />
                <canvas id="canvas" />
              </div>
              <div className="app__input">
                {playing ? (
                  <SecondaryBtn onClick={stopVideo}>Stop</SecondaryBtn>
                ) : (
                  <SecondaryBtn onClick={startVideo}>Start</SecondaryBtn>
                )}
                <PrimaryBtn disabled={!playing} onClick={captureVideo}>
                  Capture Picture
                </PrimaryBtn>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
