import React, { useState } from 'react'
// import firebase from '@/lib/firebase'

// const memeFirestore = firebase.firestore()

export const ScreenshotUrl = () => {
  const API_KEY = process.env.NEXT_PUBLIC_APIFLASH_SCREENSHOT_API_KEY
  const [search, setSearch] = useState('')
  const URL = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${search}&response_type=json&fresh=true&width=1920&height=1080`
  console.log('key:', API_KEY)

  const getScreenshot = fetch(URL, {
    method: 'GET',
  })
    .then((url) => {
      return url
    })
    .catch((e) => console.error(e))

  const handleSubmit = (e) => {
    e.preventDefault()
    let test = getScreenshot
    console.log(test)
    /*{ async () => {
        console.log('entering async')
        await memeFirestore.collection('templates').add({
          createdAt: firebase.firestore.Timestamp.now(),
          url: test,
        })
      }}}*/
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          URL
          <input type="text" name="screenShotUrl" onChange={(e) => setSearch(e.target.value)} />
        </label>
        <input type="submit" value="Get Screenshot" />
      </form>
    </div>
  )
}
