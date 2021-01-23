import React, { useContext, useState, createContext, useEffect } from 'react'
import Proptypes from 'prop-types'
import { useImmer } from 'use-immer'
import { useRouter } from 'next/router'

export const SingleMemeContext = createContext({})
export const SingleMemeLoadingContext = createContext({})

export const SingleMemeProvider = ({ children }) => {
  const router = useRouter()
  const [currentMeme, updateCurrent] = useImmer(null)
  const [prevMeme, setPrev] = useState(null)
  const [nextMeme, setNext] = useState(null)
  const [prevIsLoading, setPrevIsLoading] = useState(false)
  const [currentIsLoading, setCurrentIsLoading] = useState(false)
  const [nextIsLoading, setNextIsLoading] = useState(false)

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
      <SingleMemeLoadingContext.Provider
        value={{
          prevIsLoading,
          nextIsLoading,
          setPrevIsLoading,
          setNextIsLoading,
          currentIsLoading,
          setCurrentIsLoading,
        }}
      >
        {children}
      </SingleMemeLoadingContext.Provider>
    </SingleMemeContext.Provider>
  )
}

export const useSingleMemeLoadingContext = () => {
  const context = useContext(SingleMemeLoadingContext)
  if (!context) {
    throw new Error(`useSingleMemeLoadingContext must be used within a SingleMemeProvider`)
  }
  return context
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
