import React, { useState } from 'react'

export const PasteUrlImage = () => {
  const [userImageUrl, setUserImageUrl] = useState('')
  const [temp, setTemp] = useState('')

  const handleSubmit = (evt) => {
    setUserImageUrl(temp)
    evt.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          URL
          <input type="text" name="imageUrl" onChange={(e) => setTemp(e.target.value)}></input>
        </label>
        <input type="submit" value="Get"></input>
      </form>
      <div>
        <img src={userImageUrl}></img>
      </div>
    </div>
  )
}
