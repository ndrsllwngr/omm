import { useEffect, useState } from 'react'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { useReloadContext } from '@/components/context/viewsContext'
import firebase from '@/lib/firebase'

export const useMemeReload = () => {
  const [showNewMemes, setShowNewMemes] = useState(false)
  const { reload, setReload } = useReloadContext()
  const [counter, setCounter] = useState(0)
  const [date, setDate] = useState(firebase.firestore.Timestamp.now())

  // TODO pause onSnapshot if tab is not in focus
  // TODO see for example https://github.com/jpalumickas/use-window-focus or use react-query
  useEffect(() => {
    const db = firebase.firestore()
    let unsubscribe = db
      .collection(FIRESTORE_COLLECTION.MEME_HISTORY)
      .where('createdAt', '>', date)
      .onSnapshot(function (snapshot) {
        if (snapshot.size > 0) {
          setCounter(snapshot.size)
          setShowNewMemes(true)
        }
      })

    return () => unsubscribe()
    // TODO Evaluate the dependencies of this useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
