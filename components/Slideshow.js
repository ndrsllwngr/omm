/* eslint-disable  react/prop-types */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  useAutoPlayContext,
  useAutoPlayDispatch,
  useAutoPlayOrder,
} from '@/components/context/autoplayContext'
import {
  useSingleMemeContext,
  useSingleMemeLoadingContext,
} from '@/components/context/singlememeContext'
import { IconBtn, ToggleIconBtn, ToggleStateIconBtn } from '@/components/ui/Buttons'
import { SingleMeme } from '@/components/SingleMeme'
import { AUTOPLAY_ORDER, VISIBILITY } from '@/lib/constants'
import { IoHelp, IoPlay, IoPause, IoArrowForward, IoArrowBack, IoShuffle } from 'react-icons/io5'
import { gql, useQuery } from '@apollo/client'
import { getNavigationQueryVariables } from '@/lib/utils'
import { useViewCount } from '@/components/hooks/useViewCount'

const FETCH_MEME = gql`
  query FetchMeme($memeId: ObjectId!, $conditions: String, $sorts: String, $next: Boolean) {
    fetchMeme(input: { meme_id: $memeId, sorts: $sorts, conditions: $conditions, next: $next }) {
      _id
    }
  }
`

const FETCH_RANDOM_MEME = gql`
  query FetchRandomMeme($memeId: ObjectId!, $conditions: String) {
    fetchRandomMeme(input: { meme_id: $memeId, conditions: $conditions }) {
      _id
    }
  }
`

export const Slideshow = ({ meme, sort, filter, yesterday }) => {
  const viewCount = useViewCount()
  const { setPrev, setNext } = useSingleMemeContext()
  const { setPrevIsLoading, setNextIsLoading } = useSingleMemeLoadingContext()

  useEffect(() => {
    viewCount.addView(meme._id)
    setPrevIsLoading(true)
    setNextIsLoading(true)
    // Only run once per meme
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log({ src: 'Slideshow / PROPS', meme, sort })
  }, [meme, sort])

  const { loading: loadingPrev, error: errorPrev, data: dataPrev } = useQuery(FETCH_MEME, {
    variables: {
      ...getNavigationQueryVariables({ meme, sortEnum: sort, filterEnum: filter, yesterday }),
      next: false,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    console.log({ src: 'Slideshow / PREV', dataPrev, errorPrev, loadingPrev })
    setPrev(dataPrev && dataPrev.fetchMeme !== null ? dataPrev.fetchMeme : null)
    setPrevIsLoading(loadingPrev)
  }, [dataPrev, errorPrev, loadingPrev, setPrev, setPrevIsLoading])

  const { loading: loadingNext, error: errorNext, data: dataNext } = useQuery(FETCH_MEME, {
    variables: {
      ...getNavigationQueryVariables({ meme, sortEnum: sort, filterEnum: filter, yesterday }),
      next: true,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    console.log({ src: 'Slideshow / NEXT', dataNext, errorNext, loadingNext })
    setNext(dataNext && dataNext.fetchMeme !== null ? dataNext.fetchMeme : null)
    setNextIsLoading(loadingNext)
  }, [dataNext, errorNext, loadingNext, setNext, setNextIsLoading])

  if (!meme) return <div className="flex flex-row justify-center">loading..</div>
  return (
    <div className="flex flex-col max-w-md mx-auto">
      <div className="flex flex-row justify-between my-2">
        {meme.visibility === VISIBILITY.PUBLIC && (
          <>
            <SlideshowButton
              name="prev"
              disabled={dataNext && dataNext.fetchMeme === null}
              changeSlide={dataNext && dataNext.fetchMeme && dataNext.fetchMeme?._id}
            />

            <div className="flex flex-row">
              <AutoplayRandomButton meme={meme} sort={sort} filter={filter} yesterday={yesterday} />
              <AutoplaySortButton />
              <AutoplayActionButton />
            </div>
            <SlideshowButton
              name="next"
              disabled={dataPrev && dataPrev.fetchMeme === null}
              changeSlide={dataPrev && dataPrev.fetchMeme && dataPrev.fetchMeme?._id}
            />
          </>
        )}
      </div>
      <SingleMeme meme={meme} />
    </div>
  )
}
export const SlideshowButton = ({ name, changeSlide, disabled }) => {
  const router = useRouter()
  const dispatch = useAutoPlayDispatch()
  useEffect(() => {
    console.log({ src: 'SlideshowButton / PROPS', name, changeSlide, disabled })
  }, [name, changeSlide, disabled])
  if (changeSlide === null || disabled)
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
        router.push(changeSlide)
        dispatch({ type: 'falseBool' })
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

export const AutoplayRandomButton = ({ meme, sort, filter, yesterday }) => {
  const dispatch = useAutoPlayDispatch()
  const { data } = useQuery(FETCH_RANDOM_MEME, {
    variables: getNavigationQueryVariables({ meme, sortEnum: sort, filterEnum: filter, yesterday }),
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  })

  const stopAutoplay = () => {
    dispatch({ type: 'falseBool' })
  }
  if (data === null || (data && data.fetchRandomMeme?._id === undefined))
    return (
      <IconBtn className={'mr-2'} disabled={true}>
        <IoHelp size={28} className="fill-current" />
      </IconBtn>
    )
  return (
    <Link href={`/meme/${data && data.fetchRandomMeme?._id}`}>
      <a>
        <IconBtn onClick={stopAutoplay} className={'mr-2'}>
          <IoHelp size={28} className="fill-current" />
        </IconBtn>
      </a>
    </Link>
  )
}

export const AutoplaySortButton = () => {
  const { order, setOrder } = useAutoPlayOrder()

  const changeAutoplayOrder = () => {
    order === AUTOPLAY_ORDER.RANDOM
      ? setOrder(AUTOPLAY_ORDER.ORDERED)
      : setOrder(AUTOPLAY_ORDER.RANDOM)
  }

  return (
    <ToggleIconBtn
      type="button"
      onClick={changeAutoplayOrder}
      className={'rounded-r-none'}
      toggleState={order === AUTOPLAY_ORDER.RANDOM}
    >
      <IoShuffle size={28} className={`fill-current`} />
    </ToggleIconBtn>
  )
}
export const AutoplayActionButton = () => {
  const [state, dispatch] = useAutoPlayContext()
  const { order } = useAutoPlayOrder()
  const { prevMeme } = useSingleMemeContext()
  const stopAutoplay = () => {
    dispatch({ type: 'falseBool' })
  }
  const switchAutoplay = () => {
    dispatch({ type: 'toggleBool' })
  }

  return (
    <ToggleStateIconBtn
      disabled={order === AUTOPLAY_ORDER.ORDERED && !(prevMeme && prevMeme._id)}
      className={'rounded-l-none'}
      onClick={
        !prevMeme && order !== AUTOPLAY_ORDER.RANDOM && state.bool ? stopAutoplay : switchAutoplay
      }
      toggleState={state.bool}
    >
      {state.bool ? (
        <IoPause size={28} className="py-1 fill-current" />
      ) : (
        <IoPlay size={28} className="py-1 fill-current" />
      )}
    </ToggleStateIconBtn>
  )
}

SlideshowButton.propTypes = {
  name: PropTypes.string,
  changeSlide: PropTypes.string,
  disabled: PropTypes.bool,
}
