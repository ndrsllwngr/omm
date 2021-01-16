import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { useAuth } from '@/components/context/authContext'

export const useFirestoreProfile = (collection) => {
  const [docs, setDocs] = useState([])
  const auth = useAuth()

  useEffect(() => {
    if (auth && auth.user) {
      const db = firebase.firestore()
      const unsubscribe = db
        .collection(collection)
        .where('createdBy', '==', auth.user.uid)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snap) => {
          let documents = []
          snap.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() })
          })
          setDocs(documents)
        })
      return () => unsubscribe()
    }
  }, [collection, auth])

  async function deleteDraft(id) {
    const db = firebase.firestore()
    return db.collection(collection).doc(id).delete()
  }

  return { docs, deleteDraft }
}
