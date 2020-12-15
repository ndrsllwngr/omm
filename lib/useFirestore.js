import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

const imageFirestore = firebase.firestore()
const useFirestore = (collection) => {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    const unsubscribe = imageFirestore
      .collection(collection)
      .orderBy('created_at', 'desc')
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
