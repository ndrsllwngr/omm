import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

export const useDatabaseMemes = () => {
  const [Memes, setMemes] = useState([])

  useEffect(() => {
    // TODO subscribe to get updates
    // TODO add pagination
    async function getMemes() {
      const docs = await firebase.firestore().collection('memes').orderBy('created_at').get()
      let dbMemes = []
      for (let i = 0; i < docs.size; i++) {
        const doc = docs.docs[i]
        dbMemes.push({ id: doc.id, ...doc.data() })
      }
      return dbMemes
    }

    getMemes()
      .then((res) => {
        //console.log({ res })
        setMemes(res)
      })
      .catch(function (error) {
        console.log({ error })
      })
  }, [setMemes])

  return Memes
}
