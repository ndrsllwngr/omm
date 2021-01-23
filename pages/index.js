import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { Sort } from '@/components/Sort'
import { SingleMeme } from '@/components/SingleMeme'
import InfiniteScroll from 'react-infinite-scroller'
import { useDatabaseMemes } from '@/components/hooks/useDatabaseMemes'
import { Filter } from '@/components/Filter'

// https://github.com/danbovey/react-infinite-scroller
const LandingPage = () => {
  return (
    <>
      <HtmlHead />
      <Navbar />
      <div className={'max-w-7xl mx-auto mt-4'}>
        <Filter />
        <Sort enableNotification={true} />
        <LandingPageInner />
      </div>
    </>
  )
}

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
}

// // Fetch data at build time
// export async function getStaticProps() {
//   // Fetch data from external API
//   const memes = await getImgFlipMemes()
//   // Pass data as parameter
//   return { props: { memes } }
// }

export default LandingPage
