import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { FIRESTORE_COLLECTION } from '@/lib/constants'

export const useMemeUpload = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // references
    if (data !== null) {
      const db = firebase.firestore()
      const createdAt = firebase.firestore.FieldValue.serverTimestamp()
      setLoading(true)
      // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
      db.collection(FIRESTORE_COLLECTION.MEMES)
        .add({
          ...data,
          // https://firebase.google.com/docs/firestore/manage-data/add-data#server_timestamp
          createdAt,
        })
        .then((docRef) => {
          setLoading(false)
          setSuccess(docRef.id)
          console.log('Document written with ID: ', docRef.id)
          if (data.forkedFrom) {
            db.collection(FIRESTORE_COLLECTION.MEMES)
              .doc(data.forkedFrom)
              .update({ forkedBy: firebase.firestore.FieldValue.arrayUnion(docRef.id) })
              .then(() => {
                console.log('SUCCESS')
              })
              .catch((e) => console.error(e))
          }
          db.collection(FIRESTORE_COLLECTION.MEME_HISTORY)
            .add({ memeId: docRef.id, createdAt })
            .then(() => {
              console.log('Document written MEME_HISTORY with ID: ', docRef.id)
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
