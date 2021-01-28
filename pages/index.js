import React, { useEffect } from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { Sort } from '@/components/Sort'
import { SingleMeme } from '@/components/SingleMeme'
// import InfiniteScroll from 'react-infinite-scroller'
import { gql, NetworkStatus, useQuery } from '@apollo/client'
import { useSortContext } from '@/components/context/viewsContext'
import { SORT } from '@/lib/constants'

// https://github.com/danbovey/react-infinite-scroller
const LandingPage = () => {
  const { sort } = useSortContext()
  return (
    <>
      <HtmlHead />
      <Navbar />
      <div className={'max-w-7xl mx-auto mt-4'}>
        <Sort enableNotification={false} />
        <LandingPageInner sort={sort} />
      </div>
    </>
  )
}

export const ALL_PUBLIC_MEMES_QUERY = gql`
  query getAllPublicMemes($sortBy: MemeSortByInput) {
    memes(query: { visibility: "PUBLIC" }, sortBy: $sortBy) {
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

const translateSort = (sortEnum) => {
  switch (sortEnum) {
    case SORT.LATEST:
      return 'CREATEDAT_DESC'
    case SORT.OLDEST:
      return 'CREATEDAT_ASC'
    case SORT.MOST_VIEWED:
      return 'VIEWS_DESC'
    case SORT.LEAST_VIEWED:
      return 'VIEWS_ASC'
    case SORT.LEAST_POINTS:
      // TODO
      return 'CREATEDAT_DESC'
    case SORT.MOST_POINTS:
      // TODO
      return 'CREATEDAT_DESC'
    default:
      console.error('sortEnum not supported', sortEnum)
  }
}

// eslint-disable-next-line react/prop-types
const LandingPageInner = ({ sort }) => {
  const { loading, error, data, networkStatus } = useQuery(ALL_PUBLIC_MEMES_QUERY, {
    variables: { sortBy: translateSort(sort) },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const loadingMoreMemes = networkStatus === NetworkStatus.fetchMore

  useEffect(() => {
    console.log({ src: 'LandingPageInner', data, error, loading })
  }, [data, error, loading])

  if (error) return <div>Error loading memes.</div>
  if (loading && !loadingMoreMemes) return <div>Loading</div>

  // TODO add InfiniteScroll or pagination
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-2 px-4 py-4 sm:px-6 sm:py-12 lg:px-0">
      {data &&
        data.memes.map((meme, index) => (
          <div key={index} className="place-self-center justify-self-center">
            <SingleMeme meme={meme} enableLink={true} />
          </div>
        ))}
    </div>
  )
}

/*const LandingPageInner = () => {
  const { dbMemes: memes, triggerNextMemes, endOfFiles, updateMemes } = useDatabaseMemes()
  if (!memes || !(memes.length > 0))
    return <div className={'text-black dark:text-white'}>loading...</div>
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={triggerNextMemes}
      hasMore={endOfFiles}
      threshold={100}
      loader={<h4 key="1">Loading...</h4>}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-2 px-4 py-4 sm:px-6 sm:py-12 lg:px-0"
    >
      {memes.map((meme) => (
        <div key={meme.id} className="place-self-center justify-self-center">
          <SingleMeme meme={meme} enableLink={true} updateMemes={updateMemes} />
        </div>
      ))}
    </InfiniteScroll>
  )
}*/

// // Fetch data at build time
// export async function getStaticProps() {
//   // Fetch data from external API
//   const memes = await getImgFlipMemes()
//   // Pass data as parameter
//   return { props: { memes } }
// }

export default LandingPage
