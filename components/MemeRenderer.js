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
  }),
}
