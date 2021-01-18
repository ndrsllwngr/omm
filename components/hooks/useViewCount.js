/* eslint-disable react-hooks/exhaustive-deps */
import firebase from '@/lib/firebase'
import cookieCutter from 'cookie-cutter'
import { FIRESTORE_COLLECTION, VOTE } from '@/lib/constants'

export const useViewCount = () => {
  const addView = (memeID) => {
    if (!cookieCutter.get(memeID)) {
      const db = firebase.firestore()
      const increment = firebase.firestore.FieldValue.increment(1)
      const memeRef = db.collection(FIRESTORE_COLLECTION.MEMES).doc(memeID)

      const today = new Date()
      const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)

      console.log(`Adding view for meme ${memeID}!`)

      memeRef
        .update({ views: increment })
        .then(cookieCutter.set(memeID, true, { expires: nextWeek }))
    }
  }
  return { addView }
}
