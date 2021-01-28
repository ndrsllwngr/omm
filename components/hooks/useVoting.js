import firebase from '@/lib/firebase'
import { useAuth } from '@/components/context/authContext'
import { FIRESTORE_COLLECTION, VOTE } from '@/lib/constants'

import { gql, useMutation } from '@apollo/client'

// TODO createdBy should be User
// TODO remove width, height
const UP_VOTE = gql`
  mutation UpVoteMeme($meme_id: ObjectId!, $user_id: ObjectId!) {
    upVoteMeme(input: { meme_id: $meme_id, user_id: $user_id }) {
      _id
      upVotes {
        _id
      }
      downVotes {
        _id
      }
      points
    }
  }
`

const DOWN_VOTE = gql`
  mutation DownVoteMeme($meme_id: ObjectId!, $user_id: ObjectId!) {
    downVoteMeme(input: { meme_id: $meme_id, user_id: $user_id }) {
      _id
      upVotes {
        _id
      }
      downVotes {
        _id
      }
      points
    }
  }
`

export const useVoting = ({ updateMemes = null, updateMeme = null }) => {
  const [upVoteMutation] = useMutation(UP_VOTE)
  const [downVoteMutation] = useMutation(DOWN_VOTE)

  const auth = useAuth()

  const getVoteState = (meme) => {
    if (auth.getUser() && meme && meme.upVotes.includes(auth.getUser().id)) {
      return VOTE.up
    } else if (auth.getUser() && meme && meme.downVotes.includes(auth.getUser().id)) {
      return VOTE.down
    } else {
      return VOTE.none
    }
  }

  const getTotalPoints = (meme) => {
    return meme.points
  }

  const upVote = (meme) => {
    if (auth.isAuthenticated()) {
      console.log({ meme_id: meme._id, user_id: auth.getUser().id })
      upVoteMutation({ variables: { meme_id: meme._id, user_id: auth.getUser().id } }).then(
        (res) => {
          console.log({
            msg: 'Upvoted',
            response: res,
          })
          // TODO unsure how this works exactly
          if (updateMemes) {
            updateMemes((draft) => {
              const index = draft.findIndex((el) => el.id === meme.id)
              draft[index].downVotes = draft[index].downVotes.filter(
                (el) => el !== auth.getUser().id
              )
              draft[index].upVotes.push(auth.getUser().id)
            })
          }
          if (updateMeme) {
            updateMeme((draft) => {
              draft.downVotes = draft.downVotes.filter((el) => el !== auth.getUser().id)
              draft.upVotes.push(auth.getUser().id)
            })
          }
        }
      )
    }
  }

  const downVote = (meme) => {
    if (auth.isAuthenticated()) {
      downVoteMutation({ variables: { meme_id: meme._id, user_id: auth.getUser().id } }).then(
        (res) => {
          console.log({
            msg: 'Dowvoted',
            response: res,
          })
          // TODO unsure how this works exactly
          if (updateMemes) {
            updateMemes((draft) => {
              const index = draft.findIndex((el) => el.id === meme.id)
              draft[index].upVotes = draft[index].upVotes.filter((el) => el !== auth.getUser().id)
              draft[index].downVotes.push(auth.getUser().id)
            })
          }
          if (updateMeme) {
            updateMeme((draft) => {
              draft.upVotes = draft.upVotes.filter((el) => el !== auth.getUser().id)
              draft.downVotes.push(auth.getUser().id)
            })
          }
        }
      )
    }
  }

  return { upVote, downVote, getVoteState, getTotalPoints }
}
