import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import Proptypes from 'prop-types'
import { useRouter } from 'next/router'
import { AUTOPLAY_ORDER } from '@/lib/constants'

// Autoplay timeout
const TIMEOUT_IN_MS = 3000
// Create autoplay context
export const AutoplayContext = createContext({})

/*
Context to handle autoplay
https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */
export const AutoplayProvider = ({ children }) => {
  // Init play state
  const [isPlaying, setIsPlaying] = useState(false)
  // Init order state
  const [order, setOrder] = useState(AUTOPLAY_ORDER.ORDERED)
  // Get router
  const router = useRouter()
  // Init reference for timeout function
  const timeOut = useRef(null)
  // Init reference to next id
  const queuedNextId = useRef(null)
  // Function to clear setTimeout
  const clearTimer = useCallback(() => {
    clearTimeout(timeOut.current)
    queuedNextId.current = null
  }, [timeOut])

  // Function to trigger next slide including setTimeout
  const triggerNextSlide = useCallback(
    (nextId) => {
      if (!queuedNextId.current) {
        console.log('triggerNextSlide', nextId)
        queuedNextId.current = nextId
        timeOut.current = setTimeout(function () {
          router
            .push(`/meme/${nextId}`)
            .then((r) => console.log('AUTOPLAY - NAVIGATE TO NEXT MEME', r))
            .finally(() => (queuedNextId.current = null))
        }, TIMEOUT_IN_MS)
      }
    },
    [timeOut, router, queuedNextId]
  )

  // Function to disable autoplay
  const disableAutoplay = useCallback(() => {
    setIsPlaying(false)
    clearTimer()
  }, [setIsPlaying, clearTimer])
  // Function to start and pause autoplay
  const toggleAutoplay = useCallback(() => {
    if (isPlaying) {
      disableAutoplay()
    } else {
      setIsPlaying(true)
    }
  }, [setIsPlaying, isPlaying, disableAutoplay])
  // Function to change the autoplay order
  const toggleAutoplayOrder = useCallback(() => {
    order === AUTOPLAY_ORDER.RANDOM
      ? setOrder(AUTOPLAY_ORDER.ORDERED)
      : setOrder(AUTOPLAY_ORDER.RANDOM)
    clearTimer()
  }, [order, setOrder, clearTimer])

  // function to check if next page is not a meme
  useEffect(() => {
    if (router.pathname !== '/meme/[id]') {
      if (isPlaying) {
        console.log('ROUTE CHANGED - DISABLE AUTOPLAY!')
        disableAutoplay()
      }
    }
  }, [router, isPlaying, disableAutoplay])

  return (
    <AutoplayContext.Provider
      value={{
        order,
        setOrder,
        isPlaying,
        toggleAutoplay,
        disableAutoplay,
        clearTimer,
        triggerNextSlide,
        toggleAutoplayOrder,
      }}
    >
      {children}
    </AutoplayContext.Provider>
  )
}
// Export autoplay context
export const useAutoplay = () => {
  const context = useContext(AutoplayContext)
  if (!context) {
    throw new Error(`useAutoplay must be used within a AutoplayContext`)
  }
  return context
}

AutoplayProvider.propTypes = {
  children: Proptypes.element,
}
