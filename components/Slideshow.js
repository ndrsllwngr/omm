import React from 'react'
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
import { SingleMeme } from '@/components/SingleMeme'
import { AUTOPLAY_ORDER, VISIBILITY } from '@/lib/constants'
import { IoHelp, IoPlay, IoPause, IoArrowForward, IoArrowBack, IoShuffle } from 'react-icons/io5'

export const Slideshow = () => {
  const {
    currentMeme: meme,
    nextMeme,
    prevMeme,
    updateCurrent: updateMeme,
  } = useSingleMemeContext()

  if (!meme) return <div className="flex flex-row justify-center">loading..</div>
  return (
    <div className="flex flex-col max-w-md mx-auto">
      <div className="flex flex-row justify-between my-2">
        {meme.visibility === VISIBILITY.PUBLIC && (
          <>
            <SlideshowButton
              name="prev"
              disabled={!(prevMeme && prevMeme.id)}
              changeSlide={prevMeme && prevMeme.id}
            />

            <div className="flex flex-row">
              <AutoplayRandomButton />
              <AutoplaySortButton />
              <AutoplayActionButton />
            </div>

            <SlideshowButton
              name="next"
              disabled={!(nextMeme && nextMeme.id)}
              changeSlide={nextMeme && nextMeme.id}
            />
          </>
        )}
      </div>
      <SingleMeme meme={meme} updateMeme={updateMeme} />
    </div>
  )
}

export const AutoplayActionButton = () => {
  const [state, dispatch] = useAutoPlayContext()
  const { order } = useAutoPlayOrder()
  const { nextMeme } = useSingleMemeContext()

  return (
    <button
      disabled={order === AUTOPLAY_ORDER.ORDERED && !(nextMeme && nextMeme.id)}
      className={`p-2 rounded-r bg-custom-gray ${
        order === AUTOPLAY_ORDER.ORDERED && !(nextMeme && nextMeme.id) ? 'cursor-not-allowed' : ''
      }`}
      onClick={
        !nextMeme && order !== AUTOPLAY_ORDER.RANDOM && state.bool
          ? () => dispatch({ type: 'falseBool' })
          : () => dispatch({ type: 'toggleBool' })
      }
    >
      {state.bool ? (
        <IoPause size={28} className="fill-current text-custom-green py-1" />
      ) : (
        <IoPlay
          size={28}
          className={`py-1 fill-current ${
            order === AUTOPLAY_ORDER.ORDERED && !(nextMeme && nextMeme.id)
              ? 'text-gray-400'
              : 'text-custom-green'
          } `}
        />
      )}
    </button>
  )
}

export const AutoplayRandomButton = () => {
  const router = useRouter()
  const { id } = useRandomMeme(router)
  return (
    <Link href={`/meme/${id}`}>
      <a
        className="flex flex-col p-2 mr-2 justify-center rounded-md bg-custom-gray  "
        onClick={() => dispatch({ type: 'falseBool' })}
      >
        <IoHelp size={28} className="fill-current text-custom-green" />
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
    <button
      type="button"
      className="px-4 items-center bg-custom-gray rounded-l"
      id="options-menu"
      aria-haspopup="true"
      aria-expanded="true"
      onClick={changeAutoplayOrder}
    >
      <IoShuffle
        size={28}
        className={
          order === AUTOPLAY_ORDER.RANDOM
            ? `fill-current text-custom-green`
            : `fill-current text-gray-400`
        }
      />
    </button>
  )
}

export const SlideshowButton = ({ name, changeSlide, disabled }) => {
  const router = useRouter()
  const dispatch = useAutoPlayDispatch()
  return (
    <button
      disabled={disabled}
      className={`p-2 rounded bg-custom-gray ${
        disabled ? 'text-gray-400 cursor-not-allowed' : 'text-custom-green'
      }`}
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
    </button>
  )
}
SlideshowButton.propTypes = {
  name: PropTypes.string,
  changeSlide: PropTypes.string,
  disabled: PropTypes.bool,
}
