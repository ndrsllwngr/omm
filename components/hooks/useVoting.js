import { gql, useMutation } from '@apollo/client'
import { useAuth } from '@/components/context/authContext'
import { VOTE } from '@/lib/constants'

// Mutation for upvoting
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
// Mutation for downvoting
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

export const useVoting = () => {
  const [upVoteMutation] = useMutation(UP_VOTE)
  const [downVoteMutation] = useMutation(DOWN_VOTE)

  // Get authentication provider
  const auth = useAuth()

  const getVoteState = (meme) => {
    // If the current user is in the upVotes list return VOTE.up
    if (
      auth.getUser() &&
      meme &&
      meme.upVotes.some((user) => user._id.toString() === auth.getUser().id.toString())
    ) {
      return VOTE.up
    }
    // If the current user is in the downVotes list return VOTE.down
    else if (
      auth.getUser() &&
      meme &&
      meme.downVotes.some((user) => user._id.toString() === auth.getUser().id.toString())
    ) {
      return VOTE.down
    }
    // If the current user has not voted yet return VOTE.none
    else {
      return VOTE.none
    }
  }

  const upVote = (meme) => {
    // If the user is logged in trigger an upvote
    if (auth.isAuthenticated()) {
      upVoteMutation({ variables: { meme_id: meme._id, user_id: auth.getUser().id } }).then(
        (res) => {
          console.log({
            msg: 'upVote',
            response: res,
          })
        }
      )
    }
  }

  const downVote = (meme) => {
    // If the user is logged in trigger a downvote
    if (auth.isAuthenticated()) {
      downVoteMutation({ variables: { meme_id: meme._id, user_id: auth.getUser().id } }).then(
        (res) => {
          console.log({
            msg: 'downVote',
            response: res,
          })
        }
      )
    }
  }

  return { upVote, downVote, getVoteState }
}
