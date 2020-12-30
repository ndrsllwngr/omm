import useStorage from '@/lib/useStorage'
import { data } from 'autoprefixer'
import React, { useEffect, useState } from 'react'

export const ScreenshotUrl = () => {
  const [screenshotUrl, setScreenshotUrl] = useState('')
  const [temp, setTemp] = useState('')
  const { setFile } = useStorage()

  const token = 'ALOLR1M2JDLOZAZL6DEKHSYM4MT15VVK'
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
