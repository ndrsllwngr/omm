import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { useFilterContext } from '@/components/context/filterContext'
import { useReloadContext } from '@/components/context/reloadContext'

export const useDatabaseMemes = () => {
  const limit = 20
  const [Memes, setMemes] = useState([])
  //const [filter, setFilter] = useState('Latest')
  const { filter } = useFilterContext()
  const { reload } = useReloadContext()

  const [latestDoc, setLatestDoc] = useState(null)
  const [hasMoreFiles, setHasMoreFiles] = useState(true)

  const loadCreds = () => {
    return firebase.firestore().collection(FIRESTORE_COLLECTION.MEMES)
  }
  useEffect(() => {
    //https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
    //https://blog.logrocket.com/react-hooks-with-firebase-firestore/
    //TODO usecallback to prevent dependency issues

    switch (filter) {
      case 'Latest':
        loadNextMemes('createdAt', 'desc', false)
        break
      case 'Oldest':
        loadNextMemes('createdAt', 'asc', false)
        break
      case 'Views':
        loadNextMemes('views', 'desc', false)
        break
      default:
        console.log('Unsupported case')
    }
  }, [filter, reload])

  // useEffect(() => {
  //   const onFilterChange = (f) => {
  //     setMemes([])
  //     setLatestDoc(null)
  //     setHasMoreFiles(true)
  //     setFilter(f)
  //   }
  //   onFilterChange(filter)
  // }, [setFilter])

  // useEffect(() => {
  //   console.log({ FILTER: filter })
  //   setMemes([])
  //   setLatestDoc(null)
  //   setHasMoreFiles(true)
  // }, [filter])

  const triggerNextMemes = () => {
    //console.warn('handleClick')
    // if (docSize === 0) {
    //   return
    // }
    switch (filter) {
      case 'Latest':
        loadNextMemes('createdAt', 'desc', true)
        break
      case 'Oldest':
        loadNextMemes('createdAt', 'asc', true)
        break
      case 'Views':
        loadNextMemes('views', 'desc', true)
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
  async function loadNextMemes(create, sort, triggerNext) {
    if (!triggerNext) {
      setMemes([])
      setLatestDoc(null)
      setHasMoreFiles(true)
    }
    let query = ''
    if (sort) {
      query = loadCreds().orderBy('' + create + '', '' + sort + '')
    } else {
      query = loadCreds().orderBy('' + create + '')
    }
    if (triggerNext && latestDoc) {
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

    // console.log({ Snaopshotmemes: snapShotMemes })
    // console.log({ MemesboforeSet: Memes })
    // console.log({ Memeslenght: Memes.length })
    triggerNext ? setMemes([...Memes, ...snapShotMemes]) : setMemes(snapShotMemes)
  }

  return {
    dbMemes: Memes,
    triggerNextMemes: triggerNextMemes,
    endOfFiles: hasMoreFiles,
  }
}
