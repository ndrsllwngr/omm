import React from 'react'
import PropTypes from 'prop-types'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { STEPS } from '@/lib/constants'
import { Meme } from '@/components/Meme'
import { useMeme } from '@/components/context-meme'

export const MemeResult = ({ setStep }) => {
  const [memeContext] = useMeme()
  const createDownload = () => {
    const node = memeContext.memeRef.current
    console.log({ memeContext, node })
    if (node !== null && node !== undefined) {
      domtoimage.toBlob(node).then(function (blob) {
        saveAs(blob, 'my-meme.png')
      })
    }
  }
  return (
    <div>
      <div className="bg-white rounded-lg p-10 flex items-center shadow justify-between">
        <div>
          <svg
            className="mb-4 h-20 w-20 text-green-500 mx-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {' '}
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>

          <h2 className="text-2xl mb-4 text-gray-800 text-center font-bold">Success!</h2>

          <Meme />

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep(STEPS.one)}
              className="w-40 block focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border"
            >
              Back to home
            </button>
            <button
              onClick={createDownload}
              className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-blue-500 hover:bg-blue-600 font-medium"
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
