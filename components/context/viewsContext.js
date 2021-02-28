import React, { useContext, useState, createContext, useEffect } from 'react'
import Proptypes from 'prop-types'
import { SORT, FILTER } from '@/lib/constants'

// Init contexts
export const SortContext = createContext({})
export const FilterContext = createContext({})
export const TemplateContext = createContext({})

/*
Context to handle filter and sorting
 */
export const ViewsProvider = ({ children }) => {
  const [sort, setSort] = useState(SORT.LATEST)
  const [filter, setFilter] = useState(FILTER.NONE)
  const [template, setTemplate] = useState(null)
  const [yesterday, setYesterday] = useState(null)

  // Calculate datetime for time depended filtering
  useEffect(() => {
    const yesterdayDate = new Date(Date.now() - 24 * 3600 * 1000)
    setYesterday(yesterdayDate.toISOString())
  }, [filter, setYesterday])

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      <FilterContext.Provider value={{ filter, setFilter, yesterday, template }}>
        <SortContext.Provider value={{ sort, setSort }}>{children}</SortContext.Provider>
      </FilterContext.Provider>
    </TemplateContext.Provider>
  )
}
// Export sort context
export const useSortContext = () => {
  const context = useContext(SortContext)
  if (!context) {
    throw new Error(`useSortContext must be used within a ViewsProvider`)
  }
  return context
}
// Export filter context
export const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error(`useFilterContext must be used within a ViewsProvider`)
  }
  return context
}
// Export template filter context
export const useTemplateContext = () => {
  const context = useContext(TemplateContext)
  if (!context) {
    throw new Error(`useTemplateContext must be used within a ViewsProvider`)
  }
  return context
}
ViewsProvider.propTypes = {
  children: Proptypes.any,
}
