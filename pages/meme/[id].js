import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import firebase from '@/lib/firebase'
import { Slideshow } from '@/components/Slideshow'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { useAutoPlayState, useAutoPlayDispatch } from '@/components/context/autoplayContext'
import { useRandomMeme } from '@/components/hooks/useRandomMeme'

export default function User() {
  const router = useRouter()
  function useAutoPlay() {
    return [useAutoPlayState(), useAutoPlayDispatch()]
  }
  const { id } = useRandomMeme(router)
  const [Memes, setMemes] = useState([])
  //const [id, setId] = useState([])
  const [state, dispatch] = useAutoPlay()
  const timeOut = useRef(null)

  //let timeOut = undefined
  // const getRandomInt = (min, max) => {
  //   min = Math.ceil(min)
  //   max = Math.floor(max)
  //   return Math.floor(Math.random() * (max - min + 1)) + min
  // }

  // useEffect(() => {
  //   async function getRandomMeme() {
  //     let memeCollection = await firebase.firestore().collection(FIRESTORE_COLLECTION.MEMES).get()
  //     const ids = []
  //     memeCollection.forEach((meme) => ids.push(meme.id))

  //     let random = getRandomInt(0, ids.length - 1)

  //     while (ids[random] === router.query.id) {
  //       random = getRandomInt(0, ids.length - 1)
  //     }
  //     setId(ids[random])
  //   }
  //   getRandomMeme()
  // }, [router.query.id])

  useEffect(() => {
    // TODO subscribe to get updates
    // TODO pass order by
    async function getMemes() {
      let Meme = []
      const db = firebase.firestore()
      const memeRef = db.collection(FIRESTORE_COLLECTION.MEMES)

      const doc = await memeRef.doc(router.query.id).get()

      const docprev = await memeRef
        .where('createdAt', '<', doc.data().createdAt)
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get()
      // if (!(docprev.docs.size > 0) && !docprev.docs[0].exists) {
      //   console.log({ docprev: docprev })
      // }
      const docnext = await memeRef.where('createdAt', '>', doc.data().createdAt).limit(1).get()
      // console.log({ docnext: docnext })
      Meme.push({
        id: !(docprev.docs.length > 0) ? '' : docprev.docs[0].id,
      })
      Meme.push({ id: doc.id, ...doc.data() })
      Meme.push({
        id: !(docnext.docs.length > 0) ? '' : docnext.docs[0].id,
      })

      return Meme
    }

    getMemes()
      .then((res) => {
        setMemes(res)
      })
      .catch(function (error) {
        console.log({ error })
      })
  }, [setMemes, router.query.id])

  const startAutoplay = () => {
    timeOut.current = setTimeout(function () {
      //console.log(Memes)
      //console.log({ STARTTIMER: timeOut.current })
      //Prevent Autoplay at EOF
      if (Memes[2].id) router.push(`/meme/${Memes[2].id}`)
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
  useEffect(() => {
    state.bool ? startAutoplay() : endAutoplay()
  }, [Memes, state.bool])

  if (!Memes || !(Memes.length > 0))
    return (
      <div className="flex flex-col">
        <Navbar />
        <div>Loading...</div>
      </div>
    )
  //https://stackoverflow.com/questions/53857063/changing-state-on-route-change-next-js
  return (
    <div className="flex flex-col">
      <Navbar />
      <Slideshow memes={Memes} />
      <div className="flex flex-col items-center font-semibold text-xl my-2 text-white">
        <Link href={`/meme/${id}`}>
          <a onClick={() => dispatch({ type: 'falseBool' })}>
            <span className="my-2 p-2 rounded bg-green-600">Random Meme</span>
          </a>
        </Link>

        {!(Memes[2].id === '') && (
          <button
            className="my-2 p-2 rounded bg-green-600"
            onClick={() => dispatch({ type: 'toggleBool' })}
          >
            {state.bool ? `Autoplay On` : `Autoplay Off`}
          </button>
        )}
      </div>
    </div>
  )
}
