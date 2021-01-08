import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from '@/lib/firebase'
import { Slideshow } from '@/components/Slideshow'
import { Navbar } from '@/components/Navbar'

export default function User() {
  const router = useRouter()

  const [Memes, setMemes] = useState([])

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
    </div>
  )
}
