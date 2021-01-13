import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { FIRESTORE_COLLECTION } from '@/lib/constants'

const useMemeUpload = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // references
    if (data !== null) {
      const firestore = firebase.firestore()
      const memesRef = firestore.collection(FIRESTORE_COLLECTION.MEMES)
      setLoading(true)
      // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
      memesRef
        .add({
          ...data,
          // https://firebase.google.com/docs/firestore/manage-data/add-data#server_timestamp
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          setLoading(false)
          setSuccess(docRef.id)
          console.log('Document written with ID: ', docRef.id)
          setData(null)
        })
        .catch((error) => {
          setLoading(false)
          setData(null)
          setError(error)
          console.error('Error adding document: ', error)
          setData(null)
        })
    }
  }, [data])

  return [loading, success, error, setData]
}

export default useMemeUpload
