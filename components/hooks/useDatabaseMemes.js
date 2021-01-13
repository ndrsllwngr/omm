import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'

export const useDatabaseMemes = (limit) => {
  const [Memes, setMemes] = useState([])
  const [filter, setFilter] = useState('Oldest')
  const [latestDoc, setLatestDoc] = useState(null)
  const [hasMoreFiles, setHasMoreFiles] = useState(true)

  const loadCreds = () => {
    return firebase.firestore().collection('memes-tmp')
  }
  const onFilterChange = (f) => {
    setMemes([])
    setLatestDoc(null)
    setHasMoreFiles(true)
    setFilter(f)
  }
  const triggerNextMemes = () => {
    //console.warn('handleClick')
    // if (docSize === 0) {
    //   return
    // }
    switch (filter) {
      case 'Latest':
        loadNextMemes('created_at', 'desc')
        break
      case 'Oldest':
        loadNextMemes('created_at', 'asc')
        break
      default:
        console.log('Unsupported case')
    }
  }

  // const setDocs = (docs) => {
  //   let dbMemes = []
  //   docs.forEach((doc) => {
  //     dbMemes.push({ id: doc.id, ...doc.data() })
  //   })
  //   setMemes(dbMemes)
  // }
  // const loadNextMemes = async (c, d) => {
  //   let query = ''
  //   if (d) {
  //     query = loadCreds().orderBy('' + c + '', '' + d + '')
  //   } else {
  //     query = loadCreds().orderBy('' + c + '')
  //   }
  //   if (latestDoc) {
  //     query = query.startAfter(latestDoc)
  //   }
  //   const docs = await query.limit(limit).get()
  //   let snapShotMemes = []
  //   docs.forEach((doc) => {
  //     snapShotMemes.push({ id: doc.id, ...doc.data() })
  //   })
  //   setLatestDoc(docs.docs[docs.docs.length - 1])
  //   return snapShotMemes

  // }

  // const resolveMemes = useCallback((cb) => {
  //   cb.then((res) => {
  //     !Memes || !(Memes.length > 0) ? setMemes(res) : setMemes([...Memes, ...res])
  //   }).catch(function (error) {
  //     console.log({ error })
  //   })
  // }, [])
  // function resolveMemes(cb) {
  //   cb.then((res) => {
  //     !Memes || !(Memes.length > 0) ? setMemes(res) : setMemes([...Memes, ...res])
  //   }).catch(function (error) {
  //     console.log({ error })
  //   })
  // }
  const loadNextMemes = async (c, d) => {
    let query = ''
    if (d) {
      query = loadCreds().orderBy('' + c + '', '' + d + '')
    } else {
      query = loadCreds().orderBy('' + c + '')
    }
    if (latestDoc) {
      query = query.startAfter(latestDoc)
    }
    const docs = await query.limit(limit).get()

    if (docs.size === 0) {
      setHasMoreFiles(false)
    }

    let snapShotMemes = []

    docs.forEach((doc) => {
      snapShotMemes.push({ id: doc.id, ...doc.data() })
    })

    setLatestDoc(docs.docs[docs.docs.length - 1])
    !Memes || !(Memes.length > 0) ? setMemes(snapShotMemes) : setMemes([...Memes, ...snapShotMemes])
  }
  useEffect(() => {
    //https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
    //https://blog.logrocket.com/react-hooks-with-firebase-firestore/
    //TODOuse callbackl to prevent dependency issues

    switch (filter) {
      case 'Latest':
        loadNextMemes('created_at', 'desc')
        break
      case 'Oldest':
        loadNextMemes('created_at', 'asc')
        break
      default:
        console.log('Unsupported case')
    }
  }, [setMemes, filter, limit])
  return {
    dbMemes: Memes,
    dbFilter: filter,
    setFilter: onFilterChange,
    triggerNextMemes: triggerNextMemes,
    endOfFiles: hasMoreFiles,
  }
}
