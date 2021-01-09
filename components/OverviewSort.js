import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDetectOutsideClick } from '@/components/hooks/useDetectOutsideClick'
//https://tailwindui.com/components/application-ui/elements/dropdowns
//https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
export const OverviewSort = ({ filter, onFilterChange }) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const onClick = () => setIsActive(!isActive)

  const [localFilter, setFilter] = useState(filter)

  //handle statefunction für state und callback
  const handleClick = (f) => {
    onFilterChange(f)
    setFilter(f)
  }
  return (
    <div className="relative block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={onClick}
        >
          Sortby: {localFilter}
          {/* <!-- Heroicon name: chevron-down --> */}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* <!--
	  Dropdown panel, show/hide based on dropdown state.

	  Entering: "transition ease-out duration-100"
		From: "transform opacity-0 scale-95"
		To: "transform opacity-100 scale-100"
	  Leaving: "transition ease-in duration-75"
		From: "transform opacity-100 scale-100"
		To: "transform opacity-0 scale-95"
	--> */}
      {isActive && (
        <div
          ref={dropdownRef}
          className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div
              onClick={() => handleClick('Latest')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Latest
            </div>
            <div
              onClick={() => handleClick('Oldest')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Oldest
            </div>
            {/* <div
              onClick={() => handleClick('Views')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Views
            </div> */}
            <div
              onClick={() => handleClick('Votes')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Votes
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

OverviewSort.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
}
