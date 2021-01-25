import React from 'react'
import PropTypes from 'prop-types'
import { MemeRenderer } from '@/components/MemeRenderer'
import { memeType } from '@/components/types/types'
import formatDistance from 'date-fns/formatDistance'

export const SingleDraft = ({ meme, onClick }) => {
  return (
    <div className="flex-col max-w-md" onClick={onClick}>
      <p className={'uppercase text-xs text-gray-600 dark:text-gray-300 font-medium'}>
        {typeof meme.createdAt !== 'object'
          ? formatDistance(new Date(meme.createdAt), new Date(), { addSuffix: true })
          : formatDistance(new Date(meme.createdAt.toMillis()), new Date(), { addSuffix: true })}
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
  meme: memeType,
}
