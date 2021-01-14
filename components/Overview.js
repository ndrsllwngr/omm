import React from 'react'
import { MemeRenderer } from '@/components/MemeRenderer'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroller'
import { useDatabaseMemes } from '@/components/hooks/useDatabaseMemes'
{
  /* // https://github.com/danbovey/react-infinite-scroller */
}
export const Overview = () => {
  const { dbMemes: memes, triggerNextMemes, endOfFiles } = useDatabaseMemes()
  if (!memes || !(memes.length > 0)) return <div>loading...</div>
  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={triggerNextMemes}
        hasMore={endOfFiles}
        threshold={100}
        loader={<h4 key="1">Loading...</h4>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-center mx-auto justify-content-center">
          {memes.map((el, i) => (
            <Link
              key={i}
              href={`/meme/${el.id}`}
              className="relative w-24 h-24 bg-white overflow-hidden place-self-center justify-self-center"
            >
              <a>
                <MemeRenderer meme={el} />
              </a>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </>
  )
}
