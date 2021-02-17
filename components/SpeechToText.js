import React, { useState, useEffect } from 'react'

const SpeechRecognition =
  typeof window !== 'undefined' &&
  (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition ||
    window.oSpeechRecognition)

const mic = SpeechRecognition ? new SpeechRecognition() : null

if (mic !== null) {
  mic.continuos = true
  mic.interimResults = true
  mic.lang = 'en-US'
}

// https://github.com/JamesBrill/react-speech-recognition
export const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false)
  const [text, setText] = useState(null)
  const [savedTexts, setSavedTexts] = useState([])

  useEffect(() => {
    const handleListen = () => {
      if (isListening) {
        mic.start()
        mic.onend = () => {
          console.log('continue..')
          mic.start()
        }
      } else {
        mic.stop()
        mic.onend = () => {
          console.log('Stopped Mic on Click')
        }
      }
      mic.onstart = () => {
        console.log('Mic is on')
      }
      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('')
        console.log('Transcript :', transcript)
        setText(transcript)
        mic.onerror = (event) => {
          console.log(event.error)
        }
      }
    }
    if (mic !== null) {
      handleListen()
    }
  }, [isListening])

  const handleSaveText = () => {
    setSavedTexts([...savedTexts, text])
    setText('')
  }
  return (
    <div className="container">
      <div className="box">
        <h2>Current Text</h2>
        {isListening ? <span>isListeningEmoji </span> : <span>isNotListeningEmoji </span>}
        <button onClick={handleSaveText} disabled={!text}>
          Save
        </button>
        <button onClick={() => setIsListening((prevState) => !prevState)}> Record </button>
        <p>{text}</p>
      </div>
      <div className="box">
        <h2>Recorded Texts</h2>
        {savedTexts.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>
    </div>
  )
}
