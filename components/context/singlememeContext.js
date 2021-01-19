import React, { useContext, useState, createContext, useEffect } from 'react'
import Proptypes from 'prop-types'
import { useImmer } from 'use-immer'
import { useRouter } from 'next/router'

export const SingleMemeContext = createContext({})

export const SingleMemeProvider = ({ children }) => {
  const router = useRouter()
  const [currentMeme, updateCurrent] = useImmer(null)
  const [prevMeme, setPrev] = useState(null)
  const [nextMeme, setNext] = useState(null)

  useEffect(() => {
    if (router.pathname !== '/meme/[id]') {
      console.debug('SingleMemeProvider', "router.pathname !== '/meme/[id]'", router)
      if (currentMeme) {
        updateCurrent((_draft) => {
          return null
        })
      }
      if (prevMeme) {
        setPrev(null)
      }
      if (nextMeme) {
        setNext(null)
      }
    }
    // 'currentMeme, prevMeme, nextMeme, ...' are intentionally left out of the dependency array.
    // Otherwise caching from /index page to /meme/[id] page would not be possible.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <SingleMemeContext.Provider
      value={{ currentMeme, updateCurrent, prevMeme, setPrev, nextMeme, setNext }}
    >
      {children}
    </SingleMemeContext.Provider>
  )
}

export const useSingleMemeContext = () => {
  const context = useContext(SingleMemeContext)
  if (!context) {
    throw new Error(`useSingleMemeContext must be used within a SingleMemeProvider`)
  }
  return context
}

SingleMemeProvider.propTypes = {
  children: Proptypes.any,
}
