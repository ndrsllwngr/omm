import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

export const useDatabaseMemes = (limit) => {
  const [Memes, setMemes] = useState([])
  const [filter, setFilter] = useState('Oldest')
  const [latestDoc, setLatestDoc] = useState(null)

  const changeFilter = (filter) => {
    setFilter(filter)
  }
  const handleClick = () => {
    //switch case to handle resolved memes
    switch (filter) {
      case 'Latest':
        resolveMemes(loadLatestMemes('created_at', 'desc'))
        break
      case 'Oldest':
        resolveMemes(loadOldestMemes('created_at'))
        break
      default:
        console.log('Unsupported case')
        break
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
    //let query = ''
    // if (d) {
    //   query = loadCreds().orderBy('' + c + '', '' + d + '')
    // } else {
    //   query = loadCreds().orderBy('' + c + '')
    // }

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
    let query = loadCreds().orderBy('created_at')
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
      console.log({ RESOLVEDMEME: Memes })
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
    // TODO add paginationa

    //https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
    //https://blog.logrocket.com/react-hooks-with-firebase-firestore/
    switch (filter) {
      case 'Latest':
        //erase Memes and latestdoc
        setMemes([])
        console.log({ LatestMEMES: Memes })
        setLatestDoc(null)
        resolveMemes(loadLatestMemes('created_at', 'desc'))
        console.log({ LatestMEMESafter: Memes })

        // const latestMemesUnsubscribe = loadCreds()
        //   .orderBy('created_at', 'desc')
        //   .limit(limit)
        //   .onSnapshot((docs) => {
        //     //https://medium.com/javascript-in-plain-english/firebase-firestore-database-realtime-updates-with-react-hooks-useeffect-346c1e154219
        //     setDocs(docs)
        //   })

        // return latestMemesUnsubscribe
        break
      case 'Oldest':
        //erase Memes and latestdoc
        setMemes([])
        console.log({ OLDMEMES: Memes })
        setLatestDoc(null)
        resolveMemes(loadOldestMemes('created_at'))
        console.log({ OLDMEMESAFTER: Memes })
        break
      //resolveMemes(getLatestMemes())
      // const oldestMemesUnsubscribe = loadCreds()
      //   .orderBy('created_at')
      //   .onSnapshot((docs) => {
      //     setDocs(docs)
      //   })
      // return oldestMemesUnsubscribe
      // case 'Votes':
      //   const twoMemesUnsubscribe = loadCreds()
      //     .orderBy('created_at')
      //     .limit(2)
      //     .onSnapshot((docs) => {
      //       setDocs(docs)
      //     })
      //   return twoMemesUnsubscribe

      default:
        setMemes([])
        setLatestDoc(null)
        console.log('Unsupported case')
    }
  }, [setMemes, filter, limit])
  return { dbMemes: Memes, dbFilter: filter, setFilter: changeFilter, setTrigger: handleClick }
}
