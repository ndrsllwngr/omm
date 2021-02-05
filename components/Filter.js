import React from 'react'
import { FILTER } from '@/lib/constants'
import { useFilterContext } from '@/components/context/viewsContext'
import { SecondaryBtn } from '@/components/ui/Buttons'

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
      <SecondaryBtn onClick={() => handleFilterChange(FILTER.HOT)} disabled={filter === FILTER.HOT}>
        Hot
      </SecondaryBtn>

      <SecondaryBtn
        onClick={() => handleFilterChange(FILTER.TRENDING)}
        disabled={filter === FILTER.TRENDING}
      >
        Trending
      </SecondaryBtn>

      <SecondaryBtn
        onClick={() => handleFilterChange(FILTER.FRESH)}
        disabled={filter === FILTER.FRESH}
      >
        Fresh
      </SecondaryBtn>

      <SecondaryBtn
        onClick={() => handleFilterChange(FILTER.NONE)}
        disabled={filter === FILTER.NONE}
      >
        None
      </SecondaryBtn>
    </div>
  )
}
