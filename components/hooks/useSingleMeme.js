import { useEffect, useState } from 'react'
import firebase from '@/lib/firebase'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { useFilterContext } from '@/components/context/viewsContext'
import { useViewCount } from '@/components/hooks/useViewCount'
import { useSingleMemeContext } from '@/components/context/singlememeContext'
import { useRouter } from 'next/router'

export const useSingleMeme = () => {
  const router = useRouter()
  const {
    currentMeme,
    updateCurrent,
    prevMeme,
    setPrev,
    nextMeme,
    setNext,
  } = useSingleMemeContext()
  const { filter } = useFilterContext()
  const viewCount = useViewCount(updateCurrent)
  const [loadingPrev, setLoadingPrev] = useState(false)
  const [loadingNext, setLoadingNext] = useState(false)

  useEffect(() => {
    let operator = {}
    let sort = {}
    switch (filter) {
      case 'Latest':
        operator = { prev: '<', next: '>' }
        sort = { prev: 'desc', next: 'asc' }
        break
      case 'Oldest':
        operator = { prev: '>', next: '<' }
        sort = { prev: 'asc', next: 'desc' }
        break
      case 'MostViewed':
        operator = { prev: '<=', next: '>=' }
        sort = { prev: 'desc', next: 'asc' }
        break
      case 'NeverViewed':
        operator = { prev: '>=', next: '<=' }
        sort = { prev: 'asc', next: 'desc' }
        break
      default:
        console.log('Unsupported Case')
    }
    if (currentMeme) {
      let collectionRef = firebase.firestore().collection(FIRESTORE_COLLECTION.MEMES)
      switch (filter) {
        case 'MostViewed':
          if (prevMeme && nextMeme) return
          if (!prevMeme && !loadingPrev) {
            setLoadingPrev(true)
            collectionRef
              .where('views', operator.prev, currentMeme.views)
              .orderBy('views', sort.prev)
              .get()
              .then((prev) => {
                setLoadingPrev(false)
                console.debug(
                  'FIRESTORE_COLLECTION.MEMES',
                  'READ',
                  'SingleView',
                  'prevMeme',
                  filter
                )
                if (prev.docs.length > 0) {
                  for (let i = 0; i < prev.size; i++) {
                    if (
                      prev.docs[i].data().views == currentMeme.views &&
                      prev.docs[i].id < currentMeme.id
                    ) {
                      // console.log({ Firstcase: prev.docs[i].id, ...prev.docs[i].data() })
                      setPrev({ id: prev.docs[i].id, ...prev.docs[i].data() })
                      break
                    } else {
                      if (prev.docs[i].data().views != currentMeme.views) {
                        // console.log({ Secondcase: prev.docs[i].id, ...prev.docs[i].data() })
                        setPrev({ id: prev.docs[i].id, ...prev.docs[i].data() })
                        break
                      }
                    }
                  }
                }
              })
              .catch((e) => console.error(e))
          }
          if (!nextMeme && !loadingNext) {
            setLoadingNext(true)
            collectionRef
              .where('views', operator.next, currentMeme.views)
              .orderBy('views', sort.next)
              .get()
              .then((next) => {
                setLoadingNext(false)
                console.debug(
                  'FIRESTORE_COLLECTION.MEMES',
                  'READ',
                  'SingleView',
                  'nextMeme',
                  filter
                )
                if (next.docs.length > 0) {
                  for (let i = 0; i < next.size; i++) {
                    if (
                      next.docs[i].data().views == currentMeme.views &&
                      next.docs[i].id > currentMeme.id
                    ) {
                      //console.log({ Firstcase: next.docs[i].id, ...next.docs[i].data() })
                      setNext({ id: next.docs[i].id, ...next.docs[i].data() })
                      break
                    } else {
                      if (next.docs[i].data().views != currentMeme.views) {
                        //console.log({ Secondcase: next.docs[i].id, ...next.docs[i].data() })
                        setNext({ id: next.docs[i].id, ...next.docs[i].data() })
                        break
                      }
                    }
                  }
                }
                // next.size > 0 ? setNext({ id: next.docs[0].id, ...next.docs[0].data() }) : setNext(null)
              })
              .catch((e) => console.error(e))
          }
          break
        case 'NeverViewed':
          if (prevMeme && nextMeme) return
          if (!prevMeme && !loadingPrev) {
            setLoadingPrev(true)
            collectionRef
              .where('views', operator.prev, currentMeme.views)
              .orderBy('views', sort.prev)
              .get()
              .then((prev) => {
                setLoadingPrev(false)
                console.debug(
                  'FIRESTORE_COLLECTION.MEMES',
                  'READ',
                  'SingleView',
                  'prevMeme',
                  filter
                )
                if (prev.docs.length > 0) {
                  for (let i = 0; i < prev.size; i++) {
                    if (
                      prev.docs[i].data().views == currentMeme.views &&
                      prev.docs[i].id > currentMeme.id
                    ) {
                      // console.log({ Firstcase: prev.docs[i].id, ...prev.docs[i].data() })
                      setPrev({ id: prev.docs[i].id, ...prev.docs[i].data() })
                      break
                    } else {
                      if (prev.docs[i].data().views != currentMeme.views) {
                        // console.log({ Secondcase: prev.docs[i].id, ...prev.docs[i].data() })
                        setPrev({ id: prev.docs[i].id, ...prev.docs[i].data() })
                        break
                      }
                    }
                  }
                }
              })
              .catch((e) => console.error(e))
          }
          if (!nextMeme && !loadingNext) {
            setLoadingNext(true)
            collectionRef
              .where('views', operator.next, currentMeme.views)
              .orderBy('views', sort.next)
              .get()
              .then((next) => {
                setLoadingNext(false)
                console.debug(
                  'FIRESTORE_COLLECTION.MEMES',
                  'READ',
                  'SingleView',
                  'nextMeme',
                  filter
                )
                if (next.docs.length > 0) {
                  for (let i = 0; i < next.size; i++) {
                    if (
                      next.docs[i].data().views == currentMeme.views &&
                      next.docs[i].id < currentMeme.id
                    ) {
                      //console.log({ Firstcase: next.docs[i].id, ...next.docs[i].data() })
                      setNext({ id: next.docs[i].id, ...next.docs[i].data() })
                      break
                    } else {
                      if (next.docs[i].data().views != currentMeme.views) {
                        //console.log({ Secondcase: next.docs[i].id, ...next.docs[i].data() })
                        setNext({ id: next.docs[i].id, ...next.docs[i].data() })
                        break
                      }
                    }
                  }
                }
                // next.size > 0 ? setNext({ id: next.docs[0].id, ...next.docs[0].data() }) : setNext(null)
              })
              .catch((e) => console.error(e))
          }
          break
        default:
          if (prevMeme && nextMeme) return
          if (!prevMeme && !loadingPrev) {
            setLoadingPrev(true)
            collectionRef
              .where('createdAt', operator.prev, currentMeme.createdAt)
              .orderBy('createdAt', sort.prev)
              .limit(1)
              .get()
              .then((prev) => {
                setLoadingPrev(false)
                console.debug(
                  'FIRESTORE_COLLECTION.MEMES',
                  'READ',
                  'SingleView',
                  'prevMeme',
                  filter
                )
                //console.log({ PREV: prev.docs[0].id })
                prev.size > 0
                  ? setPrev({ id: prev.docs[0].id, ...prev.docs[0].data() })
                  : setPrev(null)
              })
              .catch((e) => console.error(e))
          }
          if (!nextMeme && !loadingNext) {
            setLoadingNext(true)
            collectionRef
              .where('createdAt', operator.next, currentMeme.createdAt)
              .orderBy('createdAt', sort.next)
              .limit(1)
              .get()
              .then((next) => {
                setLoadingNext(false)
                console.debug(
                  'FIRESTORE_COLLECTION.MEMES',
                  'READ',
                  'SingleView',
                  'nextMeme',
                  filter
                )
                next.size > 0
                  ? setNext({ id: next.docs[0].id, ...next.docs[0].data() })
                  : setNext(null)
              })
              .catch((e) => console.error(e))
          }
      }
    }
    // TODO Evaluate the dependencies of this useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMeme, filter, router])

  useEffect(() => {
    async function getData() {
      const db = firebase.firestore()
      return db.collection(FIRESTORE_COLLECTION.MEMES).doc(router.query.id).get()
    }
    if (currentMeme) return
    getData()
      .then((data) => {
        console.debug('FIRESTORE_COLLECTION.MEMES', 'READ', 'SingleView', 'currentMeme')
        if (data.data()) {
          //console.debug('FIRESTORE_COLLECTION.MEMES', 'READ')
          if (currentMeme && currentMeme.id !== data.id) {
            setNext(null)
            setPrev(null)
          }
          updateCurrent((_draft) => {
            return { id: data.id, ...data.data() }
          })
          viewCount.addView(data.id)
        }
      })
      .catch((e) => console.error(e))
    // TODO Evaluate the dependencies of this useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, filter])
}
