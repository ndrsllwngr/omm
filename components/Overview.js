import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

export const Overview = ({ memes }) => {
  const router = useRouter()
  useEffect(() => {
    console.log({ memes })
  }, [memes])
  if (!memes || !(memes.length > 0)) return <div>loading...</div>
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 items-center mx-auto justify-content-center">
      {memes.map((el, index) => (
        <button
          onClick={() => router.push(`/meme/${el.id}`)}
          key={index}
          className={`relative w-24 h-24 bg-white overflow-hidden place-self-center justify-self-center`}
        >
          <img src={el.imgPath} />
        </button>
      ))}
    </div>
  )
}
//TODO Proptypes
Overview.propTypes = {
  memes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      name: PropTypes.string,
    })
  ),
}
