import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

export const useDatabaseMemes = (limit) => {
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
    //https://blog.logrocket.com/react-hooks-with-firebase-firestore/
    switch (filter) {
      case 'Latest':
        //resolveMemes(getLatestMemes())
        const latestMemesUnsubscribe = loadCreds()
          .orderBy('created_at', 'desc')
          .limit(limit)
          .onSnapshot((docs) => {
            //https://medium.com/javascript-in-plain-english/firebase-firestore-database-realtime-updates-with-react-hooks-useeffect-346c1e154219
            setDocs(docs)
          })

        return latestMemesUnsubscribe
      case 'Oldest':
        //resolveMemes(getLatestMemes())
        const oldestMemesUnsubscribe = loadCreds()
          .orderBy('created_at')
          .onSnapshot((docs) => {
            setDocs(docs)
          })
        return oldestMemesUnsubscribe
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
  }, [setMemes, filter, limit])
  return { dbMemes: Memes, dbFilter: filter, setFilter: changeFilter }
}
