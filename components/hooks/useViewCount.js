import cookieCutter from 'cookie-cutter'
import { gql, useMutation } from '@apollo/client'

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
    if (!cookieCutter.get(memeID)) {
      const today = new Date()
      const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)

      console.log(`Adding view for meme ${memeID}!`)

      addViewMutation({ variables: { meme_id: memeID } }).then((res) => {
        console.log({
          msg: 'Added view',
          response: res,
        })
        cookieCutter.set(memeID, true, { expires: nextWeek })
      })
    }
  }
  return { addView }
}
