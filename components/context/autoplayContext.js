import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import Proptypes from 'prop-types'
import { useRouter } from 'next/router'
import { useSingleMemeContext } from '@/components/context/singlememeContext'
import { useRandomMeme } from '@/components/hooks/useRandomMeme'
// https://kentcdodds.com/blog/how-to-use-react-context-effectively

export const AutoplayStateContext = createContext({})
export const AutoplayDispatchContext = createContext({})
export const AutoplayFilterContext = createContext({})

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
  const [filter, setFilter] = useState('Random')
  const router = useRouter()
  const timeOut = useRef(null)
  const { nextMeme } = useSingleMemeContext()
  const { id } = useRandomMeme(router)

  useEffect(() => {
    clearTimeout(timeOut.current)
    let startAutoplay = null
    switch (filter) {
      case 'Ordered':
        startAutoplay = () => {
          timeOut.current = setTimeout(function () {
            if (nextMeme.id) {
              router.push(`/meme/${nextMeme.id}`)
            }
          }, 3000)
        }

        if (nextMeme) {
          state.bool ? startAutoplay() : clearTimeout(timeOut.current)
        }
        break
      case 'Random':
        startAutoplay = () => {
          timeOut.current = setTimeout(function () {
            router.push(`/meme/${id}`)
          }, 3000)
        }

        state.bool ? startAutoplay() : clearTimeout(timeOut.current)

        break
      default:
        console.log('Unsupported Case')
    }

    // Intentionally, we were leaving 'router' out of the dependency array. Otherwise autoplay would executed even-though the route changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextMeme, state.bool, filter])

  useEffect(() => {
    if (router.pathname !== '/meme/[id]') {
      if (state.bool) {
        dispatch({ type: 'falseBool' })
        clearTimeout(timeOut.current)
      }
    }
  }, [router, state.bool])

  return (
    <AutoplayFilterContext.Provider value={{ filter, setFilter }}>
      <AutoplayStateContext.Provider value={state}>
        <AutoplayDispatchContext.Provider value={dispatch}>
          {children}
        </AutoplayDispatchContext.Provider>
      </AutoplayStateContext.Provider>
    </AutoplayFilterContext.Provider>
  )
}

//Exports Context as Alias with Error handling
export const useAutoPlayFilter = () => {
  const context = useContext(AutoplayFilterContext)
  if (!context) {
    throw new Error(`useAutoPlayFilter must be used within a AutoplayFilterProvider`)
  }
  return context
}
export const useAutoPlayState = () => {
  const context = useContext(AutoplayStateContext)
  if (!context) {
    throw new Error(`useAutoPlayState must be used within a AutoplayStateProvider`)
  }
  return context
}
export const useAutoPlayDispatch = () => {
  const context = useContext(AutoplayDispatchContext)
  if (!context) {
    throw new Error(`useAutoPlayDispatch must be used within a AutoplayDispatchProvider`)
  }
  return context
}
export function useAutoPlayContext() {
  return [useAutoPlayState(), useAutoPlayDispatch()]
}

AutoplayProvider.propTypes = {
  children: Proptypes.any,
}
