import React, { useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'
import PropTypes from 'prop-types'
import { TertiaryBtn } from '@/components/ui/Buttons'

export const TextToSpeech = ({ value = '' }) => {
  const [pitch] = useState(1)
  const [rate] = useState(1)
  const { speak, voices, speaking, cancel } = useSpeechSynthesis()

  return (
    <div>
      <TertiaryBtn
        onClick={() => {
          if (speaking) {
            cancel()
            return
          }
          //console.log(voices)
          speak({
            text: value,
            rate,
            pitch,
            voice: voices[7],
          })
        }}
      >
        🗣 TextToSpeech
      </TertiaryBtn>
    </div>
  )
}

TextToSpeech.propTypes = {
  value: PropTypes.string,
}
