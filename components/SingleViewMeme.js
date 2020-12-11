import React from 'react'
import PropTypes from 'prop-types'
import { SingleViewButton } from '@/components/SingleViewButton'
import nextConfig from 'next.config'
/*
{memes.map((el, index) => (
	<img key={index} src={el.url} width={el.width} height={el.height} alt={el.name} />
  ))}
*/

export const SingelViewMeme = ({ memes }) => {
  const meme = memes[0]

  //use callback
  // siehe usecallback hook react
  const changeslide = (arg) => {
    switch (arg) {
      case next:
        console.log('next')
        break
      case prev:
        console.log('prev')
      default:
        console.error('Argument not supportet.', { arg })
    }
  }

  return (
    <div className="flex flex-col mx-auto">
      {/* Titel of Meme*/}
      <div className="titel">{meme.name}</div>

      {/* Meme itself*/}
      <img src={meme.url} width={meme.width} height={meme.height} />

      {/* Buttons*/}
      <SingleViewButton
        className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
        name="prev"
        trigger={() => changeslide(next)}
      />

      <SingleViewButton
        className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
        name="next"
        trigger={() => changeslide(nexxt)}
      />
      {/* Meme Info*/}
      <div className="slide_info"></div>
    </div>
  )
}

SingelViewMeme.propTypes = {
  memes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      name: PropTypes.string,
    })
  ),
}
