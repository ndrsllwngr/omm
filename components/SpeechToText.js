import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSpeechRecognition } from 'react-speech-kit'
import { noop } from '@/lib/noop'
import { TertiaryBtn } from '@/components/ui/Buttons'

export const SpeechToText = ({ onChange = noop, showOutput = false }) => {
  const [transcript, setTranscript] = useState(null)
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      onChange('text', result)
      setTranscript(result)
    },
  })

  return (
    <>
      <TertiaryBtn
        onMouseDown={() => listen('en-US')}
        onMouseUp={stop}
        className={'flex flex-row items-center'}
      >
        🎤 {listening && <div>👂</div>}
      </TertiaryBtn>
      {showOutput && transcript && <p>{transcript}</p>}
    </>
  )
}

SpeechToText.propTypes = {
  onChange: PropTypes.func,
  showOutput: PropTypes.bool,
}
