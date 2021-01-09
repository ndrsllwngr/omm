import React from 'react'
import { Meme } from '@/components/archive/Meme'
import { useMeme } from '@/components/archive/memeContext'

/**
 * Editor, allow user to edit top and bottom text of meme
 */
export const MemeEditor = () => {
  // access context to retrieve meme url
  // and to retrieve & change meme captions
  const [memeContext, setMemeContext] = useMeme()

  // manipulate context by providing property and value
  const handleMemeContextChange = (property, value) => {
    // only change a certain key-value pair, keep all other values
    setMemeContext({ ...memeContext, [property]: value })
  }
  return (
    <div>
      {/* Top caption input */}
      <div className="mb-5">
        <label htmlFor="caption_1" className="font-bold mb-1 text-gray-700 block">
          Top text
        </label>
        <input
          placeholder=""
          type="text"
          name="caption_1"
          value={memeContext.caption_1_text}
          onChange={(event) => handleMemeContextChange('caption_1_text', event.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        />
      </div>
      {/* Bottom caption input */}
      <div className="mb-5">
        <label htmlFor="caption_2" className="font-bold mb-1 text-gray-700 block">
          Bottom text
        </label>
        <input
          placeholder=""
          type="text"
          name="caption_2"
          value={memeContext.caption_2_text}
          onChange={(event) => handleMemeContextChange('caption_2_text', event.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        />
      </div>
      {/* Preview of annotated meme */}
      <div className="mb-5">
        <span className="font-bold mb-1 text-gray-700 block">Preview</span>
        <div className="flex justify-center border-gray-300 border-solid border-2 rounded-lg">
          <Meme />
        </div>
      </div>
    </div>
  )
}
