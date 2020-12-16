import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useFirestore from '@/lib/useFirestore'
import firebase from '@/lib/firebase'

const ImageComponent = ({ pathToImage }) => {
  const [fullUrl, setFullUrl] = useState(null)
  useEffect(() => {
    const path = pathToImage.split('/')
    // Create a reference to the file we want to download
    var storageRef = firebase.storage()
    var imageRef = storageRef.ref(path[0]).child(path[1])

    // Get the download URL
    imageRef
      .getDownloadURL()
      .then(function (url) {
        setFullUrl(url)
      })
      .catch(function (error) {
        // A full list of error codes is available at https://firebase.google.com/docs/storage/web/handle-errors
        console.log({ error })
      })
    return () => {
      console.log('cleanUp')
    }
  }, [pathToImage])
  if (!fullUrl) return <div>loading...</div>
  return <img src={fullUrl} alt="uploaded image" className="w-48 h-48"></img>
}

ImageComponent.propTypes = {
  pathToImage: PropTypes.string,
}

export const ImageSelection = () => {
  const { docs } = useFirestore('templates')
  useEffect(() => {
    console.log({ docs })
  }, [docs])
  return (
    <div className="flex w-full h-full">
      {docs &&
        docs.map((doc, i) => (
          <div key={i}>
            <ImageComponent pathToImage={doc.img} />
          </div>
        ))}
    </div>
  )
}
