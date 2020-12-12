import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SingleViewButton } from '@/components/SingleViewButton'
/*
{memes.map((el, index) => (
	<img key={index} src={el.url} width={el.width} height={el.height} alt={el.name} />
  ))}
*/

export const SingelViewMeme = ({ memes }) => {
  const [allMemes, setAllMemes] = useState(memes)
  const [meme, setMeme] = useState(allMemes[0])

  const next = 1
  const prev = 0
  //use callback
  // siehe usecallback hook react

  const changeslide = (arg) => {
    switch (arg) {
      case 1:
        console.log('next')
        setMeme(allMemes[allMemes.indexOf(meme) + 1])

        break
      case 0:
        if (allMemes.indexOf(meme) == 0) {
          return
        }
        console.log('prev')
        setMeme(allMemes[allMemes.indexOf(meme) - 1])

        break
      default:
        console.error('Argument not supportet.', arg)
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
        changeSlide={() => changeslide(prev)}
      />
      <SingleViewButton
        className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
        name="next"
        changeSlide={() => changeslide(next)}
      />
      {/* Meme Info*/}
      <div className="slide_info">{meme.name}</div>
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
