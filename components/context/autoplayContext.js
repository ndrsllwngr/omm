import React, { createContext, useContext, useEffect, useRef } from 'react'
import Proptypes from 'prop-types'
import { useRouter } from 'next/router'
import { useSingleMemeContext } from '@/components/context/singlememeContext'
// https://kentcdodds.com/blog/how-to-use-react-context-effectively

export const AutoplayStateContext = createContext()
export const AutoplayDispatchContext = createContext()

function boolReducer(state, action) {
  switch (action.type) {
    case 'toggleBool': {
      return { bool: !state.bool }
    }
    case 'falseBool': {
      return { bool: false }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

//Exports the Provider himself
export const AutoplayProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(boolReducer, { bool: false })
  const router = useRouter()
  const timeOut = useRef(null)
  const { nextMeme, currentMeme, updateCurrent, setNext, setPrev } = useSingleMemeContext()

  useEffect(() => {
    const startAutoplay = () => {
      timeOut.current = setTimeout(function () {
        if (nextMeme.id) {
          setNext(null)
          setPrev(currentMeme)
          updateCurrent((_draft) => {
            return nextMeme
          })
          router.push(`/meme/${nextMeme.id}`)
        }
      }, 3000)
    }
    if (nextMeme) {
      state.bool ? startAutoplay() : clearTimeout(timeOut.current)
    }

    // Intentionally, we were leaving 'router' out of the dependency array. Otherwise autoplay would executed even-though the route changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextMeme, state.bool])

  useEffect(() => {
    if (router.pathname !== '/meme/[id]') {
      if (state.bool) {
        dispatch({ type: 'falseBool' })
      }
    }
  }, [router, state.bool])

  return (
    <AutoplayStateContext.Provider value={state}>
      <AutoplayDispatchContext.Provider value={dispatch}>
        {children}
      </AutoplayDispatchContext.Provider>
    </AutoplayStateContext.Provider>
  )
}

//Exports Context as Alias with Error handling
export const useAutoPlayState = () => {
  const context = useContext(AutoplayStateContext)
  if (!context) {
    throw new Error(`useAutoPlayState must be used within a TemplateProvider`)
  }
  return context
}
export const useAutoPlayDispatch = () => {
  const context = useContext(AutoplayDispatchContext)
  if (!context) {
    throw new Error(`useAutoPlayDispatch must be used within a TemplateProvider`)
  }
  return context
}
export function useAutoPlayContext() {
  return [useAutoPlayState(), useAutoPlayDispatch()]
}

AutoplayProvider.propTypes = {
  children: Proptypes.any,
}
