import React, { useState, useRef } from 'react'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { Layout } from '@/components/Layout'
import { HtmlHead } from '@/components/HtmlHead'
import { Meme } from '@/components/Meme'

const LandingPage = () => {
  const [top, setTop] = useState('This is fine.')
  const [bottom, setBottom] = useState(':)')
  const [image, setImage] = useState('/assets/matt-nelson-aI3EBLvcyu4-unsplash.jpg')
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
      <div className="flex flex-col md:flex-row">
        <Meme myRef={memeEl} src={image} alt="Meme image" top={top} bottom={bottom} />
        <div className="flex flex-col flex-grow mx-4 mt-4 md:mt-0 justify-center">
          <form className="flex flex-col">
            <label className="block">
              <span className="text-gray-700">Top Caption</span>
              <input
                className="form-input mt-1 block w-full"
                placeholder=""
                type="text"
                name="top-caption"
                value={top}
                onChange={(event) => setTop(event.target.value)}
              ></input>
            </label>
            <label className="block mt-4">
              <span className="text-gray-700">Bottom Caption</span>
              <input
                className="form-input mt-1 block w-full"
                placeholder=""
                type="text"
                name="bottom-caption"
                value={bottom}
                onChange={(event) => setBottom(event.target.value)}
              ></input>
            </label>
            <label className="block mt-4">
              <span className="text-gray-700">Image URL</span>
              <input
                className="form-input mt-1 block w-full"
                placeholder=""
                type="text"
                name="image-url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              ></input>
            </label>
          </form>
          <button
            className="mt-4 p-2 rounded-md font-sans font-semibold bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
            onClick={createDownload}
          >
            Download
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default LandingPage
