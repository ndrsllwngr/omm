import React, { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import useFirestore from '@/components/hooks/useFirestore'
import { useTemplate } from '@/components/context/fabricContext'
import { FIRESTORE_COLLECTION } from '@/lib/constants'

export const TemplateCollection = () => {
  const { docs } = useFirestore(FIRESTORE_COLLECTION.TEMPLATES)
  const [imageUrls, setImageUrls] = useState([])
  const { updateTemplate } = useTemplate()

  useEffect(() => {
    async function getImageUrls() {
      let urls = []
      const datadocs = docs
      console.log(datadocs)
      for (let i = 0; i < datadocs.length; i++) {
        console.log({ src: 'template datadocs', doc: datadocs[i] })
        if (datadocs[i].url) {
          urls.push({ id: datadocs[i].id, url: datadocs[i].url })
        } else {
          const url = await firebase.storage().ref(datadocs[i].img).getDownloadURL()
          urls.push({ id: datadocs[i].id, url })
        }
      }
      return urls
    }
    getImageUrls()
      .then((res) => {
        console.log(res)
        setImageUrls(res)
      })
      .catch((e) => console.log({ src: 'getImageUrls', e }))
  }, [docs, setImageUrls])
  useEffect(() => {
    console.log({ src: 'useState', imageUrls })
  }, [imageUrls])
  return (
    <div className="img-selection">
      {imageUrls &&
        imageUrls.map((imageUrl, i) => (
          <button key={i} onClick={() => updateTemplate(imageUrl)}>
            <img src={imageUrl.url} alt="uploaded image" width="150" height="150" />
          </button>
        ))}
    </div>
  )
}