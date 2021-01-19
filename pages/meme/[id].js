import React from 'react'
import { useRouter } from 'next/router'
import { Slideshow } from '@/components/Slideshow'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import { useRandomMeme } from '@/components/hooks/useRandomMeme'
import { OverviewSort } from '@/components/OverviewSort'
import { HtmlHead } from '@/components/HtmlHead'
import { useSingleMeme } from '@/components/hooks/useSingleMeme'
import { useAutoplay } from '@/components/hooks/useAutoplay'
import { useSingleMemeContext } from '@/components/context/singlememeContext'

export default function SingleView() {
  const router = useRouter()
  const { id } = useRandomMeme(router)
  const {
    currentMeme,
    nextMeme,
    prevMeme,
    updateCurrent,
    setNext,
    setPrev,
  } = useSingleMemeContext()
  useSingleMeme()
  const { state, dispatch } = useAutoplay(currentMeme, nextMeme)
  // const startAutoplay = () => {
  //   timeOut.current = setTimeout(function () {
  //     //Prevent Autoplay at EOF
  //     if (nextMeme.id) router.push(`/meme/${nextMeme.id}`)
  //     else {
  //       endAutoplay
  //       dispatch({ type: 'falseBool' })
  //     }
  //   }, 3000)
  // }
  // const endAutoplay = () => {
  //   clearTimeout(timeOut.current)
  //   //console.log({ ENDTIMER: timeOut.current })
  // }
  // //Errorhandling leave page while autoplay enabled
  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     if (url !== '/meme/[id]') {
  //       endAutoplay()
  //     }
  //   }
  //   router.events.on('routeChangeStart', handleRouteChange)
  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange)
  //   }
  // }, [router.events])
  // //Toogle Autoplay
  // useEffect(() => {
  //   state.bool ? startAutoplay() : endAutoplay()
  //   // TODO Evaluate if moving these two functions into the useEffect might be feasible.
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentMeme, state.bool])

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
        <OverviewSort
          callback={() => {
            setPrev(null)
            setNext(null)
          }}
        />
        <Slideshow
          prevMeme={prevMeme}
          meme={currentMeme}
          nextMeme={nextMeme}
          updateMeme={updateCurrent}
        />
        <div className="flex flex-col items-center font-semibold text-xl my-2 text-white">
          <Link href={`/meme/${id}`}>
            <a onClick={() => dispatch({ type: 'falseBool' })}>
              <span className="my-2 p-2 rounded bg-green-600">Random Meme</span>
            </a>
          </Link>
          {nextMeme && !(nextMeme.id === '') && (
            <button
              className="my-2 p-2 rounded bg-green-600"
              onClick={() => dispatch({ type: 'toggleBool' })}
            >
              {state.bool ? `Autoplay On` : `Autoplay Off`}
            </button>
          )}
        </div>
      </div>
    </>
  )
}
