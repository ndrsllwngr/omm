import React, { createContext, useContext, useState } from 'react'
import Proptypes from 'prop-types'

//CreateContext
export const AutoplayStateContext = createContext()
export const AutoplayDispatchContext = createContext()

//Reducer
function countReducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return { count: !state.count }
    }
    // case 'decrement': {
    //   return { count: state.count - 1 }
    // }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
//Exports the Provider himself
export const AutoplayProvider = ({ children }) => {
  const [state, setState] = React.useReducer(countReducer, { count: false })
  //const [state, setState] = useState(false)

  return (
    <AutoplayStateContext.Provider value={state}>
      <AutoplayDispatchContext.Provider value={setState}>
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
