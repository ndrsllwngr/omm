import React, { useState, useRef } from 'react'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { Layout } from '@/components/Layout'
import { HtmlHead } from '@/components/HtmlHead'

const Meme = ({ myRef, src, alt, top, bottom }) => {
  return (
    <div ref={myRef} className="relative">
      <img src={src} alt={alt} width={640} height={427}></img>
      <span>{top}</span>
      <span>{bottom}</span>
    </div>
  )
}

const LandingPage = () => {
  const [top, setTop] = useState('')
  const [bottom, setBottom] = useState('')
  const memeEl = useRef(null)

  const createDownload = () => {
    console.log({ memeEl })
    if (memeEl !== null && memeEl !== undefined) {
      domtoimage.toBlob(memeEl.current).then(function (blob) {
        saveAs(blob, 'my-node.png')
      })
    }
  }
  return (
    <Layout>
      <HtmlHead />
      <Meme
        myRef={memeEl}
        src="/assets/matt-nelson-aI3EBLvcyu4-unsplash.jpg"
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
      <button onClick={createDownload}>Export As PNG</button>
    </Layout>
  )
}

export default LandingPage
