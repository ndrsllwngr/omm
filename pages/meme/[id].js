import React, { useEffect } from 'react'
import { Slideshow } from '@/components/Slideshow'
import { Navbar } from '@/components/Navbar'
import { Sort } from '@/components/Sort'
import { HtmlHead } from '@/components/HtmlHead'
import { useSortContext } from '@/components/context/viewsContext'
import { gql, NetworkStatus, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { VISIBILITY } from '@/lib/constants'
import { ProtectedRoute, useAuth } from '@/components/context/authContext'

export default function SingleView() {
  return (
    <>
      <Navbar />
      <div className={'max-w-7xl mx-auto mt-4'}>
        <Sort
        /*callback={() => {
            setPrev(null)
            setNext(null)
          }}*/
        />
        <SingleViewInner />
      </div>
    </>
  )
}

export const CURRENT_MEME = gql`
  query getCurrentMeme($meme: ObjectId) {
    memes(query: { _id: $meme }) {
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

// eslint-disable-next-line react/prop-types
const SingleViewInner = () => {
  /*const { currentMeme, setNext, setPrev } = useSingleMemeContext()
  useSingleMeme()*/
  const auth = useAuth()
  const router = useRouter()
  const { sort } = useSortContext()
  // TODO verify that user has permission to view this meme
  // TODO increment viewCount
  // TODO set next and prev null? is this still needed?
  const { loading, error, data, networkStatus } = useQuery(CURRENT_MEME, {
    variables: { meme: router.query.id },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const loadingMoreMemes = networkStatus === NetworkStatus.fetchMore

  useEffect(() => {
    console.log({ src: 'LandingPageInner', data, error, loading })
  }, [data, error, loading])

  if (error) return <div>Error loading memes.</div>
  if (loading && !loadingMoreMemes)
    return (
      <>
        <HtmlHead title={'Meme · Loading... '} />
        <div>Loading...</div>
      </>
    )
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
      <Slideshow meme={data.memes[0]} sort={sort} />
    </>
  )
}
