import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAutoplay } from '@/components/context/autoplayContext'
import { IconBtn, ToggleIconBtn, ToggleStateIconBtn } from '@/components/ui/Buttons'
import { SingleMeme } from '@/components/SingleMeme'
import { AUTOPLAY_ORDER, VISIBILITY } from '@/lib/constants'
import { IoHelp, IoPlay, IoPause, IoArrowForward, IoArrowBack, IoShuffle } from 'react-icons/io5'
import { gql, useMutation, useQuery } from '@apollo/client'
import { getNavigationQueryVariables } from '@/lib/utils'
import { useViewCount } from '@/components/hooks/useViewCount'
import { memeType, templateType } from '@/components/types/types'
import { Comment, CommentInput } from '@/components/Comment'
import { useAuth } from '@/components/context/authContext'

// Query Meme
const FETCH_MEME = gql`
  query FetchMeme($memeId: ObjectId!, $conditions: String, $sorts: String, $next: Boolean) {
    fetchMeme(input: { meme_id: $memeId, sorts: $sorts, conditions: $conditions, next: $next }) {
      _id
    }
  }
`
// Query a random meme
const FETCH_RANDOM_MEME = gql`
  query FetchRandomMeme($memeId: ObjectId!, $conditions: String) {
    fetchRandomMeme(input: { meme_id: $memeId, conditions: $conditions }) {
      _id
    }
  }
`
const UPDATE_MEME = gql`
  mutation updateMeme($query: MemeQueryInput, $set: MemeUpdateInput!) {
    updateOneMeme(query: $query, set: $set) {
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
      points
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
      url
      views
      visibility
    }
  }
`
/*
Provides all functionality to navigate through the single meme page
 */
