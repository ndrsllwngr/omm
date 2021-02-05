import React, { useCallback, useRef, useEffect } from 'react'
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
  const memes = data?.searchMemesByTitle
  useEffect(() => {
    return () => {
      console.log(data)
    }
  }, [data])

  const clearTimer = useCallback(() => {
    clearTimeout(timeOut.current)
  }, [timeOut])

  return (
    <div className={'relative mb-4 w-full md:mx-2 md:mb-0 md:w-1/4'}>
      <div ref={searchContainerRef} className={'flex flex-row'}>
        <label className="hidden" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          className="flex-grow-2 text-white border bg-custom-gray border-dotted stroke-dasharray: 6; focus:border-orange p-2 rounded-lg shadow-inner w-full"
          placeholder="Search"
          type="text"
          onChange={(e) => {
            clearTimer()
            timeOut.current = setTimeout(function () {
              executeSearch({
                variables: { search: e.target.value },
              })
            }, TIMEOUT_IN_MS)
          }}
          onFocus={() => setIsActive(true)}
        />
      </div>
      {memes?.length > 0 && isActive && <SearchResultDropdown memes={memes} />}
    </div>
  )
}

export const SearchResultDropdown = ({ memes = [] }) => {
  return (
    <ul
      className={'absolute flex flex-col w-full h-80 overflow-auto rounded-xl bg-white mt-1 z-10'}
    >
      {memes.map((meme, index) => (
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
  memes: PropTypes.any,
}
