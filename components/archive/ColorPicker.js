import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ChromePicker } from 'react-color'
import { useVisible } from '@/components/hooks/useVisible'

export const ColorPicker = ({ cb, color }) => {
  const [hexColor, setHexColor] = useState(color)
  const { ref, isVisible, setIsVisible } = useVisible(false)

  function updateValue(newVal) {
    setHexColor(newVal)
    cb(newVal)
  }

  function togglePicker(e) {
    if (e.preventDefault) {
      e.preventDefault()
    }
    setIsVisible(!isVisible)
  }

  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-5">
        <div className="flex items-center">
          <div>
            <span
              onClick={togglePicker}
              className="flex flex-row self-center rounded-full w-4 h-4 border-2 border-white"
              style={{ backgroundColor: hexColor }}
            />
            {isVisible && (
              <div ref={ref}>
                <ChromePicker ref={ref} color={hexColor} onChange={(e) => updateValue(e.hex)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

ColorPicker.propTypes = {
  cb: PropTypes.func,
  color: PropTypes.string,
}
