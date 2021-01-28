import React, { useEffect } from 'react'
import { Slideshow } from '@/components/Slideshow'
import { Navbar } from '@/components/Navbar'
import { Sort } from '@/components/Sort'
import { HtmlHead } from '@/components/HtmlHead'
import { useSortContext } from '@/components/context/viewsContext'
import { gql, NetworkStatus, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

export default function SingleView() {
  const { sort } = useSortContext()
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
        <SingleViewInner sort={sort} />
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
const SingleViewInner = ({ sort }) => {
  /*const { currentMeme, setNext, setPrev } = useSingleMemeContext()
  useSingleMeme()*/
  const router = useRouter()
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
  return (
    <>
      <HtmlHead
        title={`Meme · ${data && data.memes[0].title ? data.memes[0].title : 'Untitled'}`}
      />
      <Slideshow meme={data.memes[0]} />
    </>
  )
}
