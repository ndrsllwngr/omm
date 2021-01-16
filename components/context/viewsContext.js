import React, { useContext, useState, createContext } from 'react'
import Proptypes from 'prop-types'

export const FilterContext = createContext()
export const ReloadContext = createContext()

export const ViewsProvider = ({ children }) => {
  const [filter, setFilter] = useState('Latest')
  const [reload, setReload] = useState(false)
  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      <ReloadContext.Provider value={{ reload, setReload }}>{children}</ReloadContext.Provider>
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error(`useFilterContext must be used within a TemplateProvider`)
  }
  return context
}
export const useReloadContext = () => {
  const context = useContext(ReloadContext)
  if (!context) {
    throw new Error(`useReloadContext must be used within a TemplateProvider`)
  }
  return context
}
ViewsProvider.propTypes = {
  children: Proptypes.any,
}
