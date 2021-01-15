import useStorage from '@/components/hooks/useStorage'
import React, { useState } from 'react'

export const PasteUrlImage = () => {
  const [userImageUrl, setUserImageUrl] = useState('')
  const [temp, setTemp] = useState('')
  const { setExternalUrl } = useStorage()

  const handleSubmit = (evt) => {
    setUserImageUrl(temp)
    setExternalUrl(temp)
    evt.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          URL
          <input type="text" name="imageUrl" onChange={(e) => setTemp(e.target.value)} />
        </label>
        <input type="submit" value="Get image" />
      </form>
      <div>
        <img src={userImageUrl} alt="" />
      </div>
    </div>
  )
}

/*
const fetchImage = (imageUrl) => {
    fetch(imageUrl)
      .then((res) => {
        return res.blob()
      })
      .then((blob) => {
        console.log(blob)
      })
  }

  .then((blob) => {
        setFile(blob)
        console.log('blob:', blob)
      })

*/
