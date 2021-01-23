import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { SORT, FIRESTORE_COLLECTION, VISIBILITY } from '@/lib/constants'
import { useSortContext, useReloadContext } from '@/components/context/viewsContext'
import { useImmer } from 'use-immer'

export const useDatabaseMemes = () => {
  const limit = 20
  const [memes, updateMemes] = useImmer([])
  const { sort } = useSortContext()
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

    switch (sort) {
      case SORT.LATEST:
        loadNextMemes('createdAt', 'desc', false)
        break
      case SORT.OLDEST:
        loadNextMemes('createdAt', 'asc', false)
        break
      case SORT.MOST_VIEWED:
        loadNextMemes('views', 'desc', false)
        break
      case SORT.LEAST_VIEWED:
        loadNextMemes('views', 'asc', false)
        break
      default:
        console.log('Unsupported sort', sort)
    }
    // TODO Evaluate the dependencies of this useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, reload])

  const triggerNextMemes = () => {
    switch (sort) {
      case SORT.LATEST:
        loadNextMemes('createdAt', 'desc', true)
        break
      case SORT.OLDEST:
        loadNextMemes('createdAt', 'asc', true)
        break
      case SORT.MOST_VIEWED:
        loadNextMemes('views', 'desc', true)
        break
      case SORT.LEAST_VIEWED:
        loadNextMemes('views', 'asc', true)
        break
      default:
        console.log('Unsupported sort', sort)
    }
  }

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
      ? (query = loadCreds().where('visibility', '==', VISIBILITY.PUBLIC).orderBy(create, sorting))
      : (query = loadCreds().where('visibility', '==', VISIBILITY.PUBLIC).orderBy(create))

    if (triggerNext && latestDoc) {
      query = query.startAfter(latestDoc)
    }
    const docs = await query.limit(limit).get()
    console.debug(`FIRESTORE_COLLECTION.MEMES`, 'READ', 'useDatabaseMemes', 'loadNextMemes')

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
