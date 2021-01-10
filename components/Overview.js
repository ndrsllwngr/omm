import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { MemeRenderer } from '@/components/MemeRenderer'
import Link from 'next/link'
//import InfiniteScroll from 'react-infinite-scroll-component'
import InfiniteScroll from 'react-infinite-scroller'

export const Overview = ({ memes, onClick }) => {
  useEffect(() => {
    console.log({ memes })
  }, [memes])
  if (!memes || !(memes.length > 0)) return <div>loading...</div>
  return (
    <>
      {/* <InfiniteScroll 
        // dataLength={memes.map((meme) => (
        //   <div key={meme.id}>{meme.name}</div>
        // ))} //This is important field to render the next data
        dataLength={memes.length}
        next={onClick}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        scrollThreshold="0.2"
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        // //refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
      >
        <div
          id="infinite"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-center mx-auto justify-content-center"
        >
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
      </InfiniteScroll>*/}
      <InfiniteScroll
        // dataLength={memes.map((meme) => (
        //   <div key={meme.id}>{meme.name}</div>
        // ))} //This is important field to render the next data
        //dataLength={memes.length}
        pageStart={0}
        loadMore={onClick}
        hasMore={true}
        threshold="100"
        loader={<h4>Loading...</h4>}
        // scrollThreshold="0.2"
        // endMessage={
        //   <p style={{ textAlign: 'center' }}>
        //     <b>Yay! You have seen it all</b>
        //   </p>
        // }
        // below props only if you need pull down functionality
        // //refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
      >
        <div
          id="infinite"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-center mx-auto justify-content-center"
        >
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
  onClick: PropTypes.func,
  memes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      template: PropTypes.string,
      created_at: PropTypes.any,
      title: PropTypes.string,
      imgPath: PropTypes.string,
      content: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          x: PropTypes.number,
          y: PropTypes.number,
          width: PropTypes.number,
          height: PropTypes.number,
          text: PropTypes.string,
          rotation: PropTypes.number,
          isDragging: PropTypes.bool,
          fontSize: PropTypes.number,
          fontStyle: PropTypes.string,
          fill: PropTypes.string,
        })
      ),
      images: PropTypes.array,
    })
  ),
}
