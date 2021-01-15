import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { OverviewSort } from '@/components/OverviewSort'
import Link from 'next/link'
import { SingleMeme } from '@/components/SingleMeme'
import InfiniteScroll from 'react-infinite-scroller'
import { useDatabaseMemes } from '@/components/hooks/useDatabaseMemes'

// https://github.com/danbovey/react-infinite-scroller
const LandingPage = () => {
  const { dbMemes: memes, triggerNextMemes, endOfFiles } = useDatabaseMemes()
  return (
    <>
      <HtmlHead />
      <Navbar />
      <div className={'max-w-7xl mx-auto mt-4'}>
        <OverviewSort />
        <InfiniteScroll
          pageStart={0}
          loadMore={triggerNextMemes}
          hasMore={endOfFiles}
          threshold={100}
          loader={<h4 key="1">Loading...</h4>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-2 px-4 py-4 sm:px-6 sm:py-12 lg:px-0"
        >
          {memes.map((meme, i) => (
            <div key={i} className="place-self-center justify-self-center">
              <SingleMeme meme={meme} enableLink={true} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
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
