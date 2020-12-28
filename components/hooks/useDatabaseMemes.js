import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

export const useDatabaseMemes = () => {
  const [Memes, setMemes] = useState([])

  useEffect(() => {
    async function getMemes() {
      const docs = await firebase.firestore().collection('memes').get()

      let dbMemes = []
      //https://advancedweb.hu/how-to-use-async-functions-with-array-foreach-in-javascript/
      await Promise.all(
        docs.map((doc) => {
          async function getTemplate() {
            const temp = (await doc.data().template.get()).data()
            return firebase
              .storage()
              .ref(temp.img)
              .getDownloadURL()
              .then((res) => {
                return res
              })
          }
          const url = async () => {
            const result = await getTemplate()
            return result
          }
          dbMemes.push({ id: doc.id, ...doc.data(), url: url() })
        })
      )

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
