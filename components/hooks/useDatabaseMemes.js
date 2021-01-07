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
  const latestMemes = () => {
    loadCreds()
      .orderBy('created_at')
      .onSnapshot((docs) => {
        setDocs(docs)
      })
  }
  const twoMemes = () => {
    loadCreds()
      .orderBy('created_at')
      .limit(2)
      .onSnapshot((docs) => {
        setDocs(docs)
      })
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
    // TODO subscribe to get updates
    // TODO add paginationa
    switch (filter) {
      case 'Latest':
        //resolveMemes(getLatestMemes())
        latestMemes()
        break
      case 'Votes':
        //resolveMemes(getOldestMemes())
        twoMemes()
        break
      default:
        console.log('Unsupported case')
    }
  }, [setMemes, filter])
  return { dbMemes: Memes, dbFilter: filter, setFilter: changeFilter }
}
