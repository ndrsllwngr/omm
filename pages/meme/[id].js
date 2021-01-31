import React, { useEffect } from 'react'
import { Slideshow } from '@/components/Slideshow'
import { Navbar } from '@/components/Navbar'
import { Sort } from '@/components/Sort'
import { HtmlHead } from '@/components/HtmlHead'
import { useFilterContext, useSortContext } from '@/components/context/viewsContext'
import { gql, NetworkStatus, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { VISIBILITY } from '@/lib/constants'
import { useAuth } from '@/components/context/authContext'
import {
  useSingleMemeContext,
  useSingleMemeLoadingContext,
} from '@/components/context/singlememeContext'
import { Filter } from '@/components/Filter'

export default function SingleView() {
  return (
    <>
      <Navbar />
      <div className={'max-w-7xl mx-auto mt-4'}>
        <div className={'flex flex-row justify-end'}>
          <Filter />
          <Sort enableNotification={false} />
        </div>
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
  const auth = useAuth()
  const router = useRouter()
  const { sort } = useSortContext()
  const { filter, yesterday } = useFilterContext()
  const { updateCurrent } = useSingleMemeContext()
  const { setCurrentIsLoading } = useSingleMemeLoadingContext()
  // TODO increment viewCount @Andy
  // TODO set next and prev null? is this still needed?
  const { loading, error, data, networkStatus } = useQuery(CURRENT_MEME, {
    variables: { meme: router.query.id },
    notifyOnNetworkStatusChange: false,
  })

  useEffect(() => {
    setCurrentIsLoading(true)
  }, [])

  const loadingMoreMemes = networkStatus === NetworkStatus.fetchMore

  useEffect(() => {
    console.log({ src: 'LandingPageInner', data, error, loading })
    updateCurrent(() => (data && data.memes[0] !== null ? data.memes[0] : null))
    setCurrentIsLoading(loading)
  }, [data, error, loading, updateCurrent, setCurrentIsLoading])

  if (error) return <div>Error loading memes.</div>
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
      <Slideshow meme={data.memes[0]} sort={sort} filter={filter} yesterday={yesterday} />
    </>
  )
}
