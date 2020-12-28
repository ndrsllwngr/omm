import React, { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import useFirestore from '@/lib/useFirestore'

export const ImageSelection = () => {
  const { docs } = useFirestore('templates')
  //const [url, setUrl] = useState(null)
  const [imageUrls, setImageUrls] = useState([])

  const getImageUrls = (datadocs) => {
    datadocs.map((datadoc) =>
      firebase
        .storage()
        .ref(datadoc.img)
        .getDownloadURL()
        .then((url) => {
          setImageUrls([...imageUrls, url])
          console.log('imageUrlArray:', imageUrls)
          console.log('data:', datadocs)
        })
        .catch((error) => {
          switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              break

            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break

            case 'storage/canceled':
              // User canceled the upload
              break

            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break
          }
        })
    )
  }

  useEffect(() => {
    getImageUrls(docs)
  })

  return (
    <div className="img-selection">
      {imageUrls &&
        imageUrls.map((imageUrl, i) => (
          <div key={i}>
            <img src={imageUrl} alt="uploaded image"></img>
          </div>
        ))}
    </div>
  )
}
