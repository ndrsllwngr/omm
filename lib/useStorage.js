import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

const memeStorage = firebase.storage()
const memeFirestore = firebase.firestore()

const useStorage = (file) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    // references
    const collectionRef = memeFirestore.collection('templates')
    const id = collectionRef.doc().id
    const storageRef = memeStorage.ref().child('templates').child(id)

    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
        setProgress(percentage)
        console.log('precentage:', percentage)
      },
      (err) => {
        setError(err)
        console.log(err)
      },
      async () => {
        const url = await storageRef.getDownloadURL()
        await collectionRef.add({
          created_at: firebase.firestore.Timestamp.now(),
          img: 'templates/' + id,
          name: file.name,
        })
        setUrl(url)
      }
    )
  }, [file])

  return { progress, url, error }
}

export default useStorage
