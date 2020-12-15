import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { SingleViewButton } from '@/components/SingleViewButton'

export const SingleViewMeme = ({ memes }) => {
  const [meme, setMeme] = useReducer(reducer, memes[0])

  //Why do arrow functions not work?
  function reducer(meme, arg) {
    switch (arg.type) {
      case 'next':
        //console.log('next')
        return memes[memes.indexOf(meme) + 1]
      case 'prev':
        //console.log('prev')
        if (memes.indexOf(meme) > 0) {
          return memes[memes.indexOf(meme) - 1]
        } else return meme

      default:
        console.error('Argument not supportet.', arg)
    }
  }

  return (
    <div className="flex flex-row justify-center">
      <SingleViewButton className="" name="prev" changeSlide={() => setMeme({ type: 'prev' })} />
      <div className="flex-col max-w-md">
        <div className="titel">{meme.name}</div>
        {/* Meme itself*/}
        <img src={meme.url} width={meme.width} height={meme.height} />
        {/* Meme Info*/}
        <div className="slide_info">{meme.name}</div>
      </div>
      {/* Titel of Meme*/}
      <SingleViewButton className="" name="next" changeSlide={() => setMeme({ type: 'next' })} />
    </div>
  )
}

SingleViewMeme.propTypes = {
  memes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      name: PropTypes.string,
    })
  ),
}
