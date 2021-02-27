import React, { useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'
import PropTypes from 'prop-types'
import { TertiaryBtn } from '@/components/ui/Buttons'

export const TextToSpeech = ({ value = '' }) => {
  const [pitch] = useState(1)
  const [rate] = useState(1)
  const { speak } = useSpeechSynthesis()

  return (
    <div>
      <TertiaryBtn onClick={() => speak({ text: value, rate, pitch })}>🗣</TertiaryBtn>
    </div>
  )
}

TextToSpeech.propTypes = {
  value: PropTypes.string,
}
