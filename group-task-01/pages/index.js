import React, { useState } from 'react'
import { Layout } from '@/components/Layout'
import { HtmlHead } from '@/components/HtmlHead'

const Meme = ({ src, alt, top, bottom }) => {
  return (
    <div className="relative">
      <img src={src} alt={alt}></img>
      <span>{top}</span>
      <span>{bottom}</span>
    </div>
  )
}

const LandingPage = () => {
  const [top, setTop] = useState('')
  const [bottom, setBottom] = useState('')
  return (
    <Layout>
      <HtmlHead />
      <Meme
        src="https://unsplash.com/photos/aI3EBLvcyu4/download?force=true&w=640"
        alt="four dogs on park"
        top={top}
        bottom={bottom}
      />
      <form>
        <label>Top</label>
        <input
          type="text"
          name="top"
          value={top}
          onChange={(event) => setTop(event.target.value)}
        ></input>
        <label>Bottom</label>
        <input
          type="text"
          name="bottom"
          value={bottom}
          onChange={(event) => setBottom(event.target.value)}
        ></input>
      </form>
    </Layout>
  )
}

export default LandingPage
