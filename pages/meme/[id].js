import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from '@/lib/firebase'
import { Slideshow } from '@/components/Slideshow'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'

export default function User() {
  const router = useRouter()

  const [Memes, setMemes] = useState([])
  const [id, setId] = useState([])
  const [random, setRandom] = useState([])

  useEffect(() => {
    const getRandomInt = (min, max) => {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    async function getRandomMeme() {
      let memeId = await firebase.firestore().collection('memes-tmp').get()
      let newRandom = getRandomInt(0, memeId.size - 1)
      if (random === newRandom) {
        newRandom = getRandomInt(0, memeId.size - 1)
      }
      setRandom(newRandom)
      let doc = memeId.docs[newRandom]
      return doc.id
    }

    getRandomMeme().then((res) => setId(res))
  }, [router.query.id])

  useEffect(() => {
    // TODO subscribe to get updates
    async function getMemes() {
      let Meme = []
      const db = firebase.firestore()
      const memeRef = db.collection('memes-tmp')

      const doc = await memeRef.doc(router.query.id).get()

      const docprev = await memeRef
        .where('created_at', '<', doc.data().created_at)
        .orderBy('created_at', 'desc')
        .limit(1)
        .get()
      // if (!(docprev.docs.size > 0) && !docprev.docs[0].exists) {
      //   console.log({ docprev: docprev })
      // }
      const docnext = await memeRef.where('created_at', '>', doc.data().created_at).limit(1).get()
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

  if (!Memes || !(Memes.length > 0))
    return (
      <div className="flex flex-col">
        <Navbar />
        <div>Loading...</div>
      </div>
    )

  return (
    <div className="flex flex-col">
      <Navbar />
      <div> {router.query.id}</div>
      <div> {Memes[1].id}</div>
      <img alt="" className="w-10" src={Memes[1].template} />
      <Slideshow memes={Memes} />
      <Link href={`/meme/${id}`}>
        <a className="flex cursor-pointer items-center w-full h-8  text-gray-800 mr-16">
          <span className="font-semibold text-xl tracking-tight">Random Meme</span>
        </a>
      </Link>
      {/* <button onClick={handleClick} className="w-full h-8">
        Random
      </button> */}
    </div>
  )
}
