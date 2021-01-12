import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    const imageFirestore = firebase.firestore()
    const unsubscribe = imageFirestore
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let documents = []
        snap.forEach((doc) => {
          documents.push({ ...doc.data() })
        })
        setDocs(documents)
      })
    return () => unsubscribe()
  }, [collection])

  return { docs }
}
export default useFirestore
