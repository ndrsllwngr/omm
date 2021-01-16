import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { MemeRenderer } from '@/components/MemeRenderer'
import { useFirestoreProfile } from '@/components/hooks/useFirestoreProfile'
import moment from 'moment'
import Link from 'next/link'

export const PersonalHistoryCollection = ({ className }) => {
  const { docs } = useFirestoreProfile(FIRESTORE_COLLECTION.MEMES)
  const [drafts, setDrafts] = useState(null)

  useEffect(() => {
    async function getDrafts() {
      let draftsArr = []
      for (let i = 0; i < docs.length; i++) {
        draftsArr.push(docs[i])
      }
      return draftsArr
    }
    getDrafts()
      .then((res) => {
        if (res) {
          console.log(res)
          setDrafts(res)
        }
      })
      .catch((e) => console.log({ src: 'getDrafts', e }))
  }, [docs, setDrafts])

  return (
    <div className={className}>
      {drafts &&
        drafts.map((draft, i) => (
          <button key={i} className="flex flex-col max-w-md">
            <p className={'uppercase text-xs text-gray-600 dark:text-gray-300 font-medium'}>
              {moment(draft.createdAt.toMillis()).fromNow()}
            </p>
            <Link href={`/meme/${draft.id}`}>
              <a className={'flex flex-col justify-center items-start'}>
                <h1 className={'text-lg font-bold text-black dark:text-white truncate'}>
                  {draft.title ? draft.title : 'Untitled'}
                </h1>
                <MemeRenderer meme={draft} />
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
