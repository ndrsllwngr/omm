import { useState, useEffect } from 'react'
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
    console.warn('handleClick')
    switch (filter) {
      case 'Latest':
        resolveMemes(loadNextMemes('created_at', 'desc'))
        break
      case 'Oldest':
        resolveMemes(loadNextMemes('created_at', 'asc'))
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
    }).catch(function (error) {
      console.log({ error })
    })
  }
  useEffect(() => {
    //https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
    //https://blog.logrocket.com/react-hooks-with-firebase-firestore/
    switch (filter) {
      case 'Latest':
        resolveMemes(loadNextMemes('created_at', 'desc'))
        break
      case 'Oldest':
        resolveMemes(loadNextMemes('created_at', 'asc'))
        break
      default:
        console.log('Unsupported case')
    }
  }, [setMemes, filter, limit])
  return { dbMemes: Memes, dbFilter: filter, setFilter: changeFilter, setTrigger: handleClick }
}
