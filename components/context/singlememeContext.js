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
      if (currentMeme) {
        // purge cache
        setNext(null)
        setPrev(null)
        updateCurrent((_draft) => {
          return null
        })
      }
    }
  }, [router, currentMeme, updateCurrent, prevMeme, nextMeme])

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
