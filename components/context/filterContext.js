import React, { useContext, useState, createContext } from 'react'
import Proptypes from 'prop-types'

export const FilterContext = createContext()

export const FilterContextProvider = ({ children }) => {
  const [filter, setFilter] = useState('Latest')
  return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>
}

export const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error(`useFilterContext must be used within a TemplateProvider`)
  }
  return context
}
FilterContextProvider.propTypes = {
  children: Proptypes.any,
}
