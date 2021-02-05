import React from 'react'
import { FILTER } from '@/lib/constants'
import { useFilterContext } from '@/components/context/viewsContext'
import { Batch } from '@/components/ui/Buttons'

const supportedFilter = [FILTER.HOT, FILTER.TRENDING, FILTER.FRESH, FILTER.NONE]
//http://react.tips/radio-buttons-in-reactjs/
export const Filter = () => {
  const { filter, setFilter } = useFilterContext()

  const handleFilterChange = (newFilter) => {
    if (filter !== newFilter) {
      setFilter(newFilter)
    }
  }

  return (
    <div className="flex flex-row justify-end items-center">
      {supportedFilter.map((supfilter, index) => {
        return (
          <Batch
            className={'mx-1'}
            key={index}
            onClick={() => handleFilterChange(supfilter)}
            active={supfilter === filter}
          >
            {supfilter}
          </Batch>
        )
      })}
    </div>
  )
}
