import React, { useContext, useState, createContext } from 'react'
import Proptypes from 'prop-types'

export const ReloadContext = createContext()

export const ReloadContextProvider = ({ children }) => {
  const [reload, setReload] = useState(false)
  return <ReloadContext.Provider value={{ reload, setReload }}>{children}</ReloadContext.Provider>
}

export const useReloadContext = () => {
  const context = useContext(ReloadContext)
  if (!context) {
    throw new Error(`useReloadContext must be used within a TemplateProvider`)
  }
  return context
}
ReloadContextProvider.propTypes = {
  children: Proptypes.any,
}
