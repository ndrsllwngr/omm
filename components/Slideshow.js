import React from 'react'
import PropTypes from 'prop-types'
import { SingleMeme } from '@/components/SingleMeme'
import { useRouter } from 'next/router'
import {
  useAutoPlayContext,
  useAutoPlayDispatch,
  useAutoPlayOrder,
} from '@/components/context/autoplayContext'
import { useSingleMemeContext } from '@/components/context/singlememeContext'
import { AUTOPLAY_ORDER, VISIBILITY } from '@/lib/constants'
import Link from 'next/link'
import { AutoplaySort } from '@/components/AutoplaySort'
import { useRandomMeme } from '@/components/hooks/useRandomMeme'
import { IoHelp, IoPlay, IoPause } from 'react-icons/io5'

export const Slideshow = () => {
  const {
    currentMeme: meme,
    nextMeme,
    prevMeme,
    updateCurrent: updateMeme,
  } = useSingleMemeContext()
  const router = useRouter()
  const [state, dispatch] = useAutoPlayContext()
  const { order } = useAutoPlayOrder()
  const { id } = useRandomMeme(router)

  if (!meme) return <div className="flex flex-row justify-center">loading..</div>
  return (
    <div className="flex flex-col justify-center max-w-md mx-auto">
      <div className="flex flex-row justify-between my-2">
        {meme.visibility === VISIBILITY.PUBLIC && (
          <>
            <SlideshowButton
              name="prev"
              disabled={!(prevMeme && prevMeme.id)}
              changeSlide={prevMeme && prevMeme.id}
            />

            <div className="flex flex-row font-semibold text-xl text-white">
              <Link href={`/meme/${id}`}>
                <a
                  className="bg-custom-gray rounded-md mr-2 p-2 flex flex-col justify-center"
                  onClick={() => dispatch({ type: 'falseBool' })}
                >
                  <IoHelp size={28} className="fill-current text-custom-green" />
                </a>
              </Link>
              {meme.visibility === VISIBILITY.PUBLIC && (
                <div className="flex flex-row">
                  <AutoplaySort />
                  <button
                    disabled={order === AUTOPLAY_ORDER.ORDERED && !(nextMeme && nextMeme.id)}
                    className={`p-2 rounded-r bg-custom-gray ${
                      order === AUTOPLAY_ORDER.ORDERED && !(nextMeme && nextMeme.id)
                        ? 'cursor-not-allowed'
                        : ''
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
                </div>
              )}
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

export const SlideshowButton = ({ name, changeSlide, disabled }) => {
  const router = useRouter()
  const dispatch = useAutoPlayDispatch()
  return (
    <button
      disabled={disabled}
      className={`rounded-lg  ${
        disabled ? '' : 'bg-custom-gray hover:bg-custom-green hover:stroke-gray'
      } `}
      onClick={(e) => {
        e.preventDefault()
        router.push(changeSlide)
        dispatch({ type: 'falseBool' })
      }}
    >
      <svg
        className={`w-12 h-12 py-2 px-2 ${
          disabled ? 'stroke-gray cursor-not-allowed' : 'stroke-green hover:stroke-gray'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        {name === 'prev' ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        )}
      </svg>
    </button>
  )
}
SlideshowButton.propTypes = {
  name: PropTypes.string,
  changeSlide: PropTypes.string,
  disabled: PropTypes.bool,
}
