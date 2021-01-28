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
import { useSingleMemeContext } from '@/components/context/singlememeContext'
import { useRandomMeme } from '@/components/hooks/useRandomMeme'
import { IconBtn, ToggleIconBtn, ToggleStateIconBtn } from '@/components/ui/Buttons'
import { SingleMeme } from '@/components/SingleMeme'
import { AUTOPLAY_ORDER, VISIBILITY } from '@/lib/constants'
import { IoHelp, IoPlay, IoPause, IoArrowForward, IoArrowBack, IoShuffle } from 'react-icons/io5'
import { gql, useQuery } from '@apollo/client'
import { DIRECTION, getNavigationQueryVariables } from '@/lib/utils'

export const NEXT_MEME = gql`
  query getNextMeme($query: MemeQueryInput, $sortBy: MemeSortByInput) {
    memes(query: $query, sortBy: $sortBy, limit: 1) {
      _id
    }
  }
`

export const PREV_MEME = gql`
  query getPreviousMeme($query: MemeQueryInput, $sortBy: MemeSortByInput) {
    memes(query: $query, sortBy: $sortBy, limit: 1) {
      _id
    }
  }
`

export const Slideshow = ({ meme, sort }) => {
  useEffect(() => {
    console.log({ src: 'Slideshow / PROPS', meme, sort })
  }, [meme, sort])
  const { loading: loadingPrev, error: errorPrev, data: dataPrev } = useQuery(PREV_MEME, {
    variables: getNavigationQueryVariables({ direction: DIRECTION.PREV, meme, sortEnum: sort }),
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  })
  useEffect(() => {
    console.log({ src: 'Slideshow / PREV', dataPrev, errorPrev, loadingPrev })
  }, [dataPrev, errorPrev, loadingPrev])

  const { loading: loadingNext, error: errorNext, data: dataNext } = useQuery(NEXT_MEME, {
    variables: getNavigationQueryVariables({ direction: DIRECTION.NEXT, meme, sortEnum: sort }),
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  })
  useEffect(() => {
    console.log({ src: 'Slideshow / NEXT', dataNext, errorNext, loadingNext })
  }, [dataNext, errorNext, loadingNext])

  if (!meme) return <div className="flex flex-row justify-center">loading..</div>
  return (
    <div className="flex flex-col max-w-md mx-auto">
      <div className="flex flex-row justify-between my-2">
        {meme.visibility === VISIBILITY.PUBLIC && (
          <>
            <SlideshowButton
              name="prev"
              disabled={dataPrev && dataPrev.memes?.length <= 0}
              changeSlide={dataPrev && dataPrev.memes?.length > 0 && dataPrev.memes[0]?._id}
            />

            {/* <div className="flex flex-row">
              <AutoplayRandomButton />
              <AutoplaySortButton />
              <AutoplayActionButton />
            </div>*/}
            <SlideshowButton
              name="next"
              disabled={dataNext && dataNext.memes?.length <= 0}
              changeSlide={dataNext && dataNext.memes?.length > 0 && dataNext.memes[0]?._id}
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

export const AutoplayRandomButton = () => {
  const router = useRouter()
  const { id } = useRandomMeme(router)
  const dispatch = useAutoPlayDispatch()

  const stopAutoplay = () => {
    dispatch({ type: 'falseBool' })
  }
  return (
    <Link href={`/meme/${id}`}>
      <IconBtn onClick={stopAutoplay} className={'mr-2'}>
        <IoHelp size={28} className="fill-current" />
      </IconBtn>
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
  const { nextMeme } = useSingleMemeContext()
  const stopAutoplay = () => {
    dispatch({ type: 'falseBool' })
  }
  const switchAutoplay = () => {
    dispatch({ type: 'toggleBool' })
  }

  return (
    <ToggleStateIconBtn
      disabled={order === AUTOPLAY_ORDER.ORDERED && !(nextMeme && nextMeme.id)}
      className={'rounded-l-none'}
      onClick={
        !nextMeme && order !== AUTOPLAY_ORDER.RANDOM && state.bool ? stopAutoplay : switchAutoplay
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
