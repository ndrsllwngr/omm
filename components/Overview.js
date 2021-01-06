import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { MemeRenderer } from '@/components/MemeRenderer'
import Link from 'next/link'

export const Overview = ({ memes }) => {
  useEffect(() => {
    console.log({ memes })
  }, [memes])
  if (!memes || !(memes.length > 0)) return <div>loading...</div>
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 items-center mx-auto justify-content-center">
      {memes.map((el, i) => (
        <Link
          key={i}
          href={`/meme/${el.id}`}
          className="relative w-24 h-24 bg-white overflow-hidden place-self-center justify-self-center"
        >
          <a>
            <MemeRenderer meme={el} />
          </a>
        </Link>
      ))}
    </div>
  )
}

Overview.propTypes = {
  memes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      template: PropTypes.string,
      created_at: PropTypes.any,
      title: PropTypes.string,
      imgPath: PropTypes.string,
      content: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          x: PropTypes.number,
          y: PropTypes.number,
          width: PropTypes.number,
          height: PropTypes.number,
          text: PropTypes.string,
          rotation: PropTypes.number,
          isDragging: PropTypes.bool,
          fontSize: PropTypes.number,
          fontStyle: PropTypes.string,
          fill: PropTypes.string,
        })
      ),
      images: PropTypes.array,
    })
  ),
}
