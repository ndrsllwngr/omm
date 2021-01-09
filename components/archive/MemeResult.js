import React from 'react'
import PropTypes from 'prop-types'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { STEPS } from '@/lib/constants'
import { Meme } from '@/components/archive/Meme'
import { useMeme } from '@/components/archive/memeContext'

/**
 * Show final meme, offer download option
 *
 * @param setStep - callback to navigate meme wizard
 */
export const MemeResult = ({ setStep }) => {
  // access context to retrieve reference to meme
  const [memeContext] = useMeme()

  // create meme image and trigger download
  const downloadMeme = () => {
    // get node of meme through context
    const node = memeContext.memeRef.current
    console.log({ memeContext, node })
    if (node !== null && node !== undefined) {
      // create image of node and open native save as dialog
      domtoimage.toBlob(node).then(function (blob) {
        saveAs(blob, 'my-meme.png')
      })
    }
  }

  return (
    <div>
      <div className="bg-white rounded-lg p-10 flex items-center shadow justify-between">
        <div>
          <h2 className="text-2xl mb-4 text-gray-800 text-center font-bold">Success!</h2>
          {/* Final meme */}
          <Meme />
          {/* Actions (either start again or trigger download) */}
          <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-4 sm:space-y-0">
            <button
              onClick={() => setStep(STEPS.one)}
              className="w-full sm:w-40 block focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border"
            >
              Back to home
            </button>
            <button
              onClick={downloadMeme}
              className="w-full sm:w-40 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-blue-500 hover:bg-blue-600 font-medium"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

MemeResult.propTypes = {
  setStep: PropTypes.func,
}
