import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import firebase from '@/lib/firebase'
import { Slideshow } from '@/components/Slideshow'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { useAutoPlay } from '@/components/context/autoplayContext'
import { useFilterContext } from '@/components/context/viewsContext'
import { useRandomMeme } from '@/components/hooks/useRandomMeme'
import { OverviewSort } from '@/components/OverviewSort'
import { HtmlHead } from '@/components/HtmlHead'
import { useViewCount } from '@/components/hooks/useViewCount'
import { useImmer } from 'use-immer'

export default function SingleView() {
  const router = useRouter()
  const { id } = useRandomMeme(router)
  const [state, dispatch] = useAutoPlay()
  const timeOut = useRef(null)
  const { filter } = useFilterContext()

  const [currentMeme, updateCurrent] = useImmer(null)
  const [prevMeme, setPrev] = useState(null)
  const [nextMeme, setNext] = useState(null)
  const viewCount = useViewCount(updateCurrent)

  // TODO pass order by
  // TODO look up "unterabfragen" when sorting can not differential wihci element is newer with same views

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
            .limit()
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
            .limit()
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
            .limit()
            .get()
            .then((prev) => {
              if (prev.docs.length > 0) {
                console.log('BEFORELOOP')
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
            .limit()
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
              console.log({ PREV: prev.docs[0].id })
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
          // viewCount.addView(data.id)
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

  const startAutoplay = () => {
    timeOut.current = setTimeout(function () {
      //console.log(Memes)
      //console.log({ STARTTIMER: timeOut.current })
      //Prevent Autoplay at EOF
      if (nextMeme.id) router.push(`/meme/${nextMeme.id}`)
      else {
        endAutoplay
        dispatch({ type: 'falseBool' })
      }
    }, 3000)
  }
  const endAutoplay = () => {
    clearTimeout(timeOut.current)
    //console.log({ ENDTIMER: timeOut.current })
  }
  //Errorhandling leave page while autoplay enabled
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url !== '/meme/[id]') {
        endAutoplay()
      }
    }
    router.events.on('routeChangeStart', handleRouteChange)
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events])
  //Toogle Autoplay
  useEffect(() => {
    state.bool ? startAutoplay() : endAutoplay()
    // TODO Evaluate if moving these two functions into the useEffect might be feasible.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMeme, state.bool])

  if (!currentMeme)
    return (
      <>
        <HtmlHead title={'Meme · Loading... '} />
        <Navbar />
        <div>Loading...</div>
      </>
    )
  //https://stackoverflow.com/questions/53857063/changing-state-on-route-change-next-js
  return (
    <>
      <HtmlHead
        title={`Meme · ${currentMeme && currentMeme.title ? currentMeme.title : 'Untitled'}`}
      />
      <Navbar />
      <div className={'max-w-7xl mx-auto mt-4'}>
        <OverviewSort
          callback={() => {
            setPrev(null)
            setNext(null)
          }}
        />
        <Slideshow
          prevMeme={prevMeme}
          meme={currentMeme}
          nextMeme={nextMeme}
          updateMeme={updateCurrent}
        />
        <div className="flex flex-col items-center font-semibold text-xl my-2 text-white">
          <Link href={`/meme/${id}`}>
            <a onClick={() => dispatch({ type: 'falseBool' })}>
              <span className="my-2 p-2 rounded bg-green-600">Random Meme</span>
            </a>
          </Link>
          {nextMeme && !(nextMeme.id === '') && (
            <button
              className="my-2 p-2 rounded bg-green-600"
              onClick={() => dispatch({ type: 'toggleBool' })}
            >
              {state.bool ? `Autoplay On` : `Autoplay Off`}
            </button>
          )}
        </div>
      </div>
    </>
  )
}
