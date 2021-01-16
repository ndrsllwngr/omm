import React, { useState, useEffect } from 'react'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { MemeRenderer } from '@/components/MemeRenderer'
import { useDrafts } from '@/components/hooks/useDrafts'
import { useFabricJson } from '@/components/context/fabricContext'
import { useRouter } from 'next/router'

export const DraftsCollection = () => {
  const { docs, deleteDraft } = useDrafts(FIRESTORE_COLLECTION.DRAFTS)
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
    <div>
      {drafts &&
        drafts.map((draft, i) => (
          <button
            key={i}
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
            <MemeRenderer meme={draft} />
          </button>
        ))}
    </div>
  )
}
