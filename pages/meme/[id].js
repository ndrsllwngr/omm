import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from '@/lib/firebase'

export default function User() {
  const router = useRouter()

  const [Meme, setMeme] = useState([])

  useEffect(() => {
    //TODO subscribe adden
    async function getMeme() {
      let Meme = []
      const doc = await firebase.firestore().collection('memes').doc(router.query.id).get()
      const templateData = (await doc.data().template.get()).data()
      //console.log(templateData)
      const imgPath = await firebase.storage().ref(templateData.img).getDownloadURL()

      Meme.push({ id: doc.id, ...doc.data(), imgPath })
      //console.log(Meme)
      return Meme
    }

    getMeme()
      .then((res) => {
        console.log({ res })
        setMeme(res)
      })
      .catch(function (error) {
        console.log({ error })
      })
  }, [setMeme, router.query.id])

  if (!Meme || !(Meme.length > 0)) return <div>Loading...</div>

  return (
    <div>
      <div> {router.query.id}</div>
      <div> {Meme[0].id}</div>
      <img src={Meme[0].imgPath} />
    </div>
  )
}
