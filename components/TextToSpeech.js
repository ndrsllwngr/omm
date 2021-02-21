import React, { useEffect, useState } from 'react'

const synth = window.speechSynthesis

export const TextToSpeech = () => {
  const textInput = 'test test 1 2 3 - O M M group for the win lol'
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    const speak = () => {
      // Check if speaking
      if (synth.speaking) {
        console.error('Already speaking...')
        return
      }
      if (textInput !== '') {
        // Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput)

        // Speak end
        speakText.onend = (e) => {
          console.log('Done speaking...')
        }

        // Speak error
        speakText.onerror = (e) => {
          console.error('Something went wrong')
        }

        // Selected voice

        // Loop through voices

        // Set pitch and rate

        // Speak
        synth.speak(speakText)
        setIsSpeaking(false)
      }
    }
    if (isSpeaking) {
      speak()
    }
  })

  return (
    <div>
      <button onClick={() => setIsSpeaking(true)}>Hear Caption</button>
    </div>
  )
}