export const Slideshow = ({ meme, sort, filter, yesterday, template }) => {
  // Get view count
  const viewCount = useViewCount()
  // Get authorization
  const auth = useAuth()

  const [updateOneMeme] = useMutation(UPDATE_MEME)
  useEffect(() => {
    viewCount.addView(meme._id)
    // Only run once per meme
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { loading: loadingPrev, error: errorPrev, data: dataPrev } = useQuery(FETCH_MEME, {
    variables: {
      ...getNavigationQueryVariables({
        meme,
        sortEnum: sort,
        filterEnum: filter,
        yesterday,
        template: template,
      }),
      next: false,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  })

  const { loading: loadingNext, error: errorNext, data: dataNext } = useQuery(FETCH_MEME, {
    variables: {
      ...getNavigationQueryVariables({
        meme,
        sortEnum: sort,
        filterEnum: filter,
        yesterday,
        template: template,
      }),
      next: true,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  })

  const { data: randomMeme } = useQuery(FETCH_RANDOM_MEME, {
    variables: getNavigationQueryVariables({
      meme,
      sortEnum: sort,
      filterEnum: filter,
      yesterday,
      template: template,
    }),
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    console.log({ src: 'Slideshow / PROPS', meme, sort, filter, yesterday })
    console.log({ src: 'Slideshow / PREV', dataPrev: dataPrev?.fetchMeme, errorPrev, loadingPrev })
    console.log({ src: 'Slideshow / NEXT', dataNext: dataNext?.fetchMeme, errorNext, loadingNext })
  }, [
    meme,
    sort,
    filter,
    dataPrev,
    errorPrev,
    loadingPrev,
    dataNext,
    errorNext,
    loadingNext,
    yesterday,
  ])

  if (!meme) return <div className="flex flex-row justify-center">loading..</div>
  return (
    <div className="flex flex-col max-w-md mx-auto">
      <div className="flex flex-row justify-between my-2">
        {meme.visibility === VISIBILITY.PUBLIC && (
          <>
            <MemeNavigation
              meme={meme}
              prevMeme={dataPrev?.fetchMeme}
              nextMeme={dataNext?.fetchMeme}
              loadingNext={loadingNext}
              randomMeme={randomMeme?.fetchRandomMeme}
              sort={sort}
              filter={filter}
              yesterday={yesterday}
            />
          </>
        )}
      </div>
      <SingleMeme meme={meme} />
      {meme.visibility !== VISIBILITY.PUBLIC &&
        meme.createdBy._id.toString() === auth.getUser()?.id?.toString() && (
          <select
            value={meme.visibility}
            onChange={(e) =>
              updateOneMeme({
                variables: {
                  query: { _id: meme._id },
                  set: { visibility: e.target.value },
                },
              })
                .then((result) => console.log(result))
                .catch((e) => console.error(e))
            }
          >
            <option value={VISIBILITY.PUBLIC}>Public</option>
            <option value={VISIBILITY.UNLISTED}>Unlisted</option>
            <option value={VISIBILITY.PRIVATE}>Private</option>
          </select>
        )}
      <div className={'flex flex-col space-y-2'}>
        {auth.isAuthenticated() && <CommentInput meme={meme} />}
        {meme?.comments.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  )
}

Slideshow.propTypes = {
  meme: memeType,
  sort: PropTypes.string,
  filter: PropTypes.string,
  yesterday: PropTypes.string,
  template: templateType,
}

/*
Navigation to browse through memes
 */
const MemeNavigation = ({ prevMeme, nextMeme, loadingNext, randomMeme }) => {
  // useEffect(() => {
  //   console.log({ src: 'MemeNavigation', meme, prevMeme, nextMeme, randomMeme })
  // }, [meme, prevMeme, nextMeme, randomMeme])
  return (
    <>
      <SlideshowButton
        name="prev"
        disabled={!prevMeme?._id}
        targetMemeId={prevMeme?._id ? prevMeme._id : null}
      />

      <div className="flex flex-row">
        <RandomMemeButton randomMeme={randomMeme} />
        <AutoplaySortButton />
        <AutoplayActionButton
          nextMeme={!loadingNext && nextMeme?._id ? nextMeme : null}
          loadingNext={loadingNext}
          randomMeme={randomMeme}
        />
      </div>
      <SlideshowButton
        name="next"
        disabled={!nextMeme?._id}
        targetMemeId={nextMeme?._id ? nextMeme._id : null}
      />
    </>
  )
}

MemeNavigation.propTypes = {
  meme: memeType,
  prevMeme: memeType,
  nextMeme: memeType,
  loadingNext: PropTypes.bool,
  randomMeme: memeType,
}
/*
Button to navigate to next or previous meme
 */
export const SlideshowButton = ({ name, targetMemeId, disabled }) => {
  // Get router
  const router = useRouter()
  // Get function to disable autoplay
  const { disableAutoplay } = useAutoplay()

  if (targetMemeId === null || disabled)
    return (
      <IconBtn disabled={true}>
        {name === 'prev' ? (
          <IoArrowBack size={28} className={`fill-current`} />
        ) : (
          <IoArrowForward size={28} className={`fill-current`} />
        )}
      </IconBtn>
    )
  return (
    <IconBtn
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault()
        router.push(targetMemeId)
        disableAutoplay()
      }}
    >
      {name === 'prev' ? (
        <IoArrowBack size={28} className={`fill-current`} />
      ) : (
        <IoArrowForward size={28} className={`fill-current`} />
      )}
    </IconBtn>
  )
}

SlideshowButton.propTypes = {
  name: PropTypes.string,
  targetMemeId: PropTypes.string,
  disabled: PropTypes.bool,
}
/*
Button to navigate to a random meme
 */
export const RandomMemeButton = ({ randomMeme }) => {
  // Get function to disable autoplay
  const { disableAutoplay } = useAutoplay()

  if (!randomMeme?._id) {
    return (
      <IconBtn className={'mr-2'} disabled={true}>
        <IoHelp size={28} className="fill-current" />
      </IconBtn>
    )
  }
  return (
    <Link href={`/meme/${randomMeme?._id}`}>
      <a>
        <IconBtn onClick={disableAutoplay} className={'mr-2'}>
          <IoHelp size={28} className="fill-current" />
        </IconBtn>
      </a>
    </Link>
  )
}

RandomMemeButton.propTypes = {
  randomMeme: memeType,
}
/*
Button to change the autoplay order from sequential to random
 */
export const AutoplaySortButton = () => {
  // Get order and function to toggle autoplay order
  const { order, toggleAutoplayOrder } = useAutoplay()
  return (
    <ToggleIconBtn
      type="button"
      onClick={toggleAutoplayOrder}
      className={'rounded-r-none'}
      toggleState={order === AUTOPLAY_ORDER.RANDOM}
    >
      <IoShuffle size={28} className={`fill-current`} />
    </ToggleIconBtn>
  )
}
/*
Button to play or pause autoplay
 */
export const AutoplayActionButton = ({ nextMeme, randomMeme, loadingNext }) => {
  //Get autoplay functions and states
  const {
    order,
    isPlaying,
    disableAutoplay,
    clearTimer,
    triggerNextSlide,
    toggleAutoplay,
  } = useAutoplay()

  useEffect(() => {
    clearTimer()
  }, [clearTimer])

  // useEffect(() => {
  //   console.log({ src: 'AutoplayActionButton', nextMeme, randomMeme, order, isPlaying })
  // }, [nextMeme, randomMeme, order, isPlaying])

  useEffect(() => {
    if (isPlaying) {
      // console.log({
      //   src: 'AutoplayActionButton - useEffect',
      //   order,
      //   nextMeme,
      //   randomMeme,
      //   loadingNext,
      // })
      switch (order) {
        case AUTOPLAY_ORDER.ORDERED:
          if (nextMeme?._id) {
            triggerNextSlide(nextMeme._id)
          } else if (!loadingNext) {
            disableAutoplay()
          }
          break
        case AUTOPLAY_ORDER.RANDOM:
          if (randomMeme?._id) {
            triggerNextSlide(randomMeme?._id)
          }
          break
        default:
          console.log('Unsupported order', order)
      }
    }
  }, [isPlaying, order, nextMeme, randomMeme, triggerNextSlide, disableAutoplay, loadingNext])

  return (
    <ToggleStateIconBtn
      disabled={order === AUTOPLAY_ORDER.ORDERED && !nextMeme?._id}
      className={'rounded-l-none'}
      onClick={() => toggleAutoplay()}
      toggleState={isPlaying}
    >
      {isPlaying ? (
        <IoPause size={28} className="py-1 fill-current" />
      ) : (
        <IoPlay size={28} className="py-1 fill-current" />
      )}
    </ToggleStateIconBtn>
  )
}

AutoplayActionButton.propTypes = {
  nextMeme: memeType,
  randomMeme: memeType,
  loadingNext: PropTypes.bool,
}
