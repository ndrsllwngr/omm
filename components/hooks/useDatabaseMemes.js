import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

export const useDatabaseMemes = () => {
  const [Memes, setMemes] = useState([])

  useEffect(() => {
    //TODO subscribe adden
    async function getMemes() {
      const docs = await firebase.firestore().collection('memes').get()
      let dbMemes = []
      for (let i = 0; i < docs.size; i++) {
        const doc = docs.docs[i]
        const templateData = (await doc.data().template.get()).data()
        const imgPath = await firebase.storage().ref(templateData.img).getDownloadURL()

        dbMemes.push({ id: doc.id, ...doc.data(), imgPath })
      }

      return dbMemes
    }

    getMemes()
      .then((res) => {
        console.log({ res })
        setMemes(res)
      })
      .catch(function (error) {
        console.log({ error })
      })
  }, [setMemes])

  return Memes
}
