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

export const SingleMeme = ({ meme, enableLink }) => {
  const { setJson } = useFabricJson()
  const router = useRouter()
  const { upVote, downVote, voteState } = useVoting(meme)
  return (
    <div className="flex-col max-w-md">
      <p className={'uppercase text-xs text-gray-600 dark:text-gray-300 font-medium'}>
        {moment(meme.createdAt.toMillis()).fromNow()}
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
        <div className={'flex space-x-1 mt-1'}>
          <button
            className={`rounded px-1 py-1 text-black ${
              voteState === VOTE.up ? 'bg-green-100' : 'bg-green-500'
            }`}
            disabled={voteState === VOTE.up}
            onClick={upVote}
          >
            <IoCaretUpOutline className={'fill-current'} />
          </button>
          <button
            className={`rounded px-1 py-1 text-black ${
              voteState === VOTE.down ? 'bg-red-100' : 'bg-red-500'
            }`}
            disabled={voteState === VOTE.down}
            onClick={downVote}
          >
            <IoCaretDownOutline className={'fill-current'} />
          </button>
        </div>
      </div>
    </div>
  )
}

SingleMeme.propTypes = {
  enableLink: PropTypes.bool,
  meme: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
  }),
}
