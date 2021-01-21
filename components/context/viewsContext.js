import React, { useContext, useState, createContext } from 'react'
import Proptypes from 'prop-types'
import { SORT } from '@/lib/constants'

export const SortContext = createContext({})
export const ReloadContext = createContext({})

export const ViewsProvider = ({ children }) => {
  const [sort, setSort] = useState(SORT.LATEST)
  const [reload, setReload] = useState(false)
  return (
    <SortContext.Provider value={{ sort, setSort }}>
      <ReloadContext.Provider value={{ reload, setReload }}>{children}</ReloadContext.Provider>
    </SortContext.Provider>
  )
}

export const useSortContext = () => {
  const context = useContext(SortContext)
  if (!context) {
    throw new Error(`useSortContext must be used within a TemplateProvider`)
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
