import React from 'react'
import PropTypes from 'prop-types'
import { MemeRenderer } from '@/components/MemeRenderer'
import { useFabricJson } from '@/components/context/fabricContext'
import { useRouter } from 'next/router'
import { useVoting } from '@/components/hooks/useVoting'
import { VOTE } from '@/lib/constants'

export const Slide = ({ meme }) => {
  const { setJson } = useFabricJson()
  const router = useRouter()
  const { upVote, downVote, voteState } = useVoting(meme)
  return (
    <div className="flex-col max-w-md">
      <div className="title">{meme.title}</div>
      <button
        onClick={() => {
          setJson(meme)
          router.push('/create')
        }}
      >
        Copy Meme
      </button>
      <button className={'bg-green-50'} disabled={voteState === VOTE.up} onClick={upVote}>
        Upvote
      </button>
      <button className={'bg-red-50'} disabled={voteState === VOTE.down} onClick={downVote}>
        Downvote
      </button>
      <MemeRenderer meme={meme} />
    </div>
  )
}

Slide.propTypes = {
  meme: PropTypes.shape({
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
