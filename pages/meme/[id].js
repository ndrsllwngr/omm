import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from '@/lib/firebase'
import { Slideshow } from '@/components/Slideshow'

export default function User() {
  const router = useRouter()

  const [Memes, setMemes] = useState([])

  useEffect(() => {
    //TODO subscribe adden
    async function getMemes() {
      let Meme = []
      const db = firebase.firestore()
      const memeRef = db.collection('memes')

      const doc = await memeRef.doc(router.query.id).get()
      const templateData = (await doc.data().template.get()).data()
      const imgPath = await firebase.storage().ref(templateData.img).getDownloadURL()

      const docprev = await memeRef
        .where('created_at', '<', doc.data().created_at)
        .orderBy('created_at', 'desc')
        .limit(1)
        .get()
      const docnext = await memeRef.where('created_at', '>', doc.data().created_at).limit(1).get()

      Meme.push({ id: docprev.docs[0].id })
      Meme.push({ id: doc.id, ...doc.data(), imgPath })
      Meme.push({ id: docnext.docs[0].id })

      return Meme
    }

    getMemes()
      .then((res) => {
        //console.log({ res })
        setMemes(res)
      })
      .catch(function (error) {
        console.log({ error })
      })
  }, [setMemes, router.query.id])

  if (!Memes || !(Memes.length > 0)) return <div>Loading...</div>

  return (
    <div className="flex flex-col">
      <div> {router.query.id}</div>
      <div> {Memes[1].id}</div>
      <img className="w-10" src={Memes[1].imgPath} />
      <button
        className="w-20 h-20 absolute"
        name="prev"
        onClick={(e) => {
          e.preventDefault()
          router.push(Memes[Memes.length - 1].id)
        }}
      ></button>
      <Slideshow memes={Memes}></Slideshow>
    </div>
  )
}
