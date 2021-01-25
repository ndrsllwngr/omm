import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    async function getData() {
      const db = firebase.firestore()
      return db.collection(collection).orderBy('createdAt', 'desc').get()
    }

    getData()
      .then((data) => {
        console.debug(`FIRESTORE_COLLECTION.${collection}`, 'READ', 'useFirestore')
        let documents = []
        data.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() })
        })
        setDocs(documents)
      })
      .catch((e) => console.error(e))
  }, [collection])

  return { docs }
}
export default useFirestore
