import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { FILTER, FIRESTORE_COLLECTION, VISIBILITY } from '@/lib/constants'
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
      case FILTER.LATEST:
        loadNextMemes('createdAt', 'desc', false)
        break
      case FILTER.OLDEST:
        loadNextMemes('createdAt', 'asc', false)
        break
      case FILTER.MOST_VIEWED:
        loadNextMemes('views', 'desc', false)
        break
      case FILTER.LEAST_VIEWED:
        loadNextMemes('views', 'asc', false)
        break
      default:
        console.log('Unsupported filter', filter)
    }
    // TODO Evaluate the dependencies of this useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, reload])

  const triggerNextMemes = () => {
    switch (filter) {
      case FILTER.LATEST:
        loadNextMemes('createdAt', 'desc', true)
        break
      case FILTER.OLDEST:
        loadNextMemes('createdAt', 'asc', true)
        break
      case FILTER.MOST_VIEWED:
        loadNextMemes('views', 'desc', true)
        break
      case FILTER.LEAST_VIEWED:
        loadNextMemes('views', 'asc', true)
        break
      default:
        console.log('Unsupported filter', filter)
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
      ? (query = loadCreds()
          .where('visibility', '==', VISIBILITY.PUBLIC)
          .orderBy('' + create + '', '' + sorting + ''))
      : (query = loadCreds().orderBy('' + create + ''))

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
