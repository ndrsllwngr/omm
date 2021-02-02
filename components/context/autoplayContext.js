import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import Proptypes from 'prop-types'
import { useRouter } from 'next/router'
import { AUTOPLAY_ORDER } from '@/lib/constants'

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

const TIMEOUT_IN_MS = 3000
export const AutoplayContext = createContext({})

export const AutoplayProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [order, setOrder] = useState(AUTOPLAY_ORDER.ORDERED)
  const router = useRouter()
  const timeOut = useRef(null)
  const queuedNextId = useRef(null)

  const clearTimer = useCallback(() => {
    clearTimeout(timeOut.current)
    queuedNextId.current = null
  }, [timeOut])

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

  const disableAutoplay = useCallback(() => {
    setIsPlaying(false)
    clearTimer()
  }, [setIsPlaying, clearTimer])

  const toggleAutoplay = useCallback(() => {
    if (isPlaying) {
      disableAutoplay()
    } else {
      setIsPlaying(true)
    }
  }, [setIsPlaying, isPlaying, disableAutoplay])

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
      }}
    >
      {children}
    </AutoplayContext.Provider>
  )
}

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
