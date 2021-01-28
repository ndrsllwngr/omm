import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { FIRESTORE_COLLECTION, STORAGE_COLLECTION } from '@/lib/constants'
import { useAuth } from '@/components/context/authContext'

const useStorage = () => {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [externalUrl, setExternalUrl] = useState('')
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
          console.log('percentage:', percentage)
          console.log('in file', file)
        },
        (err) => {
          setError(err)
          console.log(err)
        },
        async () => {
          console.debug(`STORAGE_COLLECTION.TEMPLATES`, 'WRITE', 'useStorage', 'useEffect', file)
          collectionRef
            .add({
              //name: file.name,
              createdAt: firebase.firestore.Timestamp.now(),
              createdBy: auth.getUser().id,
              img: STORAGE_COLLECTION.TEMPLATES + '/' + id,
              type: 'STORAGE',
              url: await storageRef.getDownloadURL(),
              width: 1024,
              height: 768,
              //name: file.name, image from url doesn't have a name property --> error
            })
            .then(() => {
              setFile(null)
              console.debug(
                `FIRESTORE_COLLECTION.TEMPLATES`,
                'WRITE',
                'useStorage',
                'useEffect',
                file
              )
              console.log('send external url to storage', id)
            })
            .catch((e) => console.error(e))
        }
      )
    }
    if (externalUrl !== '') {
      const memeFirestore = firebase.firestore()
      const collectionRef = memeFirestore.collection(FIRESTORE_COLLECTION.TEMPLATES)
      const id = collectionRef.doc().id
      collectionRef
        .add({
          name: 'external source',
          createdAt: firebase.firestore.Timestamp.now(),
          createdBy: auth.getUser().id,
          type: 'EXTERNAL',
          img: 'templates/' + id,
          url: externalUrl,
          width: 1024,
          height: 768,
        })
        .then(() => {
          setExternalUrl('')
          console.debug(
            `FIRESTORE_COLLECTION.TEMPLATES`,
            'WRITE',
            'useStorage',
            'useEffect',
            externalUrl
          )
          console.log('send external url to storage', id)
        })
        .catch((e) => console.error(e))
    }
  }, [file, auth, externalUrl])

  return { progress, error, setFile, setExternalUrl }
}

export default useStorage
