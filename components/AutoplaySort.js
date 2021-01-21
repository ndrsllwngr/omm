import React, { useRef } from 'react'
import { useDetectOutsideClick } from '@/components/hooks/useDetectOutsideClick'
import { useAutoPlayOrder } from '@/components/context/autoplayContext'
import { AUTOPLAY_ORDER } from '@/lib/constants'

export const AutoplaySort = () => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const { order, setOrder } = useAutoPlayOrder()

  const onClick = () => setIsActive(!isActive)

  const handleClick = (newOrder) => {
    setIsActive(false)
    setOrder(newOrder)
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full border-b-2 shadow-sm px-4 mt-4 py-2 bg-transparent text-sm font-medium text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-gray-200"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={onClick}
        >
          {order} Autoplay
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
      {isActive && (
        <div
          ref={dropdownRef}
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1">
            <div
              onClick={() => handleClick(AUTOPLAY_ORDER.RANDOM)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              {AUTOPLAY_ORDER.RANDOM}
            </div>
            <div
              onClick={() => handleClick(AUTOPLAY_ORDER.ORDERED)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              {AUTOPLAY_ORDER.ORDERED}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
