import firebase from '@/lib/firebase'
import cookieCutter from 'cookie-cutter'
import { FIRESTORE_COLLECTION } from '@/lib/constants'

export const useViewCount = (updateCurrent = null) => {
  const addView = (memeID) => {
    if (!cookieCutter.get(memeID)) {
      const db = firebase.firestore()
      const increment = firebase.firestore.FieldValue.increment(1)

      const today = new Date()
      const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)

      console.log(`Adding view for meme ${memeID}!`)

      db.collection(FIRESTORE_COLLECTION.MEMES)
        .doc(memeID)
        .update({ views: increment })
        .then(() => {
          console.debug(`FIRESTORE_COLLECTION.MEMES`, 'WRITE', 'useViewCount')
          console.log({ src: 'useViewCount', updateCurrent, memeID })
          if (updateCurrent) {
            updateCurrent((draft) => {
              console.log({ draft })
              draft.views = draft.views + 1
            })
          }
          cookieCutter.set(memeID, true, { expires: nextWeek })
        })
        .catch((e) => console.error(e))
    }
  }
  return { addView }
}
