import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { gql, useLazyQuery } from '@apollo/client'
import { PrimaryBtn } from '@/components/ui/Buttons'
import Link from 'next/link'
import { useDetectOutsideClick } from '@/components/hooks/useDetectOutsideClick'
import { MemeRenderer } from '@/components/MemeRenderer'
const TIMEOUT_IN_MS = 1000
export const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String) {
    memes(query: { title: $filter }) {
      _id
      createdAt
      createdBy {
        _id
      }
      downVotes {
        _id
      }
      forkedBy {
        _id
      }
      forkedFrom {
        _id
      }
      json
      svg
      template {
        id {
          _id
        }
      }
      title
      upVotes {
        _id
      }
      points
      url
      views
      visibility
    }
  }
`
//https://github.com/howtographql/react-apollo/blob/master/src/components/Search.js
export const Search = () => {
  const searchContainerRef = useRef(null)
  const timeOut = useRef(undefined)
  const [isActive, setIsActive] = useDetectOutsideClick(searchContainerRef, false)
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY)
  const [searchFilter, setSearchFilter] = useState('')

  const clearTimer = useCallback(() => {
    clearTimeout(timeOut.current)
  }, [timeOut])

  useEffect(() => {
    console.log({ SEARCHFILTER: searchFilter })
  }, [searchFilter])
  useEffect(() => {
    if (isActive) {
      console.log('Searchfield active')
    } else {
      console.log('Searchfield INACTIVE')
    }
    if (data) {
      if (data.memes === undefined || data.memes.length == 0) {
        console.log('NO DATA')
      } else {
        console.log({ DATA: data }, 'data available')
      }
    }
  }, [isActive, data, searchFilter])

  return (
    <div ref={searchContainerRef} className={'relative mb-4 w-full md:mx-2 md:mb-0 md:w-1/4'}>
      <div className={'flex flex-row'}>
        {/*        <label className="hidden" htmlFor="search-form">
          Search
        </label>*/}
        <input
          className="flex-grow-2 text-white border bg-custom-gray border-dotted stroke-dasharray: 6; focus:border-orange p-2 rounded-lg shadow-inner w-full"
          placeholder="Search"
          type="text"
          onChange={(e) => {
            console.log('here iam')
            timeOut.current = setTimeout(function () {
              console.log('but not inside')
              setSearchFilter(e.target.value)
            }, TIMEOUT_IN_MS)
          }}
          onKeyDown={() => {
            clearTimer()
            console.log('Cleared')
          }}
          onFocus={() => setIsActive(true)}
        />
        <PrimaryBtn
          mono={true}
          onClick={(e) => {
            e.preventDefault()
            executeSearch({
              variables: { filter: searchFilter },
            })
            setIsActive(true)
          }}
        >
          Search
        </PrimaryBtn>
      </div>
      <ul className={'absolute flex flex-col w-full rounded-xl bg-white mt-1'}>
        {data && isActive && <Dropdown data={data} />}
      </ul>
    </div>
  )
}

export const Dropdown = ({ data }) => {
  return data.memes.map((meme, index) => {
    return (
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
    )
  })
}
