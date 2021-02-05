import React, { useCallback, useEffect, useState, useRef } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import Link from 'next/link'
import { useDetectOutsideClick } from '@/components/hooks/useDetectOutsideClick'
import { MemeRenderer } from '@/components/MemeRenderer'
import PropTypes from 'prop-types'
const TIMEOUT_IN_MS = 1000
export const FEED_SEARCH_QUERY = gql`
  query searchQuery($search: String) {
    searchMemesByTitle(input: $search) {
      _id
      title
      svg
    }
  }
`
//https://github.com/howtographql/react-apollo/blob/master/src/components/Search.js
export const Search = () => {
  const searchContainerRef = useRef(null)
  const timeOut = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(searchContainerRef, false)
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY)

  const clearTimer = useCallback(() => {
    clearTimeout(timeOut.current)
  }, [timeOut])

  return (
    <div className={'relative mb-4 w-full md:mx-2 md:mb-0 md:w-1/4'}>
      <div ref={searchContainerRef} className={'flex flex-row'}>
        <label className="hidden" htmlFor="search-form">
          Search
        </label>
        <input
          className="flex-grow-2 text-white border bg-custom-gray border-dotted stroke-dasharray: 6; focus:border-orange p-2 rounded-lg shadow-inner w-full"
          placeholder="Search"
          type="text"
          onChange={(e) => {
            timeOut.current = setTimeout(function () {
              executeSearch({
                variables: { search: e.target.value },
              })
            }, TIMEOUT_IN_MS)
          }}
          onKeyDown={() => {
            clearTimer()
          }}
          onFocus={() => setIsActive(true)}
        />
      </div>
      {data && isActive && <SearchResultDropdown data={data} />}
    </div>
  )
}

export const SearchResultDropdown = ({ data }) => {
  return (
    <ul className={'absolute flex flex-col w-full h-auto  rounded-xl bg-white mt-1'}>
      {data.searchMemesByTitle.map((meme, index) => (
        <li className={'p-2'} key={index}>
          <Link href={`/meme/${meme._id}`}>
            <a className={'flex flex-row items-center'}>
              <div className="w-20 h-20 flex items-center">
                <MemeRenderer meme={meme} />
              </div>
              <p className="ml-2">{meme.title}</p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
SearchResultDropdown.propTypes = {
  data: PropTypes.any,
}
