import React from 'react'
import PropTypes from 'prop-types'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { MemeRenderer } from '@/components/MemeRenderer'
import { useFirestoreProfile } from '@/components/hooks/useFirestoreProfile'
import { useFabricJson } from '@/components/context/fabricContext'
import { useRouter } from 'next/router'
import moment from 'moment'

export const ProfileDrafts = ({ className }) => {
  const { docs: drafts, deleteDoc } = useFirestoreProfile(FIRESTORE_COLLECTION.DRAFTS)
  const router = useRouter()
  const { setJson } = useFabricJson()

  return (
    <div className={className}>
      {drafts &&
        drafts.map((draft, i) => (
          <button
            key={i}
            className="flex flex-col max-w-md"
            onClick={() => {
              setJson(draft)
              deleteDoc(draft.id)
                .then((doc) => {
                  console.log('Document successfully deleted!')
                  router.push('/create')
                })
                .catch((e) => console.error('Error removing document: ', e))
            }}
          >
            <p className={'uppercase text-xs text-gray-600 dark:text-gray-300 font-medium'}>
              {moment(draft.createdAt.toMillis()).fromNow()}
            </p>
            <h1 className={'text-lg font-bold text-black dark:text-white truncate'}>
              {draft.title ? draft.title : 'Untitled'}
            </h1>
            <MemeRenderer meme={draft} />
          </button>
        ))}
    </div>
  )
}

ProfileDrafts.propTypes = {
  className: PropTypes.string,
}
