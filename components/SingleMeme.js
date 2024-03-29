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
import { useAuth } from '@/components/context/authContext'
import { TextToSpeech } from '@/components/TextToSpeech'
import { MemeDetails } from '@/components/MemeDetails'
import { DownloadMeme } from '@/components/DownloadMeme'

export const SingleMeme = ({ meme, enableLink }) => {
  //Get authentication
  const auth = useAuth()
  const { setJson } = useFabricJson()
  //Get Next Router
  const router = useRouter()
  //Get Votes
  const { upVote, downVote, getVoteState } = useVoting()
  return (
    <div className="flex-col max-w-md">
      <p className={'uppercase text-xs text-gray-600 dark:text-gray-300 font-medium'}>
        {formatDistance(new Date(meme.createdAt), new Date(), { addSuffix: true })}
        {meme.visibility && meme.visibility !== VISIBILITY.PUBLIC && (
          <span> - {meme.visibility}</span>
        )}
      </p>
      <div className={'flex flex-row flex-wrap items-start'}>
        {enableLink ? (
          <>
            <Link href={`/meme/${meme._id}`}>
              <a>
                <h1 className={'text-lg font-bold text-black dark:text-white truncate'}>
                  {meme.title}
                </h1>
              </a>
            </Link>
            <TextToSpeech
              value={[
                'You are viewing a meme on the landing page.',
                'Its title is',
                meme.title,
                'The meme contains an image which can be described as',
                meme.template?.name,
                'It contains the following captions',
                meme.captions,
              ].join(',')}
            />
          </>
        ) : (
          <>
            <h1 className={'text-lg font-bold text-black dark:text-white truncate'}>
              {meme.title}
            </h1>
            <div className={'flex flex-row'}>
              <TextToSpeech
                value={[
                  'You are viewing a meme on the single view page.',
                  'Its title is',
                  meme.title,
                  'The meme contains an image which can be described as',
                  meme.template?.name,
                  'It contains the following captions',
                  meme.captions,
                ].join(',')}
              />
              <MemeDetails memeId={meme._id} />
              <DownloadMeme meme={meme} />
            </div>
          </>
        )}
      </div>

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
        {auth.isAuthenticated() && (
          <TertiaryBtn
            onClick={() => {
              setJson(meme)
              router.push('/create')
            }}
          >
            Copy Meme
          </TertiaryBtn>
        )}
        <div className={'flex space-x-1 justify-center items-center mt-1'}>
          <p className={'text-black dark:text-white text-center text-sm'}>
            {meme.points} point{Math.abs(meme.points) !== 1 && 's'} · {meme.views} view
            {Math.abs(meme.views) !== 1 && 's'} · {meme.commentCount} comment
            {Math.abs(meme.commentCount) !== 1 && 's'}
          </p>
          {auth.isAuthenticated() ? (
            <>
              <VoteUpBtn disabled={getVoteState(meme) === VOTE.up} onClick={() => upVote(meme)}>
                <IoCaretUpOutline size={22} className={'fill-current inline-flex self-center'} />
              </VoteUpBtn>
              <VoteDownBtn
                disabled={getVoteState(meme) === VOTE.down}
                onClick={() => downVote(meme)}
              >
                <IoCaretDownOutline size={22} className={'fill-current inline-flex self-center'} />
              </VoteDownBtn>
            </>
          ) : (
            <div />
          )}
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
