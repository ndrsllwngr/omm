import React from 'react'
import { FILTER, SORT } from '@/lib/constants'
import { useFilterContext } from '@/components/context/viewsContext'
import { SecondaryBtn } from '@/components/ui/Buttons'

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
      {supportedFilter.map((filter, index) => {
        return (
          <SecondaryBtn
            key={index}
            onClick={() => handleFilterChange(filter)}
            disabled={filter === filter}
          >
            {filter}
          </SecondaryBtn>
        )
      })}
    </div>
  )
}
