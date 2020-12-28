import React, { useEffect } from 'react'
import { useDatabaseMemes } from '@/components/hooks/useDatabaseMemes'

export const Overview = () => {
  const memes = useDatabaseMemes()
  useEffect(() => {
    console.log({ memes })
  }, [memes])
  if (!memes || !(memes.length > 0)) return <div>loading...</div>
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 items-center mx-auto justify-content-center">
      {memes.map((el, index) => (
        <button
          key={index}
          className={`relative w-24 h-24 bg-white overflow-hidden place-self-center justify-self-center`}
        >
          <img src={el.url} width={el.width} height={el.height} alt={el.name} />
        </button>
      ))}
    </div>
  )
}
