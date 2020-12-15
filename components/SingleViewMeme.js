import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { SingleViewButton } from '@/components/SingleViewButton'

const reducer = (state, arg) => {
  switch (arg.type) {
    case 'next':
      return { ...state, slideIndex: state.slideIndex + 1 }

    case 'prev':
      return {
        ...state,
        slideIndex: state.slideIndex === 0 ? (state.slideIndex = 0) : state.slideIndex - 1,
      }
    default:
      console.error('Argument not supportet.', arg)
  }
}

export const SingleViewMeme = ({ memes }) => {
  const [state, setMeme] = useReducer(reducer, { slideIndex: 0 })
  console.log(state.slideIndex)
  const meme = memes[state.slideIndex]

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
