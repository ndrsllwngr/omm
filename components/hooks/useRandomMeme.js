import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { FIRESTORE_COLLECTION } from '@/lib/constants'

// https://www.cluemediator.com/detect-click-outside-a-react-component-using-react-hooks
export const useRandomMeme = (router) => {
  const [id, setId] = useState([])

  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  useEffect(() => {
    async function getRandomMeme() {
      let memeCollection = await firebase.firestore().collection(FIRESTORE_COLLECTION.MEMES).get()
      const ids = []
      memeCollection.forEach((meme) => ids.push(meme.id))

      let random = getRandomInt(0, ids.length - 1)

      while (ids[random] === router.query.id) {
        random = getRandomInt(0, ids.length - 1)
      }
      setId(ids[random])
    }
    getRandomMeme()
  }, [router.query.id])

  return { id }
}
