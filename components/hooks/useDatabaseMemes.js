import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

export const useDatabaseMemes = () => {
  const [Memes, setMemes] = useState([])
  const [filter, setFilter] = useState('Latest')

  function changeFilter(filter) {
    setFilter(filter)
  }

  useEffect(() => {
    // TODO subscribe to get updates
    // TODO add paginationa
    switch (filter) {
      case 'Latest':
        async function getLatestMemes() {
          const docs = await firebase.firestore().collection('memes').orderBy('created_at').get()
          let dbMemes = []
          for (let i = 0; i < docs.size; i++) {
            const doc = docs.docs[i]
            dbMemes.push({ id: doc.id, ...doc.data() })
          }
          return dbMemes
        }

        getLatestMemes()
          .then((res) => {
            setMemes(res)
          })
          .catch(function (error) {
            console.log({ error })
          })
        break
      case 'Votes':
        async function getOldestMemes() {
          const docs = await firebase
            .firestore()
            .collection('memes')
            .orderBy('created_at')
            .limit(2)
            .get()
          let dbMemes = []
          for (let i = 0; i < docs.size; i++) {
            const doc = docs.docs[i]
            dbMemes.push({ id: doc.id, ...doc.data() })
          }
          return dbMemes
        }

        getOldestMemes()
          .then((res) => {
            setMemes(res)
          })
          .catch(function (error) {
            console.log({ error })
          })
        break
      // case 'Views':
      //   setFilter(filter)
      // //

      default:
        console.log('Unsupported case')
    }
  }, [setMemes, filter])
  return { dbMemes: Memes, dbFilter: filter, setFilter: changeFilter }
}
