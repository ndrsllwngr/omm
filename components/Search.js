import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { PrimaryBtn } from '@/components/ui/Buttons'
import Link from 'next/link'

/*const ALL_LINKS_SEARCH_QUERY = gql`
  query AllLinksSearchQuery($searchText: String!) {
    allLinks(filter: {
      OR: [{
        url_contains: $searchText
      }, {
        description_contains: $searchText
      }]
    }) {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`*/
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
  const [searchFilter, setSearchFilter] = useState('')
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY)

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className={'relative mb-4 w-full md:mx-2 md:mb-0 md:w-1/4'}>
      <form className={'flex flex-row'}>
        {/*        <label className="hidden" htmlFor="search-form">
          Search
        </label>*/}
        <input
          className="flex-grow-2 text-white border bg-custom-gray border-dotted stroke-dasharray: 6; focus:border-orange p-2 rounded-lg shadow-inner w-full"
          placeholder="Search"
          type="text"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <PrimaryBtn
          mono={true}
          onClick={(e) => {
            e.preventDefault()
            executeSearch({
              variables: { filter: searchFilter },
            })
          }}
        >
          Search
        </PrimaryBtn>
      </form>
      <ul className={'absolute flex flex-col w-full rounded-xl bg-white'}>
        {data &&
          data.memes.map((meme, index) => {
            return (
              <li key={index} className={'p-2'}>
                {meme.svg}
                <Link href={meme._id}>
                  <a>{meme.title}</a>
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
