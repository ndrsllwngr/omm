import { useState, useEffect, useCallback } from 'react'
import firebase from '@/lib/firebase'

export const useDatabaseMemes = (limit) => {
  const [Memes, setMemes] = useState([])
  const [filter, setFilter] = useState('Latest')
  const [latestDoc, setLatestDoc] = useState(null)

  const changeFilter = (f) => {
    setMemes([])
    setLatestDoc(null)
    setFilter(f)
  }
  const handleClick = () => {
    //switch case to handle resolved memes
    console.warn('handleClick')
    switch (filter) {
      case 'Latest':
        resolveMemes(loadLatestMemes('created_at', 'desc'))
        break
      case 'Oldest':
        resolveMemes(loadOldestMemes('created_at', 'asc'))
        break
      default:
        console.log('Unsupported case')
    }
  }

  const loadCreds = () => {
    return firebase.firestore().collection('memes-tmp')
  }
  // const setDocs = (docs) => {
  //   let dbMemes = []
  //   docs.forEach((doc) => {
  //     dbMemes.push({ id: doc.id, ...doc.data() })
  //   })
  //   setMemes(dbMemes)
  // }

  const loadLatestMemes = async () => {
    let query = loadCreds().orderBy('created_at', 'desc')
    if (latestDoc) {
      query = query.startAfter(latestDoc)
    }
    const docs = await query.limit(limit).get()
    let snapShotMemes = []
    docs.forEach((doc) => {
      snapShotMemes.push({ id: doc.id, ...doc.data() })
    })
    setLatestDoc(docs.docs[docs.docs.length - 1])
    return snapShotMemes
  }
  const loadOldestMemes = async () => {
    let query = loadCreds().orderBy('created_at', 'asc')
    if (latestDoc) {
      query = query.startAfter(latestDoc)
    }
    const docs = await query.limit(limit).get()
    let snapShotMemes = []
    docs.forEach((doc) => {
      snapShotMemes.push({ id: doc.id, ...doc.data() })
    })
    setLatestDoc(docs.docs[docs.docs.length - 1])
    return snapShotMemes
  }

  function resolveMemes(cb) {
    cb.then((res) => {
      !Memes || !(Memes.length > 0) ? setMemes(res) : setMemes([...Memes, ...res])
      console.log({ resolveMemes: res, Memes })
    }).catch(function (error) {
      console.log({ error })
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

  //onfilter switch erase meme array
  useEffect(() => {
    //https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
    //https://blog.logrocket.com/react-hooks-with-firebase-firestore/
    switch (filter) {
      case 'Latest':
        resolveMemes(loadLatestMemes('created_at', 'desc'))
        break
      case 'Oldest':
        resolveMemes(loadOldestMemes('created_at', 'asc'))
        break
      default:
        console.log('Unsupported case')
    }
  }, [setMemes, filter, limit])
  return { dbMemes: Memes, dbFilter: filter, setFilter: changeFilter, setTrigger: handleClick }
}
