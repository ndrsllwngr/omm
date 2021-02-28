import React, { useEffect, useState } from 'react'
import useStorage from '@/components/hooks/useStorage'
import { PrimaryBtn, SecondaryBtn, TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { MEDIA_TYPE } from '@/lib/constants'

export const WebcamPhoto = ({ showDialog, closeDialog }) => {
  const [playing, setPlaying] = useState(false)
  const { createTemplate } = useStorage()
  const [name, setName] = useState('')
  const [width] = useState(500)
  const [height] = useState(500)

  useEffect(() => {
    return stopVideo()
  }, [])

  const resetLocalState = () => {
    setName('')
  }

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
    const video = document.getElementsByClassName('app__videoFeed')[0]
    video?.srcObject?.getTracks()[0].stop()
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
        createTemplate({
          file: blob,
          meta: { name: name, width: width, height: height },
          callback: () => {
            stopVideo()
            resetLocalState()
            closeDialog()
          },
          mediaType: MEDIA_TYPE.IMAGE,
        })
      },
      'image/png',
      1
    )
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
            <div className="app">
              <div className="app__container">
                <video
                  id="video"
                  height={height}
                  width={width}
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

WebcamPhoto.propTypes = {
  showDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
}
