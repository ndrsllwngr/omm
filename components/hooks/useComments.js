import { gql, useMutation } from '@apollo/client'
import { useAuth } from '@/components/context/authContext'

// Mutation for adding comments
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

  // Get authentication provider
  const auth = useAuth()

  const addComment = (meme, text) => {
    // If a the usser is logged in add a comment to the meme
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
