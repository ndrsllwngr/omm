import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { useFilterContext, useReloadContext } from '@/components/context/viewsContext'
import { useImmer } from 'use-immer'

export const useDatabaseMemes = () => {
  const limit = 20
  const [memes, updateMemes] = useImmer([])
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
    // TODO Evaluate the dependencies of this useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, reload])

  const triggerNextMemes = () => {
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
  async function loadNextMemes(create, sorting, triggerNext) {
    if (!triggerNext) {
      updateMemes((_draft) => {
        return []
      })
      setLatestDoc(null)
      setHasMoreFiles(true)
    }
    let query = ''
    sorting
      ? (query = loadCreds().orderBy('' + create + '', '' + sorting + ''))
      : (query = loadCreds().orderBy('' + create + ''))

    if (triggerNext && latestDoc) {
      query = query.startAfter(latestDoc)
    }
    const docs = await query.limit(limit).get()

    if (docs.size === 0) {
      setHasMoreFiles(false)
    }

    const snapShotMemes = []

    docs.forEach((doc) => {
      snapShotMemes.push({ id: doc.id, ...doc.data() })
    })

    setLatestDoc(docs.docs[docs.docs.length - 1])

    // console.log({ Snaopshotmemes: snapShotMemes })
    // console.log({ MemesboforeSet: Memes })
    // console.log({ Memeslenght: Memes.length })
    // setMemes([...Memes, ...snapShotMemes])
    triggerNext
      ? updateMemes((draft) => {
          draft.push(...snapShotMemes)
        })
      : updateMemes((draft) => {
          return snapShotMemes
        })
  }

  return {
    dbMemes: memes,
    updateMemes,
    triggerNextMemes: triggerNextMemes,
    endOfFiles: hasMoreFiles,
  }
}
