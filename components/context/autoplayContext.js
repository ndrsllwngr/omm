import React, { createContext, useContext, useEffect } from 'react'
import Proptypes from 'prop-types'
import { useRouter } from 'next/router'

//Create Context
export const AutoplayStateContext = createContext()
export const AutoplayDispatchContext = createContext()

//Reducer to control Autoplay Button State
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
  useEffect(() => {
    if (router) {
      //console.log({ PATHNAME: router.pathname })
      if (router.pathname !== '/meme/[id]') {
        dispatch({ type: 'falseBool' })
      }
    }
  }, [router])

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

AutoplayProvider.propTypes = {
  children: Proptypes.any,
}
