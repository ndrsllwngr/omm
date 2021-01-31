import { gql, useMutation } from '@apollo/client'
import { useAuth } from '@/components/context/authContext'
import { VOTE } from '@/lib/constants'

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

export const useVoting = () => {
  const [upVoteMutation] = useMutation(UP_VOTE)
  const [downVoteMutation] = useMutation(DOWN_VOTE)

  const auth = useAuth()

  const getVoteState = (meme) => {
    if (
      auth.getUser() &&
      meme &&
      meme.upVotes.some((user) => user._id.toString() === auth.getUser().id.toString())
    ) {
      return VOTE.up
    } else if (
      auth.getUser() &&
      meme &&
      meme.downVotes.some((user) => user._id.toString() === auth.getUser().id.toString())
    ) {
      return VOTE.down
    } else {
      return VOTE.none
    }
  }

  const upVote = (meme) => {
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
