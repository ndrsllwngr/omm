import React, { useState } from 'react'
import useStorage from '@/lib/useStorage'

export const WebcamPhoto = () => {
  const [playing, setPlaying] = useState(false)
  const { setFile } = useStorage()

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
    video.srcObject.getTracks()[0].stop()
  }

  const captureVideo = () => {
    var canvas = document.getElementById('canvas')
    var video = document.getElementById('video')
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
    <div className="app">
      <div className="app__container">
        <video
          id="video"
          height={HEIGHT}
          width={WIDTH}
          muted
          autoPlay
          className="app__videoFeed"
        ></video>
      </div>
      <div className="app__input">
        {playing ? (
          <button onClick={stopVideo}>Stop</button>
        ) : (
          <button onClick={startVideo}>Start</button>
        )}
        <button onClick={captureVideo}>Capture Picture</button>
      </div>
      <canvas id="canvas"></canvas>
    </div>
  )
}
