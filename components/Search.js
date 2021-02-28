import React, { useCallback, useRef, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import Link from 'next/link'
import { useDetectOutsideClick } from '@/components/hooks/useDetectOutsideClick'
import { MemeRenderer } from '@/components/MemeRenderer'
import PropTypes from 'prop-types'
import { VISIBILITY } from '@/lib/constants'
// Timeout
const TIMEOUT_IN_MS = 1000
// Fulltext search query
export const FEED_SEARCH_QUERY = gql`
  query searchQuery($search: String!, $conditions: String, $sorts: String) {
    searchMemesByTitle(input: { sorts: $sorts, searchString: $search, conditions: $conditions }) {
      _id
      title
      svg
      template {
        _id
        createdAt
        createdBy {
          _id
        }
        type
        mediaType
        img
        url
        width
        height
        name
      }
      json
    }
  }
`
/*
Component to search for memes by title.
incremental search with one second delay
https://github.com/howtographql/react-apollo/blob/master/src/components/Search.js
 */
export const Search = () => {
  // Reference to html element holding inpout field
  const searchContainerRef = useRef(null)
  // Reference to setTimeout function
  const timeOut = useRef(null)
  // Get outside click detection hook to close search result dropdown
  const [isActive, setIsActive] = useDetectOutsideClick(searchContainerRef, false)
  // Query loading searched memes
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY)

  const memes = data?.searchMemesByTitle
  useEffect(() => {
    return () => {
      console.log(data)
    }
  }, [data])

  // Clearing setTimeout
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
            timeOut.current = setTimeout(() => {
              executeSearch({
                variables: {
                  search: e.target.value || '',
                  conditions: JSON.stringify({
                    visibility: { $eq: VISIBILITY.PUBLIC },
                    isDraft: { $eq: false },
                  }),
                  sorts: JSON.stringify({
                    createdAt: -1,
                  }),
                },
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
/*
Dropdown to display given search results
 */
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
