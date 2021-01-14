import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { FIRESTORE_COLLECTION, STORAGE_COLLECTION } from '@/lib/constants'
import { useAuth } from '@/components/context/authContext'

const useStorage = () => {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const auth = useAuth()

  useEffect(() => {
    // references
    if (file !== null) {
      const memeStorage = firebase.storage()
      const memeFirestore = firebase.firestore()
      const collectionRef = memeFirestore.collection(FIRESTORE_COLLECTION.TEMPLATES)
      const id = collectionRef.doc().id
      const storageRef = memeStorage.ref().child(STORAGE_COLLECTION.TEMPLATES).child(id)

      storageRef.put(file).on(
        'state_changed',
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
          setProgress(percentage)
          console.log('precentage:', percentage)
          console.log('in pufile', file)
        },
        (err) => {
          setError(err)
          console.log(err)
        },
        async () => {
          await collectionRef.add({
            createdAt: firebase.firestore.Timestamp.now(),
            createdBy: auth.user.uid,
            img: STORAGE_COLLECTION.TEMPLATES + '/' + id,
            //name: file.name, image from url doesn't have a name property --> error
          })
          console.log('in async data to firestore:')
        }
      )
    }
  }, [file, auth])

  return { progress, error, setFile }
}

export default useStorage
