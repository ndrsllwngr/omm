import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import firebase from '@/lib/firebase'
import { Slideshow } from '@/components/Slideshow'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { useAutoPlay } from '@/components/context/autoplayContext'
import { useRandomMeme } from '@/components/hooks/useRandomMeme'
import { OverviewSort } from '@/components/OverviewSort'
import { HtmlHead } from '@/components/HtmlHead'

export default function SingleView() {
  const router = useRouter()
  const { id } = useRandomMeme(router)
  const [state, dispatch] = useAutoPlay()
  const timeOut = useRef(null)

  const [currentMeme, setCurrent] = useState(null)
  const [prevMeme, setPrev] = useState(null)
  const [nextMeme, setNext] = useState(null)

  // TODO pass order by
  // TODO look up "unterabfragen" when sorting can not differential wihci element is newer with same views

  useEffect(() => {
    const db = firebase.firestore()
    let unsubscribe = db
      .collection(FIRESTORE_COLLECTION.MEMES)
      .doc(router.query.id)
      .onSnapshot(
        function (doc) {
          let time = doc.data().createdAt
          setCurrent({ id: doc.id, ...doc.data() })

          db.collection(FIRESTORE_COLLECTION.MEMES)
            .where('createdAt', '<', time)
            .orderBy('createdAt', 'desc')
            .limit(1)
            .onSnapshot(function (prev) {
              prev.size > 0
                ? setPrev({ id: prev.docs[0].id, ...prev.docs[0].data() })
                : setPrev(null)
            })
          db.collection(FIRESTORE_COLLECTION.MEMES)
            .where('createdAt', '>', time)
            .limit(1)
            .onSnapshot(function (next) {
              next.size > 0
                ? setNext({ id: next.docs[0].id, ...next.docs[0].data() })
                : setNext(null)
            })
        },
        function (error) {
          console.log('SINGLEMEME SNAPSHOT FAILED')
          console.log(error)
        }
      )
    return () => unsubscribe()
  }, [router.query.id])

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
      <HtmlHead title={`Meme · ${currentMeme && currentMeme.title}`} />
      <Navbar />
      <OverviewSort />
      <Slideshow prevMeme={prevMeme} meme={currentMeme} nextMeme={nextMeme} />
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
    </>
  )
}
