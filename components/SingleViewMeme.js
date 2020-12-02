import React from 'react'
import PropTypes from 'prop-types'
import { SingleViewButton } from '@/components/SingleViewButton'
/*
{memes.map((el, index) => (
	<img key={index} src={el.url} width={el.width} height={el.height} alt={el.name} />
  ))}
*/
export const SingelViewMeme = ({ memes }) => {
  const meme = memes[0]

  return (
    <div className="flex flex-col mx-auto">
      {/* Titel of Meme*/}
      <div className="titel">{meme.name}</div>

      {/* Meme itself*/}
      <img src={meme.url} width={meme.width} height={meme.height} />

      {/* Buttons*/}
      <SingleViewButton
        value="prev"
        className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
      />
      <SingleViewButton
        value="next"
        className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
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
