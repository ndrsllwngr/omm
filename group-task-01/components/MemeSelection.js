import React from 'react'
import { useMeme } from '@/components/context-meme'

export const MemeSelection = () => {
  const [memeContext, setMemeContext] = useMeme()
  const handleMemeContextChange = (property, value) => {
    console.log({ property, value })
    setMemeContext({ ...memeContext, [property]: value })
  }
  return (
    <div>
      <div className="mb-5">
        <label htmlFor="image-url" className="font-bold mb-1 text-gray-700 block">
          Image URL
        </label>
        <input
          placeholder=""
          type="text"
          name="image-url"
          value={memeContext.url}
          onChange={(event) => handleMemeContextChange('url', event.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        ></input>
      </div>
      <div className="font-bold text-gray-700 block">Preview</div>
      <div className="mb-5 flex justify-center">
        <img src={memeContext.url} width={640} height={427}></img>
      </div>
    </div>
  )
}
