import React, { useRef } from 'react'
import { useDetectOutsideClick } from '@/components/hooks/useDetectOutsideClick'
import { useSortContext } from '@/components/context/viewsContext'
import PropTypes from 'prop-types'
import { useMemeReload } from '@/components/hooks/useMemeReload'
import firebase from '@/lib/firebase'
import { IoCloud } from 'react-icons/io5'
import { SORT } from '@/lib/constants'
//https://tailwindui.com/components/application-ui/elements/dropdowns
//https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
export const OverviewSort = ({ callback = null, enableNotification = false }) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const onClick = () => setIsActive(!isActive)
  const { sort, setSort } = useSortContext()

  const handleClick = (newSort) => {
    setIsActive(false)
    if (newSort !== sort) {
      if (callback) {
        callback()
      }
      setSort(newSort)
    }
  }
  return (
    <div className="flex justify-end items-center">
      {enableNotification && <NewMemeNotification setSort={setSort} />}
      <div className="flex relative">
        <button
          type="button"
          className="inline-flex justify-center w-full border-b-2 shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-gray-200"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={onClick}
        >
          {sort}
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
        {isActive && (
          <div
            ref={dropdownRef}
            className="origin-top-right absolute right-0 mt-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          >
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div
                onClick={() => handleClick(SORT.LATEST)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {SORT.LATEST}
              </div>
              <div
                onClick={() => handleClick(SORT.OLDEST)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {SORT.OLDEST}
              </div>
              <div
                onClick={() => handleClick(SORT.MOST_VIEWED)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {SORT.MOST_VIEWED}
              </div>
              <div
                onClick={() => handleClick(SORT.LEAST_VIEWED)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {SORT.LEAST_VIEWED}
              </div>
              <div
                onClick={() => handleClick(SORT.MOST_POINTS)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {SORT.MOST_POINTS}
              </div>
              <div
                onClick={() => handleClick(SORT.LEAST_POINTS)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {SORT.LEAST_POINTS}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

OverviewSort.propTypes = {
  callback: PropTypes.func,
  enableNotification: PropTypes.bool,
}

const NewMemeNotification = ({ setSort }) => {
  const {
    showNewMemes,
    setShowNewMemes,
    setCounter,
    setDate,
    counter,
    setReload,
    reload,
  } = useMemeReload()
  if (!showNewMemes) return null
  return (
    <button
      onClick={() => {
        setReload(!reload)
        setShowNewMemes(false)
        setCounter(0)
        setDate(firebase.firestore.Timestamp.now())
        setSort(SORT.LATEST)
      }}
      className="text-custom-green uppercase font-semibold flex items-center mr-4"
    >
      <IoCloud size={18} className={'fill-current mr-2'} /> {counter} New Meme
      {counter > 1 && 's'}
    </button>
  )
}

NewMemeNotification.propTypes = {
  setSort: PropTypes.func,
}
