import React, { useContext, useState, createContext, useEffect } from 'react'
import Proptypes from 'prop-types'
import { SORT, FILTER } from '@/lib/constants'

export const SortContext = createContext({})
export const ReloadContext = createContext({})
export const FilterContext = createContext({})
export const TemplateContext = createContext({})

export const ViewsProvider = ({ children }) => {
  const [sort, setSort] = useState(SORT.LATEST)
  const [filter, setFilter] = useState(FILTER.NONE)
  const [template, setTemplate] = useState(null)
  const [reload, setReload] = useState(false)
  const [yesterday, setYesterday] = useState(null)

  useEffect(() => {
    const yesterdayDate = new Date(Date.now() - 24 * 3600 * 1000)
    setYesterday(yesterdayDate.toISOString())
  }, [filter, setYesterday])

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      <FilterContext.Provider value={{ filter, setFilter, yesterday, template }}>
        <SortContext.Provider value={{ sort, setSort }}>
          <ReloadContext.Provider value={{ reload, setReload }}>{children}</ReloadContext.Provider>
        </SortContext.Provider>
      </FilterContext.Provider>
    </TemplateContext.Provider>
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
