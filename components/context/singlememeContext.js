import React, { useContext, useState, createContext } from 'react'
import Proptypes from 'prop-types'
import { useImmer } from 'use-immer'

export const SingleMemeContext = createContext({})

export const SingleMemeProvider = ({ children }) => {
  const [currentMeme, updateCurrent] = useImmer(null)
  const [prevMeme, setPrev] = useState(null)
  const [nextMeme, setNext] = useState(null)
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
