import React from 'react'
import PropTypes from 'prop-types'
import { MemeRenderer } from '@/components/MemeRenderer'
import { useFabricJson } from '@/components/context/fabricContext'
import { useRouter } from 'next/router'
import { useVoting } from '@/components/hooks/useVoting'
import { VOTE } from '@/lib/constants'
import Link from 'next/link'
import moment from 'moment'
import { IoCaretDownOutline, IoCaretUpOutline } from 'react-icons/io5'
import { memeType } from '@/components/types/types'

export const SingleMeme = ({ meme, enableLink, updateMemes, updateMeme }) => {
  const { setJson } = useFabricJson()
  const router = useRouter()
  const { upVote, downVote, getVoteState, getTotalPoints } = useVoting({ updateMemes, updateMeme })

  return (
    <div className="flex-col max-w-md">
      <p className={'uppercase text-xs text-gray-600 dark:text-gray-300 font-medium'}>
        {typeof meme.createdAt !== 'object'
          ? moment(meme.createdAt).fromNow()
          : moment(meme.createdAt.toMillis()).fromNow()}
      </p>
      {enableLink ? (
        <Link href={`/meme/${meme.id}`}>
          <a>
            <h1 className={'text-lg font-bold text-black dark:text-white truncate'}>
              {meme.title ? meme.title : 'Untitled'}
            </h1>
          </a>
        </Link>
      ) : (
        <a>
          <h1 className={'text-lg font-bold text-black dark:text-white truncate'}>
            {meme.title ? meme.title : 'Untitled'}
          </h1>
        </a>
      )}

      {enableLink ? (
        <Link href={`/meme/${meme.id}`}>
          <a>
            <MemeRenderer meme={meme} />
          </a>
        </Link>
      ) : (
        <MemeRenderer meme={meme} />
      )}
      <div className={'flex justify-between items-center'}>
        <button
          className={'text-black dark:text-white'}
          onClick={() => {
            setJson(meme)
            router.push('/create')
          }}
        >
          Copy Meme
        </button>
        <div className={'flex space-x-1 justify-center items-center mt-1'}>
          <p className={'text-black dark:text-white text-center text-sm'}>
            {getTotalPoints(meme)} point{Math.abs(getTotalPoints(meme)) !== 1 && 's'} · {meme.views}{' '}
            view{Math.abs(meme.views) !== 1 && 's'}
          </p>
          <button
            className={`inline-flex self-center block rounded px-1 py-1 ${
              getVoteState(meme) === VOTE.up
                ? 'text-custom-green border-custom-green'
                : 'text-black dark:text-white dark:border-white'
            }`}
            disabled={getVoteState(meme) === VOTE.up}
            onClick={() => upVote(meme)}
          >
            <IoCaretUpOutline className={'fill-current inline-flex self-center'} />
          </button>
          <button
            className={`inline-flex self-center block rounded px-1 py-1 ${
              getVoteState(meme) === VOTE.down
                ? 'text-red-500 border-red-500'
                : 'text-black dark:text-white dark:border-white'
            }`}
            disabled={getVoteState(meme) === VOTE.down}
            onClick={() => downVote(meme)}
          >
            <IoCaretDownOutline className={'fill-current inline-flex self-center'} />
          </button>
        </div>
      </div>
    </div>
  )
}

SingleMeme.propTypes = {
  enableLink: PropTypes.bool,
  updateMemes: PropTypes.func,
  updateMeme: PropTypes.func,
  meme: memeType,
}
