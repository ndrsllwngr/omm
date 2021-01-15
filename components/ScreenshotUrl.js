import React, { useState } from 'react'
import useStorage from '@/components/hooks/useStorage'

// import firebase from '@/lib/firebase'

// const memeFirestore = firebase.firestore()

export const ScreenshotUrl = () => {
  const [search, setSearch] = useState('')
  const URL = `https://api.apiflash.com/v1/urltoimage?access_key=${process.env.NEXT_PUBLIC_APIFLASH_SCREENSHOT_API_KEY}&url=${search}&response_type=json&fresh=true&width=1920&height=1080`
  const { setExternalUrl } = useStorage()

  const getScreenshot = () =>
    fetch(URL, {
      method: 'GET',
    })
      .then((res) => {
        //console.log('res: ', res.json())
        return res.json()
      })
      .then((json) => setExternalUrl(json.url))
      .catch((e) => console.error('error:', e))

  const handleSubmit = (e) => {
    e.preventDefault()
    const test = getScreenshot()
    console.log(test)
    /*{ async () => {
        console.log('entering async')
        await memeFirestore.collection(FIRESTORE_COLLECTION.TEMPLATES.add({
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
