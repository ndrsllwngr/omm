import React from 'react'
import { Meme } from '@/components/Meme'
import { useMeme } from '@/components/context/memeContext'

/**
 * Editor, allow user to edit top and bottom text of meme
 */
export const NewMemeEditor = () => {
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
          caption_1_text
        </label>
        <input
          placeholder=""
          type="text"
          name="caption_1"
          value={memeContext.caption_1_text}
          onChange={(event) => handleMemeContextChange('caption_1_text', event.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        ></input>
      </div>
      {/* Top posX input */}
      <div className="mb-5">
        <label htmlFor="caption_1_posX" className="font-bold mb-1 text-gray-700 block">
          caption_1_posX
        </label>
        <input
          placeholder=""
          type="number"
          name="caption_1_posX"
          value={memeContext.caption_1_posX}
          onChange={(event) => handleMemeContextChange('caption_1_posX', event.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        ></input>
      </div>
      {/* Top posY input */}
      <div className="mb-5">
        <label htmlFor="caption_1_posY" className="font-bold mb-1 text-gray-700 block">
          caption_1_posY
        </label>
        <input
          placeholder=""
          type="number"
          name="caption_1_posY"
          value={memeContext.caption_1_posY}
          onChange={(event) => handleMemeContextChange('caption_1_posY', event.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        ></input>
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
        ></input>
      </div>
      {/* Bottom posX input */}
      <div className="mb-5">
        <label htmlFor="caption_2_posX" className="font-bold mb-1 text-gray-700 block">
          caption_2_posX
        </label>
        <input
          placeholder=""
          type="number"
          name="caption_2_posX"
          value={memeContext.caption_2_posX}
          onChange={(event) => handleMemeContextChange('caption_2_posX', event.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        ></input>
      </div>
      {/* Bottom posY input */}
      <div className="mb-5">
        <label htmlFor="caption_2_posY" className="font-bold mb-1 text-gray-700 block">
          caption_2_posY
        </label>
        <input
          placeholder=""
          type="number"
          name="caption_2_posY"
          value={memeContext.caption_2_posY}
          onChange={(event) => handleMemeContextChange('caption_2_posY', event.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        ></input>
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
