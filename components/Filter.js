import React, { useState } from 'react'
import { FILTER } from '@/lib/constants'
import { useFilterContext } from '@/components/context/viewsContext'

//http://react.tips/radio-buttons-in-reactjs/
export const Filter = () => {
  const { filter, setFilter } = useFilterContext()

  const handleFilterChange = (changeEvent) => {
    setFilter(changeEvent.target.value)
  }

  return (
    <div className="flex flex-row justify-end items-center">
      <div className="radio">
        <label>
          <input
            type="radio"
            value="Hot"
            onChange={handleFilterChange}
            checked={filter === FILTER.HOT}
          />
          Hot
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="Trending"
            onChange={handleFilterChange}
            checked={filter === FILTER.TRENDING}
          />
          Trending
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="Fresh"
            onChange={handleFilterChange}
            checked={filter === FILTER.FRESH}
          />
          Fresh
        </label>
      </div>
    </div>
  )
}
