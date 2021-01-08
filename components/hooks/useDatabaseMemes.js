import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

export const useDatabaseMemes = () => {
  const [Memes, setMemes] = useState([])
  const [filter, setFilter] = useState('Latest')

  const changeFilter = (filter) => {
    setFilter(filter)
  }

  const loadCreds = () => {
    return firebase.firestore().collection('memes')
  }
  const setDocs = (docs) => {
    let dbMemes = []
    docs.forEach((doc) => {
      dbMemes.push({ id: doc.id, ...doc.data() })
    })
    setMemes(dbMemes)
  }

  // async function getLatestMemes() {
  //   const docs = await loadCreds().orderBy('created_at').get()
  //   let dbMemes = []
  //   for (let i = 0; i < docs.size; i++) {
  //     const doc = docs.docs[i]
  //     dbMemes.push({ id: doc.id, ...doc.data() })
  //   }
  //   return dbMemes
  // }

  // async function getOldestMemes() {
  //   const docs = await loadCreds().orderBy('created_at').limit(2).get()
  //   let dbMemes = []
  //   for (let i = 0; i < docs.size; i++) {
  //     const doc = docs.docs[i]
  //     dbMemes.push({ id: doc.id, ...doc.data() })
  //   }
  //   return dbMemes
  // }

  // function resolveMemes(cb) {
  //   cb.then((res) => {
  //     setMemes(res)
  //   }).catch(function (error) {
  //     console.log({ error })
  //   })
  // }

  useEffect(() => {
    // TODO add paginationa

    // const twoMemes = () => {
    //   loadCreds()
    //     .orderBy('created_at')
    //     .limit(2)
    //     .onSnapshot((docs) => {
    //       setDocs(docs)
    //     })
    // }
    // const latestMemesUnsubscribe = loadCreds()
    //   .orderBy('created_at', 'desc')
    //   .onSnapshot((docs) => {
    //     setDocs(docs)
    //   })
    // const twoMemesUnsubscribe = loadCreds()
    //   .orderBy('created_at')
    //   .limit(2)
    //   .onSnapshot((docs) => {
    //     setDocs(docs)
    //   })
    //https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
    switch (filter) {
      case 'Latest':
        //resolveMemes(getLatestMemes())
        const latestMemesUnsubscribe = loadCreds()
          .orderBy('created_at', 'desc')
          .onSnapshot((docs) => {
            setDocs(docs)
          })
        return latestMemesUnsubscribe
      case 'Votes':
        const twoMemesUnsubscribe = loadCreds()
          .orderBy('created_at')
          .limit(2)
          .onSnapshot((docs) => {
            setDocs(docs)
          })
        return twoMemesUnsubscribe

      default:
        console.log('Unsupported case')
    }
  }, [setMemes, filter])
  return { dbMemes: Memes, dbFilter: filter, setFilter: changeFilter }
}
