import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

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
  query FeedSearchQuery($filter: String!) {
    memes(query: { title: $filter }) {
      _id
    }
  }
`

export const Search = () => {
  const [searchFilter, setSearchFilter] = useState('')
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY)

  /*  useEffect(() => {
    console.log(searchFilter)
    console.log('YEAH')
    console.log(data)
  }, [data, searchFilter])*/

  return (
    <form className={'mb-4 w-full md:mx-2 md:mb-0 md:w-1/4'}>
      <label className="hidden" htmlFor="search-form">
        Search
      </label>
      <input
        className="text-white border bg-custom-gray border-dotted stroke-dasharray: 6; focus:border-orange p-2 rounded-lg shadow-inner w-full"
        placeholder="Search"
        type="text"
        onChange={(e) => setSearchFilter(e.target.value)}
      />
      <button
        className="h-2 w-2"
        onClick={executeSearch({
          variables: { filter: searchFilter },
        })}
      >
        Submit
      </button>
    </form>
  )
}
