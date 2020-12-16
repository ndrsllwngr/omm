import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

export const useDatabaseMemes = () => {
  const [Memes, setMemes] = useState([])

  useEffect(() => {
    async function getMemes() {
      const docs = await firebase.firestore().collection('memes').get()
      let dbMemes = []
      docs.forEach((doc) => {
        dbMemes.push({ id: doc.id, ...doc.data() })
      })
      return dbMemes
    }
    getMemes()
      .then((res) => setStuff(res))
      .catch(function (error) {
        console.log({ error })
      })
  }, [setMemes])

  return Memes
}
