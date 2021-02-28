import cookieCutter from 'cookie-cutter'
import { gql, useMutation } from '@apollo/client'

// Mutation for adding views
const ADD_VIEW = gql`
  mutation AddView($meme_id: ObjectId!) {
    addView(input: $meme_id) {
      _id
      views
    }
  }
`

export const useViewCount = () => {
  const [addViewMutation] = useMutation(ADD_VIEW)

  const addView = (memeID) => {
    // Only add view if there is no cookie set for the meme id
    if (!cookieCutter.get(memeID)) {
      // Get current Date
      const today = new Date()
      // Get date a week from now
      const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)

      console.log(`Adding view for meme ${memeID}!`)

      // Add a view to the specified meme
      addViewMutation({ variables: { meme_id: memeID } }).then((res) => {
        console.log({
          msg: 'Added view',
          response: res,
        })
        // Add a cookie for the memeID which expires in one week
        cookieCutter.set(memeID, true, { expires: nextWeek })
      })
    }
  }
  return { addView }
}
