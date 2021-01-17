import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { useAuth } from '@/components/context/authContext'

export const useFirestoreProfile = (collection) => {
  const [docs, setDocs] = useState([])
  const auth = useAuth()

  async function getData() {
    if (auth && auth.user) {
      const db = firebase.firestore()
      return db
        .collection(collection)
        .where('createdBy', '==', auth.user.uid)
        .orderBy('createdAt', 'desc')
        .get()
    }
  }

  useEffect(() => {
    getData()
      .then((data) => {
        let documents = []
        data.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() })
        })
        setDocs(documents)
      })
      .catch((e) => console.error(e))
  }, [collection, auth])

  async function deleteDoc(id) {
    const db = firebase.firestore()
    return db.collection(collection).doc(id).delete()
  }

  return { docs, deleteDoc }
}
