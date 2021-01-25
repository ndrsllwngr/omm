import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { FIRESTORE_COLLECTION, VISIBILITY } from '@/lib/constants'

export const useRandomMeme = (router) => {
  const [id, setId] = useState([])

  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  useEffect(() => {
    async function getRandomMeme() {
      const memeCollection = await firebase
        .firestore()
        .collection(FIRESTORE_COLLECTION.MEMES)
        .where('visibility', '==', VISIBILITY.PUBLIC)
        .get()
      console.debug(`FIRESTORE_COLLECTION.MEMES`, 'READ', 'useRandomMeme')
      // TODO DON'T CALL IN CONTEXT
      const ids = []
      if (memeCollection.size > 1) {
        memeCollection.forEach((meme) => ids.push(meme.id))

        var random = getRandomInt(0, ids.length - 1)

        while (ids[random] === router.query.id) {
          random = getRandomInt(0, ids.length - 1)
        }
        setId(ids[random])
      }
    }
    getRandomMeme()
  }, [router.query.id])

  return { id }
}
