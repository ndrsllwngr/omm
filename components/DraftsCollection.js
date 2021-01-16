import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { MemeRenderer } from '@/components/MemeRenderer'
import { useFirestoreProfile } from '@/components/hooks/useFirestoreProfile'
import { useFabricJson } from '@/components/context/fabricContext'
import { useRouter } from 'next/router'
import moment from 'moment'

export const DraftsCollection = ({ className }) => {
  const { docs, deleteDraft } = useFirestoreProfile(FIRESTORE_COLLECTION.DRAFTS)
  const router = useRouter()
  const [drafts, setDrafts] = useState(null)
  const { setJson } = useFabricJson()

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
          <button
            key={i}
            className="flex flex-col max-w-md"
            onClick={() => {
              setJson(draft)
              deleteDraft(draft.id)
                .then(function () {
                  console.log('Document successfully deleted!')
                  router.push('/create')
                })
                .catch(function (error) {
                  console.error('Error removing document: ', error)
                })
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

DraftsCollection.propTypes = {
  className: PropTypes.string,
}
