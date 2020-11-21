import React from 'react'
import { Meme } from '@/components/Meme'
import { useMeme } from '@/components/context-meme'

export const MemeEditor = () => {
  const [memeContext, setMemeContext] = useMeme()
  const handleMemeContextChange = (property, value) => {
    setMemeContext({ ...memeContext, [property]: value })
  }
  return (
    <div>
      <div className="mb-5">
        <label htmlFor="top-caption" className="font-bold mb-1 text-gray-700 block">
          Top text
        </label>
        <input
          placeholder=""
          type="text"
          name="top-caption"
          value={memeContext.topCaption}
          onChange={(event) => handleMemeContextChange('topCaption', event.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        ></input>
      </div>

      <div className="mb-5">
        <label htmlFor="bottom-caption" className="font-bold mb-1 text-gray-700 block">
          Bottom text
        </label>
        <input
          placeholder=""
          type="text"
          name="bottom-caption"
          value={memeContext.bottomCaption}
          onChange={(event) => handleMemeContextChange('bottomCaption', event.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        ></input>
      </div>
      <div className="font-bold text-gray-700 block">Preview</div>
      <div className="mb-5 flex justify-center">
        <Meme />
      </div>
    </div>
  )
}
