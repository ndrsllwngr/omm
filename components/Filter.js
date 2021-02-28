import React from 'react'
import { FILTER } from '@/lib/constants'
import { useFilterContext } from '@/components/context/viewsContext'
import { Badge } from '@/components/ui/Buttons'

//Define all available filter types
const supportedFilter = [FILTER.HOT, FILTER.TRENDING, FILTER.FRESH, FILTER.NONE]

/*
Components handles and displays available filter options
 */
export const Filter = () => {
  //Get filter state and set function
  const { filter, setFilter } = useFilterContext()

  //Function to set filter changes in the context
  const handleFilterChange = (newFilter) => {
    if (filter !== newFilter) {
      setFilter(newFilter)
    }
  }

  return (
    <div className="flex flex-row justify-end items-center">
      {supportedFilter.map((supfilter, index) => {
        return (
          <Badge
            className={'mx-1'}
            key={index}
            onClick={() => handleFilterChange(supfilter)}
            active={supfilter === filter}
          >
            {supfilter}
          </Badge>
        )
      })}
    </div>
  )
}
