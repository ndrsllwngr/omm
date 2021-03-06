import React from 'react'
import { Slideshow } from '@/components/Slideshow'
import { Navbar } from '@/components/Navbar'
import { HtmlHead } from '@/components/HtmlHead'
import { useFilterContext, useSortContext } from '@/components/context/viewsContext'
import { gql, NetworkStatus, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { VISIBILITY } from '@/lib/constants'
import { useAuth } from '@/components/context/authContext'
import { FilterSection } from '@/components/FilterSection'

/*
Page to present a single meme
 */
export default function SingleView() {
  return (
    <>
      <Navbar />
      <div className={'max-w-7xl mx-auto mt-4'}>
        <FilterSection />
        <SingleViewInner />
      </div>
    </>
  )
}
//Query to load the current meme from its id
export const CURRENT_MEME = gql`
  query getCurrentMeme($meme: ObjectId) {
    memes(query: { _id: $meme }) {
      _id
      commentCount
      comments {
        _id
        text
        createdAt
        createdBy {
          _id
          name
        }
      }
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
      isDraft
      json
      svg
      template {
        _id
        createdAt
        createdBy {
          _id
        }
        height
        img
        mediaType
        type
        url
        width
        name
      }
      captions
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

/*
Function to generate the inner wrapper of the single view page
 */
const SingleViewInner = () => {
  //Get authorization
  const auth = useAuth()
  //Get router
  const router = useRouter()
  //Get sorting
  const { sort } = useSortContext()
  //Get filter
  const { filter, yesterday, template } = useFilterContext()
  //Query current meme from database
  const { loading, error, data, networkStatus } = useQuery(CURRENT_MEME, {
    variables: { meme: router.query.id },
    notifyOnNetworkStatusChange: false,
  })

  const loadingMoreMemes = networkStatus === NetworkStatus.fetchMore

  if (error) {
    console.error(error)
    return <div>Error loading memes.</div>
  }
  if (loading && !loadingMoreMemes)
    return (
      <>
        <HtmlHead title={'Meme · Loading... '} />
        <div>Loading...</div>
      </>
    )
  // Check permissions
  if (data && !error && !loading && data.memes.length > 0) {
    if (
      (data.memes[0].visibility === VISIBILITY.PRIVATE &&
        auth.isAuthenticated() &&
        data.memes[0].createdBy._id !== auth.getUser().id) ||
      (data.memes[0].visibility === VISIBILITY.PRIVATE && !auth.isAuthenticated())
    ) {
      router.push('/403')
      return null
    }
  }
  return (
    <>
      <HtmlHead
        title={`Meme · ${data && data.memes[0].title ? data.memes[0].title : 'Untitled'}`}
      />
      <Slideshow
        meme={data.memes[0]}
        sort={sort}
        filter={filter}
        yesterday={yesterday}
        template={template}
      />
    </>
  )
}
