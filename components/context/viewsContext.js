import React, { useContext, useState, createContext } from 'react'
import Proptypes from 'prop-types'
import { SORT, FILTER } from '@/lib/constants'

export const SortContext = createContext({})
export const ReloadContext = createContext({})
export const FilterContext = createContext({})

export const ViewsProvider = ({ children }) => {
  const [sort, setSort] = useState(SORT.LATEST)
  const [filter, setFilter] = useState(FILTER.NONE)
  const [reload, setReload] = useState(false)
  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      <SortContext.Provider value={{ sort, setSort }}>
        <ReloadContext.Provider value={{ reload, setReload }}>{children}</ReloadContext.Provider>
      </SortContext.Provider>
    </FilterContext.Provider>
  )
}

export const useSortContext = () => {
  const context = useContext(SortContext)
  if (!context) {
    throw new Error(`useSortContext must be used within a ViewsProvider`)
  }
  return context
}
export const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error(`useFilterContext must be used within a ViewsProvider`)
  }
  return context
}
export const useReloadContext = () => {
  const context = useContext(ReloadContext)
  if (!context) {
    throw new Error(`useReloadContext must be used within a ViewsProvider`)
  }
  return context
}
ViewsProvider.propTypes = {
  children: Proptypes.any,
}
