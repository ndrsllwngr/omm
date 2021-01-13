import React, { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import useFirestore from '@/lib/useFirestore'
import { useTemplate } from '@/components/context/templateContext'

export const ImageSelection = () => {
  const { docs } = useFirestore('templates')
  const [imageUrls, setImageUrls] = useState([])
  const [, setTemplate] = useTemplate()

  useEffect(() => {
    async function getImageUrls() {
      let urls = []
      const datadocs = docs
      //console.log(datadocs)
      for (let i = 0; i < datadocs.length; i++) {
        const url = datadocs[i].url
        console.log(url)
        urls.push(url)
        console.log(datadocs[i].url)
      }
      return urls
    }
    getImageUrls().then((res) => {
      console.log(res)
      setImageUrls(res)
    })
  }, [docs, setImageUrls])

  return (
    <div className="img-selection">
      {imageUrls &&
        imageUrls.map((imageUrl, i) => (
          <button key={i} onClick={() => setTemplate({ url: imageUrl })}>
            <img src={imageUrl} alt="uploaded image" width="150" height="150" />
          </button>
        ))}
    </div>
  )
}
