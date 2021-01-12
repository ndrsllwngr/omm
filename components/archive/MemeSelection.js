import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { useMeme } from '@/components/archive/memeContext'

/**
 * Offer various options to select a meme
 * either via custom url
 * or by selecting a meme of our gallery
 *
 * @param memes - array of memes to populate gallery
 */
export const MemeSelection = ({ memes }) => {
  // access context to retrieve & change meme.url
  const [memeContext, setMemeContext] = useMeme()

  // manipulate context by providing property and value
  const handleMemeContextChange = (property, value) => {
    console.log({ property, value })
    // only change a certain key-value pair, keep all other values
    setMemeContext({ ...memeContext, [property]: value })
  }

  return (
    <div>
      {/* Preview of selected meme */}
      <div className="mb-5">
        <div className="font-bold mb-1 text-gray-700 block">Preview</div>
        <div className="flex justify-center border-gray-300 border-solid border-2 rounded-lg">
          <img
            className="object-contain w-full h-60"
            src={memeContext.image_url}
            width={640}
            height={427}
            alt=""
          />
        </div>
      </div>
      {/* Image URL input */}
      <div className="mb-5">
        <label htmlFor="image_url" className="font-bold mb-1 text-gray-700 block">
          Image URL
        </label>
        <input
          placeholder=""
          type="text"
          name="image_url"
          value={memeContext.image_url}
          onChange={(event) => handleMemeContextChange('image_url', event.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        />
      </div>
      {/* Meme gallery */}
      <div className="mb-5">
        <div className="font-bold mb-1 text-gray-700 block ">Gallery</div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 items-center mx-auto justify-content-center">
          {memes.map((el, index) => (
            <button
              key={index}
              className={`relative w-24 h-24 bg-white overflow-hidden place-self-center justify-self-center`}
              onClick={() => handleMemeContextChange('image_url', el.url)}
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
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.any.isRequired,
      createdBy: PropTypes.string.isRequired,
      upVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
      forkedBy: PropTypes.arrayOf(PropTypes.string),
      forkedFrom: PropTypes.any,
      views: PropTypes.number.isRequired,
      template: PropTypes.shape({
        id: PropTypes.any,
        url: PropTypes.string,
      }).isRequired,
      url: PropTypes.string, // if a real png was created (requirement)
      svg: PropTypes.string.isRequired,
      json: PropTypes.shape({
        background: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        preserveObjectStacking: PropTypes.bool,
        version: PropTypes.string,
        objects: PropTypes.arrayOf(PropTypes.any),
      }).isRequired,
    })
  ),
}
