import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { SingleMeme } from '@/components/SingleMeme'
// import InfiniteScroll from 'react-infinite-scroller'
import { gql, NetworkStatus, useQuery } from '@apollo/client'
import { useFilterContext, useSortContext } from '@/components/context/viewsContext'
import { translateFilter, translateSort } from '@/lib/utils'
import { FilterSection } from '@/components/FilterSection'

/*
Landing page (Overview)
 */
// https://dzone.com/articles/fast-paging-with-mongodb
const LandingPage = () => {
  //Loading sorting information from context
  const { sort } = useSortContext()
  //Loading filter information from context
  const { filter, yesterday, template } = useFilterContext()
  return (
    <>
      <HtmlHead />
      <Navbar />
      <div className={'max-w-7xl mx-auto mt-4'}>
        <FilterSection />
        <LandingPageInner sort={sort} filter={filter} yesterday={yesterday} template={template} />
      </div>
    </>
  )
}
//Query to load all public memes with given filter and sort parameter
export const ALL_PUBLIC_MEMES_QUERY = gql`
  query getAllPublicMemes($query: MemeQueryInput, $sortBy: MemeSortByInput) {
    memes(query: $query, sortBy: $sortBy) {
      _id
      commentCount
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

// eslint-disable-next-line react/prop-types
const LandingPageInner = ({ sort, filter, yesterday, template }) => {
  //Query data from Database
  const { loading, error, data, networkStatus } = useQuery(ALL_PUBLIC_MEMES_QUERY, {
    variables: {
      query: translateFilter({ filterEnum: filter, yesterday, template }),
      sortBy: translateSort(sort),
    },
    notifyOnNetworkStatusChange: true,
  })
  const loadingMoreMemes = networkStatus === NetworkStatus.fetchMore

  /*
  useEffect(() => {
    console.log({ src: 'LandingPageInner', data, error, loading })
  }, [data, error, loading])

   */

  if (error) {
    console.error(error)
    return <div>Error loading memes.</div>
  }
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

/*
  // https://github.com/danbovey/react-infinite-scroller
  const LandingPageInner = () => {
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
