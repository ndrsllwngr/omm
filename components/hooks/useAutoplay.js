import { useEffect, useRef } from 'react'
import { useAutoPlayContext } from '@/components/context/autoplayContext'
import { useRouter } from 'next/router'
import { useSingleMemeContext } from '@/components/context/singlememeContext'

export const useAutoplay = () => {
  const [state, dispatch] = useAutoPlayContext()
  const timeOut = useRef(null)
  const router = useRouter()
  const { currentMeme, nextMeme } = useSingleMemeContext()

  useEffect(() => {
    console.log({ useAutoplayNextMeme: nextMeme, useAutoplayCurrentMeme: currentMeme })
  }, [nextMeme, currentMeme])

  const startAutoplay = () => {
    if (nextMeme) {
      console.log('triggered startAutoplay', nextMeme)
      timeOut.current = setTimeout(function () {
        if (nextMeme.id) {
          router.push(`/meme/${nextMeme.id}`)
          console.log({ NEXTMEME: nextMeme.id })
        } else {
          console.log('END')
          endAutoplay
          dispatch({ type: 'falseBool' })
        }
      }, 3000)
    }

    // console.log({ ID: nextMeme.id })
    // if (nextMeme.id) {
    //   timeOut.current = setTimeout(function () {
    //     router.push(`/meme/${nextMeme.id}`)
    //   }, 3000)
    // } else {
    // }
    // console.log({ ELSEID: nextMeme.id })
    // endAutoplay
    // dispatch({ type: 'falseBool' })
  }

  const endAutoplay = () => {
    clearTimeout(timeOut.current)
    //console.log({ ENDTIMER: timeOut.current })
  }
  //Errorhandling leave page while autoplay enabled
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url !== '/meme/[id]') {
        endAutoplay()
      }
    }
    router.events.on('routeChangeStart', handleRouteChange)
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events])
  //Toogle Autoplay
  useEffect(() => {
    state.bool ? startAutoplay() : endAutoplay()
    // TODO Evaluate if moving these two functions into the useEffect might be feasible.
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMeme, nextMeme, state.bool])
  return { state, dispatch }
}
