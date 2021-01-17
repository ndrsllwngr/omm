import React from 'react'
import PropTypes from 'prop-types'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { MemeRenderer } from '@/components/MemeRenderer'
import { useFirestoreProfile } from '@/components/hooks/useFirestoreProfile'
import moment from 'moment'
import Link from 'next/link'

export const PersonalHistoryCollection = ({ className }) => {
  const { docs: memes } = useFirestoreProfile(FIRESTORE_COLLECTION.MEMES)

  return (
    <div className={className}>
      {memes &&
        memes.map((meme, i) => (
          <button key={i} className="flex flex-col max-w-md">
            <p className={'uppercase text-xs text-gray-600 dark:text-gray-300 font-medium'}>
              {moment(meme.createdAt.toMillis()).fromNow()}
            </p>
            <Link href={`/meme/${meme.id}`}>
              <a className={'flex flex-col justify-center items-start'}>
                <h1 className={'text-lg font-bold text-black dark:text-white truncate'}>
                  {meme.title ? meme.title : 'Untitled'}
                </h1>
                <MemeRenderer meme={meme} />
              </a>
            </Link>
          </button>
        ))}
    </div>
  )
}

PersonalHistoryCollection.propTypes = {
  className: PropTypes.string,
}
