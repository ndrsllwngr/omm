import React from 'react'
import PropTypes from 'prop-types'
import { MemeRenderer } from '@/components/MemeRenderer'
import { useFabricJson } from '@/components/context/fabricContext'
import { useRouter } from 'next/router'
import { useVoting } from '@/components/hooks/useVoting'
import { VISIBILITY, VOTE } from '@/lib/constants'
import Link from 'next/link'
import formatDistance from 'date-fns/formatDistance'
import { IoCaretDownOutline, IoCaretUpOutline } from 'react-icons/io5'
import { memeType } from '@/components/types/types'
import { ShareButtons } from '@/components/ui/ShareButtons'
import { TertiaryBtn, VoteDownBtn, VoteUpBtn } from '@/components/ui/Buttons'

export const SingleMeme = ({ meme, enableLink }) => {
  const { setJson } = useFabricJson()
  const router = useRouter()
  const { upVote, downVote, getVoteState } = useVoting()
  return (
    <div className="flex-col max-w-md">
      <p className={'uppercase text-xs text-gray-600 dark:text-gray-300 font-medium'}>
        {formatDistance(new Date(meme.createdAt), new Date(), { addSuffix: true })}
        {meme.visibility && meme.visibility !== VISIBILITY.PUBLIC && (
          <span> - {meme.visibility}</span>
        )}
      </p>
      {enableLink ? (
        <Link href={`/meme/${meme._id}`}>
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
        <Link href={`/meme/${meme._id}`}>
          <a>
            <MemeRenderer meme={meme} />
          </a>
        </Link>
      ) : (
        <MemeRenderer meme={meme} />
      )}

      <ShareButtons id={meme._id} />
      <div className={'flex justify-between items-center'}>
        <TertiaryBtn
          onClick={() => {
            setJson(meme)
            router.push('/create')
          }}
        >
          Copy Meme
        </TertiaryBtn>
        <div className={'flex space-x-1 justify-center items-center mt-1'}>
          <p className={'text-black dark:text-white text-center text-sm'}>
            {meme.points} point{Math.abs(meme.points) !== 1 && 's'} · {meme.views} view
            {Math.abs(meme.views) !== 1 && 's'} · {meme.commentCount} comment
            {Math.abs(meme.commentCount) !== 1 && 's'}
          </p>
          <VoteUpBtn disabled={getVoteState(meme) === VOTE.up} onClick={() => upVote(meme)}>
            <IoCaretUpOutline size={22} className={'fill-current inline-flex self-center'} />
          </VoteUpBtn>
          <VoteDownBtn disabled={getVoteState(meme) === VOTE.down} onClick={() => downVote(meme)}>
            <IoCaretDownOutline size={22} className={'fill-current inline-flex self-center'} />
          </VoteDownBtn>
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
