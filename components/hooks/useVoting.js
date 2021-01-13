/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { useAuth } from '@/components/context/authContext'
import { FIRESTORE_COLLECTION, VOTE } from '@/lib/constants'

export const useVoting = (initMeme) => {
  const [meme, setMeme] = useState(initMeme)
  const [voteState, setVoteState] = useState(VOTE.none)

  const auth = useAuth()

  const getVote = (meme) => {
    if (auth.user && meme && meme.upVotes.includes(auth.user.uid)) {
      return VOTE.up
    } else if (auth.user && meme && meme.downVotes.includes(auth.user.uid)) {
      return VOTE.down
    } else {
      return VOTE.none
    }
  }

  const upVote = () => {
    const db = firebase.firestore()
    const memeRef = db.collection(FIRESTORE_COLLECTION.MEMES).doc(meme.id)

    if (voteState !== VOTE.up) {
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
        .then(function () {
          console.log('(UP) Transaction successfully committed!')
        })
        .catch(function (error) {
          console.log('(UP) Transaction failed: ', error)
        })
    }
  }

  const downVote = () => {
    const db = firebase.firestore()
    const memeRef = db.collection(FIRESTORE_COLLECTION.MEMES).doc(meme.id)

    if (voteState !== VOTE.down) {
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
        .then(function () {
          console.log('(DOWN) Transaction successfully committed!')
        })
        .catch(function (error) {
          console.log('(DOWN) Transaction failed: ', error)
        })
    }
  }

  // Handle updates of the user document
  useEffect(() => {
    if (meme) {
      console.log({ src: 'useVoting', meme })
      setVoteState(getVote(meme))
      // Subscribe to user document on mount
      const db = firebase.firestore()
      const unsubscribe = db
        .collection(FIRESTORE_COLLECTION.MEMES)
        .doc(meme.id)
        .onSnapshot((doc) => {
          setMeme({ id: doc.id, ...doc.data() })
          setVoteState(getVote(doc.data()))
        })
      return () => unsubscribe()
    }
  }, [])

  return { upVote, downVote, voteState }
}
