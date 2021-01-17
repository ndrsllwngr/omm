/* eslint-disable react-hooks/exhaustive-deps */
import firebase from '@/lib/firebase'
import { useAuth } from '@/components/context/authContext'
import { FIRESTORE_COLLECTION, VOTE } from '@/lib/constants'

export const useVoting = (updateMemes = null) => {
  const auth = useAuth()

  const getVoteState = (meme) => {
    if (auth.user && meme && meme.upVotes.includes(auth.user.uid)) {
      return VOTE.up
    } else if (auth.user && meme && meme.downVotes.includes(auth.user.uid)) {
      return VOTE.down
    } else {
      return VOTE.none
    }
  }

  const getTotalPoints = (meme) => {
    return meme.upVotes.length - meme.downVotes.length
  }

  const upVote = (meme) => {
    if (getVoteState(meme) !== VOTE.up) {
      const db = firebase.firestore()
      const memeRef = db.collection(FIRESTORE_COLLECTION.MEMES).doc(meme.id)
      db.runTransaction((transaction) => {
        return transaction.get(memeRef).then((doc) => {
          if (!doc.exists) {
            console.error('DOC NOT FOUND')
          }
          transaction.update(memeRef, {
            downVotes: firebase.firestore.FieldValue.arrayRemove(auth.user.uid),
          })
          transaction.update(memeRef, {
            upVotes: firebase.firestore.FieldValue.arrayUnion(auth.user.uid),
          })
        })
      })
        .then(() => {
          console.log('(UP) Transaction successfully committed!')
          if (updateMemes) {
            updateMemes((draft) => {
              const index = draft.findIndex((el) => el.id === meme.id)
              draft[index].downVotes = draft[index].downVotes.filter((el) => el !== auth.user.uid)
              draft[index].upVotes.push(auth.user.uid)
            })
          }
        })
        .catch((e) => {
          console.error('(UP) Transaction failed: ', e)
        })
    }
  }

  const downVote = (meme) => {
    if (getVoteState(meme) !== VOTE.down) {
      const db = firebase.firestore()
      const memeRef = db.collection(FIRESTORE_COLLECTION.MEMES).doc(meme.id)
      // Remove any possible upVotes first
      db.runTransaction((transaction) => {
        return transaction.get(memeRef).then((doc) => {
          if (!doc.exists) {
            console.error('DOC NOT FOUND')
          }
          transaction.update(memeRef, {
            upVotes: firebase.firestore.FieldValue.arrayRemove(auth.user.uid),
          })
          transaction.update(memeRef, {
            downVotes: firebase.firestore.FieldValue.arrayUnion(auth.user.uid),
          })
        })
      })
        .then(() => {
          console.log('(DOWN) Transaction successfully committed!')
          if (updateMemes) {
            updateMemes((draft) => {
              const index = draft.findIndex((el) => el.id === meme.id)
              draft[index].upVotes = draft[index].upVotes.filter((el) => el !== auth.user.uid)
              draft[index].downVotes.push(auth.user.uid)
            })
          }
        })
        .catch((e) => {
          console.error('(DOWN) Transaction failed: ', e)
        })
    }
  }

  return { upVote, downVote, getVoteState, getTotalPoints }
}
