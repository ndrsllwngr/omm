import { useEffect } from 'react'
import firebase from '@/lib/firebase'
import { useFilterContext } from '@/components/context/viewsContext'

import { FIRESTORE_COLLECTION } from '@/lib/constants'
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

  useEffect(() => {
    console.log({ CALCNEXTMEME: nextMeme })
  }, [nextMeme])
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
    if (currentMeme && !prevMeme && !nextMeme) {
      let collectionRef = firebase.firestore().collection(FIRESTORE_COLLECTION.MEMES)
      switch (filter) {
        case 'MostViewed':
          collectionRef
            .where('views', operator.prev, currentMeme.views)
            .orderBy('views', sort.prev)
            .get()
            .then((prev) => {
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
          collectionRef
            .where('views', operator.next, currentMeme.views)
            .orderBy('views', sort.next)
            .get()
            .then((next) => {
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
          break
        case 'NeverViewed':
          collectionRef
            .where('views', operator.prev, currentMeme.views)
            .orderBy('views', sort.prev)
            .get()
            .then((prev) => {
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
          collectionRef
            .where('views', operator.next, currentMeme.views)
            .orderBy('views', sort.next)
            .get()
            .then((next) => {
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
          break
        default:
          collectionRef
            .where('createdAt', operator.prev, currentMeme.createdAt)
            .orderBy('createdAt', sort.prev)
            .limit(1)
            .get()
            .then((prev) => {
              //console.log({ PREV: prev.docs[0].id })
              prev.size > 0
                ? setPrev({ id: prev.docs[0].id, ...prev.docs[0].data() })
                : setPrev(null)
            })
            .catch((e) => console.error(e))
          collectionRef
            .where('createdAt', operator.next, currentMeme.createdAt)
            .orderBy('createdAt', sort.next)
            .limit(1)
            .get()
            .then((next) => {
              next.size > 0
                ? setNext({ id: next.docs[0].id, ...next.docs[0].data() })
                : setNext(null)
            })
            .catch((e) => console.error(e))
      }
    }
    // TODO Evaluate the dependencies of this useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMeme, filter, prevMeme, nextMeme])

  useEffect(() => {
    async function getData() {
      const db = firebase.firestore()
      return db.collection(FIRESTORE_COLLECTION.MEMES).doc(router.query.id).get()
    }
    getData()
      .then((data) => {
        if (data.data()) {
          console.debug('FIRESTORE_COLLECTION.MEMES', 'READ')
          viewCount.addView(data.id)
          updateCurrent((_draft) => {
            return { id: data.id, ...data.data() }
          })
          if (currentMeme && currentMeme.id !== data.id) {
            setNext(null)
            setPrev(null)
          }
        }
      })
      .catch((e) => console.error(e))
    // TODO Evaluate the dependencies of this useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, filter])
}
