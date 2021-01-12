import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

const useStorage = () => {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [externalUrl, setExternalUrl] = useState('')

  useEffect(() => {
    // references

    const memeStorage = firebase.storage()
    const memeFirestore = firebase.firestore()
    const collectionRef = memeFirestore.collection('templates')
    const id = collectionRef.doc().id
    const storageRef = memeStorage.ref().child('templates').child(id)

    if (file !== null) {
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
            //name: file.name,
            created_at: firebase.firestore.Timestamp.now(),
            type: 'STORAGE',
            img: 'templates/' + id,
            url: await storageRef.getDownloadURL(),
            width: 1024,
            height: 768,
            //name: file.name, image from url doesnt have a name propoerty --> error
          })
          console.log('send image to storage: ', id)
        }
      )
    }
    if (externalUrl !== '') {
      collectionRef.add({
        name: 'external source',
        created_at: firebase.firestore.Timestamp.now(),
        type: 'EXTERNAL',
        img: 'templates/' + id,
        url: externalUrl,
        width: 1024,
        height: 768,
      })
      console.log('send external url to storage', id)
    }
  }, [externalUrl, file])

  return { progress, error, setFile, setExternalUrl }
}

export default useStorage
