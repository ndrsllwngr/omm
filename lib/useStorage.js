import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

const memeStorage = firebase.storage()
const memeFirestore = firebase.firestore()

const useStorage = () => {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    // references
    if (file !== null) {
      const collectionRef = memeFirestore.collection('templates')
      const id = collectionRef.doc().id
      const storageRef = memeStorage.ref().child('templates').child(id)

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
            created_at: firebase.firestore.Timestamp.now(),
            img: 'templates/' + id,
            //name: file.name, image from url doesnt have a name propoerty --> error
          })
          console.log('in async data to firestore:')
        }
      )
    }
  }, [file])

  return { progress, error, setFile }
}

export default useStorage
