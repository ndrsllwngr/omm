import { useEffect } from 'react'
import firebase from '@/lib/firebase'
import { SORT, FIRESTORE_COLLECTION, VISIBILITY } from '@/lib/constants'
import { useSortContext } from '@/components/context/viewsContext'
import { useViewCount } from '@/components/hooks/useViewCount'
import {
  useSingleMemeContext,
  useSingleMemeLoadingContext,
} from '@/components/context/singlememeContext'
import { useRouter } from 'next/router'
import { useAuth } from '@/components/context/authContext'

export const useSingleMeme = () => {
  const router = useRouter()
  const auth = useAuth()
  const {
    currentMeme,
    updateCurrent,
    prevMeme,
    setPrev,
    nextMeme,
    setNext,
  } = useSingleMemeContext()
  const {
    prevIsLoading,
    setPrevIsLoading,
    nextIsLoading,
    setNextIsLoading,
    currentIsLoading,
    setCurrentIsLoading,
  } = useSingleMemeLoadingContext()
  const { sort } = useSortContext()
  const viewCount = useViewCount(updateCurrent)

  useEffect(() => {
    //console.info({ currentMeme, prevMeme, nextMeme })
  }, [currentMeme, prevMeme, nextMeme])

  useEffect(() => {
    let whereOpStr = {}
    let orderByDirection = {}
    switch (sort) {
      case SORT.LATEST:
        whereOpStr = { prev: '<', next: '>' }
        orderByDirection = { prev: 'desc', next: 'asc' }
        break
      case SORT.OLDEST:
        whereOpStr = { prev: '>', next: '<' }
        orderByDirection = { prev: 'asc', next: 'desc' }
        break
      case SORT.MOST_VIEWED:
        whereOpStr = { prev: '<=', next: '>=' }
        orderByDirection = { prev: 'desc', next: 'asc' }
        break
      case SORT.LEAST_VIEWED:
        whereOpStr = { prev: '>=', next: '<=' }
        orderByDirection = { prev: 'asc', next: 'desc' }
        break
      default:
        console.log('Unsupported sort', sort)
    }
    if (currentMeme && !prevMeme && !nextMeme) {
      let collectionRef = firebase.firestore().collection(FIRESTORE_COLLECTION.MEMES)

      switch (sort) {
        case SORT.MOST_VIEWED:
          if (!prevIsLoading) {
            setPrevIsLoading(true)
            collectionRef
              .where('visibility', '==', VISIBILITY.PUBLIC)
              .where('views', whereOpStr.prev, currentMeme.views)
              .orderBy('views', orderByDirection.prev)
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
              .finally(() => {
                setPrevIsLoading(false)
                console.debug('FIRESTORE_COLLECTION.MEMES', 'READ', 'SingleView', 'prevMeme', sort)
              })
          }
          if (!nextIsLoading) {
            setNextIsLoading(true)
            collectionRef
              .where('visibility', '==', VISIBILITY.PUBLIC)
              .where('views', whereOpStr.next, currentMeme.views)
              .orderBy('views', orderByDirection.next)
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
              .finally(() => {
                setNextIsLoading(false)
                console.debug('FIRESTORE_COLLECTION.MEMES', 'READ', 'SingleView', 'nextMeme', sort)
              })
          }
          break
        case SORT.LEAST_VIEWED:
          if (!prevIsLoading) {
            setPrevIsLoading(true)
            collectionRef
              .where('visibility', '==', VISIBILITY.PUBLIC)
              .where('views', whereOpStr.prev, currentMeme.views)
              .orderBy('views', orderByDirection.prev)
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
              .finally(() => {
                setPrevIsLoading(false)
                console.debug('FIRESTORE_COLLECTION.MEMES', 'READ', 'SingleView', 'prevMeme', sort)
              })
          }
          if (!nextIsLoading) {
            setNextIsLoading(true)
            collectionRef
              .where('visibility', '==', VISIBILITY.PUBLIC)
              .where('views', whereOpStr.next, currentMeme.views)
              .orderBy('views', orderByDirection.next)
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
              .finally(() => {
                setNextIsLoading(false)
                console.debug('FIRESTORE_COLLECTION.MEMES', 'READ', 'SingleView', 'nextMeme', sort)
              })
          }
          break
        case SORT.LATEST:
          if (!prevIsLoading) {
            setPrevIsLoading(true)
            collectionRef
              .where('visibility', '==', VISIBILITY.PUBLIC)
              .where('createdAt', whereOpStr.prev, currentMeme.createdAt)
              .orderBy('createdAt', orderByDirection.prev)
              .limit(1)
              .get()
              .then((prev) => {
                prev.size > 0
                  ? setPrev({ id: prev.docs[0].id, ...prev.docs[0].data() })
                  : setPrev(null)
              })
              .catch((e) => console.error(e))
              .finally(() => {
                setPrevIsLoading(false)
                console.debug('FIRESTORE_COLLECTION.MEMES', 'READ', 'SingleView', 'prevMeme', sort)
              })
          }
          if (!nextIsLoading) {
            setNextIsLoading(true)
            collectionRef
              .where('visibility', '==', VISIBILITY.PUBLIC)
              .where('createdAt', whereOpStr.next, currentMeme.createdAt)
              .orderBy('createdAt', orderByDirection.next)
              .limit(1)
              .get()
              .then((next) => {
                next.size > 0
                  ? setNext({ id: next.docs[0].id, ...next.docs[0].data() })
                  : setNext(null)
              })
              .catch((e) => console.error(e))
              .finally(() => {
                setNextIsLoading(false)
                console.debug('FIRESTORE_COLLECTION.MEMES', 'READ', 'SingleView', 'nextMeme', sort)
              })
          }
          break
        case SORT.OLDEST:
          if (!prevIsLoading) {
            setPrevIsLoading(true)
            collectionRef
              .where('visibility', '==', VISIBILITY.PUBLIC)
              .where('createdAt', whereOpStr.prev, currentMeme.createdAt)
              .orderBy('createdAt', orderByDirection.prev)
              .limit(1)
              .get()
              .then((prev) => {
                prev.size > 0
                  ? setPrev({ id: prev.docs[0].id, ...prev.docs[0].data() })
                  : setPrev(null)
              })
              .catch((e) => console.error(e))
              .finally(() => {
                setPrevIsLoading(false)
                console.debug('FIRESTORE_COLLECTION.MEMES', 'READ', 'SingleView', 'prevMeme', sort)
              })
          }
          if (!nextIsLoading) {
            setNextIsLoading(true)
            collectionRef
              .where('visibility', '==', VISIBILITY.PUBLIC)
              .where('createdAt', whereOpStr.next, currentMeme.createdAt)
              .orderBy('createdAt', orderByDirection.next)
              .limit(1)
              .get()
              .then((next) => {
                next.size > 0
                  ? setNext({ id: next.docs[0].id, ...next.docs[0].data() })
                  : setNext(null)
              })
              .catch((e) => console.error(e))
              .finally(() => {
                setNextIsLoading(false)
                console.debug('FIRESTORE_COLLECTION.MEMES', 'READ', 'SingleView', 'nextMeme', sort)
              })
          }
          break
        default:
          console.log('Unsupported sort', sort)
      }
    }
    // TODO Evaluate the dependencies of this useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMeme, sort, setPrevIsLoading, setNextIsLoading])

  useEffect(() => {
    async function getData() {
      const db = firebase.firestore()
      return db.collection(FIRESTORE_COLLECTION.MEMES).doc(router.query.id).get()
    }
    if (!currentIsLoading) {
      setCurrentIsLoading(true)
      getData()
        .then((data) => {
          if (data.data()) {
            if (
              (data.data().visibility === VISIBILITY.PRIVATE &&
                auth.user &&
                data.data().createdBy !== auth.user.uid) ||
              (data.data().visibility === VISIBILITY.PRIVATE && !auth.user)
            ) {
              router.push('/403')
            } else {
              console.debug('FIRESTORE_COLLECTION.MEMES', 'READ')
              if (currentMeme && currentMeme.id !== data.id) {
                setNext(null)
                setPrev(null)
              }
              updateCurrent((_draft) => {
                return { id: data.id, ...data.data() }
              })
              viewCount.addView(data.id)
            }
          }
        })
        .catch((e) => console.error(e))
        .finally(() => {
          setCurrentIsLoading(false)
          console.debug('FIRESTORE_COLLECTION.MEMES', 'READ', 'SingleView', 'currentMeme')
        })
    }
    // TODO Evaluate the dependencies of this useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, sort, setCurrentIsLoading])
}
