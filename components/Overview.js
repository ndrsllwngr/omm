import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { MemeRenderer } from '@/components/MemeRenderer'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroller'

export const Overview = ({ memes, triggerNextMemes, endOfFiles }) => {
  useEffect(() => {
    console.log({ memes })
    console.log({ ENDOFFILES: endOfFiles })
  }, [endOfFiles, memes])
  if (!memes || !(memes.length > 0)) return <div>loading...</div>
  return (
    <>
      {/* // https://github.com/danbovey/react-infinite-scroller */}
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

Overview.propTypes = {
  triggerNextMemes: PropTypes.func,
  endOfFiles: PropTypes.bool,
  memes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.any.isRequired,
      createdBy: PropTypes.string.isRequired,
      upVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
      forkedBy: PropTypes.arrayOf(PropTypes.string),
      forkedFrom: PropTypes.any,
      views: PropTypes.number.isRequired,
      template: PropTypes.shape({
        id: PropTypes.any,
        url: PropTypes.string,
      }).isRequired,
      url: PropTypes.string, // if a real png was created (requirement)
      svg: PropTypes.string.isRequired,
      json: PropTypes.shape({
        background: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        preserveObjectStacking: PropTypes.bool,
        version: PropTypes.string,
        objects: PropTypes.arrayOf(PropTypes.any),
      }).isRequired,
    })
  ),
}
