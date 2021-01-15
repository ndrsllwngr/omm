import { useEffect, useState } from 'react'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { useReloadContext } from '@/components/context/reloadContext'
import firebase from '@/lib/firebase'

export const useMemeReload = () => {
  const [showNewMemes, setShowNewMemes] = useState(false)
  const { reload, setReload } = useReloadContext()
  const [counter, setCounter] = useState(0)
  const [date, setDate] = useState(firebase.firestore.Timestamp.now())
  useEffect(() => {
    console.log({ GCOUNTER: counter })
  }, [counter])

  useEffect(() => {
    const db = firebase.firestore()
    let unsub = db
      .collection(FIRESTORE_COLLECTION.MEMES)
      .where('createdAt', '>', date)
      .onSnapshot(function (snapshot) {
        if (snapshot.size > 0) {
          setCounter(snapshot.size)
          setShowNewMemes(true)
        }
      })

    return () => unsub()
  }, [reload])

  return {
    showNewMemes: showNewMemes,
    setReload: setReload,
    setShowNewMemes: setShowNewMemes,
    setCounter: setCounter,
    setDate: setDate,
    counter: counter,
    reload: reload,
  }
}
