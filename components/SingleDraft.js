import React from 'react'
import PropTypes from 'prop-types'
import { MemeRenderer } from '@/components/MemeRenderer'
import moment from 'moment'

export const SingleDraft = ({ meme, onClick }) => {
  return (
    <div className="flex-col max-w-md" onClick={onClick}>
      <p className={'uppercase text-xs text-gray-600 dark:text-gray-300 font-medium'}>
        {typeof meme.createdAt !== 'object'
          ? moment(meme.createdAt).fromNow()
          : moment(meme.createdAt.toMillis()).fromNow()}
      </p>
      <h1 className={'text-lg font-bold text-black dark:text-white truncate'}>
        {meme.title ? meme.title : 'Untitled'}
      </h1>

      <MemeRenderer meme={meme} />
    </div>
  )
}

SingleDraft.propTypes = {
  onClick: PropTypes.func,
  meme: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
