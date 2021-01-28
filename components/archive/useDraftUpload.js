import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { FIRESTORE_COLLECTION } from '@/lib/constants'

export const useDraftUpload = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // references
    if (data !== null) {
      const firestore = firebase.firestore()
      const memesRef = firestore.collection(FIRESTORE_COLLECTION.DRAFTS)
      setLoading(true)
      // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
      memesRef
        .add({
          ...data,
          // https://firebase.google.com/docs/firestore/manage-data/add-data#server_timestamp
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          console.debug(`FIRESTORE_COLLECTION.DRAFTS`, 'WRITE', 'useDraftUpload', 'useEffect')
          setLoading(false)
          setSuccess(docRef.id)
          console.log('Document written with ID: ', docRef.id)
          // TODO Could we handle the forkedBy update action better?
          memesRef
            .doc(data.forkedFrom)
            .update({ forkedBy: firebase.firestore.FieldValue.arrayUnion(docRef.id) })
            .then(() => {
              console.debug(
                `FIRESTORE_COLLECTION.DRAFTS`,
                'WRITE',
                'useDraftUpload',
                'useEffect',
                'forkedBy'
              )
              console.log('SUCCESS')
            })
            .catch((e) => console.error(e))
          setData(null)
        })
        .catch((e) => {
          setLoading(false)
          setData(null)
          setError(e)
          console.error('Error adding document: ', e)
          setData(null)
        })
    }
  }, [data])

  return [loading, success, error, setData]
}
