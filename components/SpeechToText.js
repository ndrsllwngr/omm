import React from 'react'
import PropTypes from 'prop-types'
import { useSpeechRecognition } from 'react-speech-kit'
import { noop } from '@/lib/noop'

export const SpeechToText = ({ onChange = noop }) => {
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      onChange('text', result)
    },
  })

  return (
    <>
      <button
        onMouseDown={() => listen('en-US')}
        onMouseUp={stop}
        className={'flex flex-row items-center'}
      >
        🎤 {listening && <div>👂</div>}
      </button>
    </>
  )
}

SpeechToText.propTypes = {
  onChange: PropTypes.func,
}
