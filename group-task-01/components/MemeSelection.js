import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { useMeme } from '@/components/context-meme'

export const MemeSelection = ({ memes }) => {
  const [memeContext, setMemeContext] = useMeme()
  const handleMemeContextChange = (property, value) => {
    console.log({ property, value })
    setMemeContext({ ...memeContext, [property]: value })
  }

  return (
    <div>
      <div className="mb-5">
        <div className="font-bold mb-1 text-gray-700 block">Preview</div>
        <div className="flex justify-center border-gray-300 border-solid border-2 rounded-lg">
          <img
            className="object-contain w-full h-60"
            src={memeContext.url}
            width={640}
            height={427}
          ></img>
        </div>
      </div>
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
      <div className="mb-5">
        <div className="font-bold mb-1 text-gray-700 block ">Gallery</div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 items-center mx-auto justify-content-center">
          {memes.map((el, index) => (
            <button
              key={index}
              className={`relative w-24 h-24 bg-white overflow-hidden place-self-center justify-self-center`}
              onClick={() => handleMemeContextChange('url', el.url)}
            >
              <Image src={el.url} width={el.width} height={el.height} alt={el.name} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

MemeSelection.propTypes = {
  memes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      name: PropTypes.string,
    })
  ),
}
