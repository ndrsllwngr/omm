import React from 'react'
import { useRouter } from 'next/router'
import { Slideshow } from '@/components/Slideshow'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import { useRandomMeme } from '@/components/hooks/useRandomMeme'
import { OverviewSort } from '@/components/OverviewSort'
import { HtmlHead } from '@/components/HtmlHead'
import { useSingleMeme } from '@/components/hooks/useSingleMeme'
import { useSingleMemeContext } from '@/components/context/singlememeContext'
import { useAutoPlayContext, useAutoPlayFilter } from '@/components/context/autoplayContext'
import { AutoplaySort } from '@/components/AutoplaySort'

export default function SingleView() {
  const router = useRouter()
  const { id } = useRandomMeme(router)
  const { currentMeme, nextMeme } = useSingleMemeContext()
  useSingleMeme()
  const [state, dispatch] = useAutoPlayContext()
  const { filter } = useAutoPlayFilter()

  if (!currentMeme)
    return (
      <>
        <HtmlHead title={'Meme · Loading... '} />
        <Navbar />
        <div>Loading...</div>
      </>
    )
  //https://stackoverflow.com/questions/53857063/changing-state-on-route-change-next-js
  return (
    <>
      <HtmlHead
        title={`Meme · ${currentMeme && currentMeme.title ? currentMeme.title : 'Untitled'}`}
      />
      <Navbar />
      <div className={'max-w-7xl mx-auto mt-4'}>
        <OverviewSort />
        <Slideshow />
        <div className="flex flex-col items-center font-semibold text-xl my-2 text-white">
          <Link href={`/meme/${id}`}>
            <a onClick={() => dispatch({ type: 'falseBool' })}>
              <span className="my-2 p-2 rounded bg-green-600">Random Meme</span>
            </a>
          </Link>

          {filter === 'Random' ? (
            <div className="flex flex-row">
              <button
                className="my-2 p-2 rounded bg-green-600"
                onClick={() => dispatch({ type: 'toggleBool' })}
              >
                {state.bool ? `On` : `Off`}
              </button>
              <AutoplaySort />
            </div>
          ) : (
            nextMeme &&
            !(nextMeme.id === '') && (
              <div className="flex flex-row">
                <button
                  className="my-2 p-2 rounded bg-green-600"
                  onClick={() => dispatch({ type: 'toggleBool' })}
                >
                  {state.bool ? `On` : `Off`}
                </button>
                <AutoplaySort />
              </div>
            )
          )}
        </div>
      </div>
    </>
  )
}
