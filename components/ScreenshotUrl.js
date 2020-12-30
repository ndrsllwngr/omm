import React, { useState } from 'react'
// import useStorage from '@/lib/useStorage'

export const ScreenshotUrl = () => {
  const [screenshotUrl] = useState('')
  const [temp, setTemp] = useState('')
  // const { setFile } = useStorage()

  const token = process.env.NEXT_PUBLIC_SCREENSHOT_API_KEY
  const output = 'image'
  const width = 1920
  const height = 1080

  const handleSubmit = (evt) => {
    console.log('enter')
    fetch(
      `https://screenshotapi.net/api/v1/screenshot?token=${token}&url=${temp}&width=${width}&height=${height}&output=${output}`,
      { method: 'GET' }
    )
      .then((res) => res.binary())
      .then((data) => console.log(data))
    evt.preventDefaul()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          URL
          <input type="text" name="screenShotUrl" onChange={(e) => setTemp(e.target.value)}></input>
        </label>
        <input type="submit" value="Get Screenshot"></input>
      </form>
      <div>
        <img src={screenshotUrl}></img>
      </div>
    </div>
  )
}
