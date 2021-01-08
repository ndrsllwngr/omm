import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-inlinesvg'

export const MemeRenderer = ({ meme }) => {
  useEffect(() => {
    console.log({ meme })
  }, [meme])
  return (
    <div>
      {/*<FabricCanvas jsonData={meme} />*/}
      <SVG className={'object-scale-down w-full h-full'} src={meme.svg} />
    </div>
  )
}

MemeRenderer.propTypes = {
  meme: PropTypes.shape({
    template: PropTypes.string,
    created_at: PropTypes.any,
    title: PropTypes.string,
    svg: PropTypes.string,
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
  }),
}
