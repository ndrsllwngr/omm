import React, { useState, useEffect } from 'react'
import { getImgFlipMemes } from '@/lib/external-meme-api'
import { useTemplate } from '@/components/context/fabricContext'

export const ImgFlipCollection = () => {
  const [memeArray, setMemeArray] = useState([])
  const { updateTemplate } = useTemplate()

  useEffect(() => {
    getImgFlipMemes().then((memes) => setMemeArray(memes))
  }, [setMemeArray])

  return (
    <div className="img-selection">
      {memeArray &&
        memeArray.map((meme, i) => (
          <button key={i} onClick={() => updateTemplate({ url: meme.url })}>
            <img src={meme.url} alt="uploaded image" width="150" height="150" />
          </button>
        ))}
    </div>
  )
}

/*<div>
        {getImgFlipMemes().then((memes) =>
          memes.map((meme, i) => {
            <button key={i} onClick={() => setTemplate({ url: meme.url })}>
              <img src={meme.url} alt="uploaded image" width="150" height="150" />
            </button>
          })
        )}
      </div>*/