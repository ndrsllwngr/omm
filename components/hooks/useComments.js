import { gql, useMutation } from '@apollo/client'
import { useAuth } from '@/components/context/authContext'
import { VOTE } from '@/lib/constants'

const ADD_COMMENT = gql`
  mutation AddComment(
    $meme_id: ObjectId!
    $createdBy: ObjectId!
    $text: String!
    $createdAt: DateTime
  ) {
    addComment(
      input: { meme_id: $meme_id, createdBy: $createdBy, text: $text, createdAt: $createdAt }
    ) {
      _id
      comments {
        text
        createdAt
        createdBy {
          name
        }
      }
    }
  }
`

export const useComments = () => {
  const [addCommentMutation] = useMutation(ADD_COMMENT)

  const auth = useAuth()

  const addComment = (meme, text) => {
    if (auth.isAuthenticated()) {
      console.log({ meme, text })
      addCommentMutation({
        variables: {
          meme_id: meme._id,
          text: text,
          createdBy: auth.getUser().id,
          createdAt: new Date(),
        },
      }).then((res) => {
        console.log({
          msg: 'addComment',
          response: res,
        })
      })
    }
  }

  return { addComment }
}
