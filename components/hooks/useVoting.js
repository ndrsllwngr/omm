/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import firebase from '@/lib/firebase'
import { useAuth } from '@/components/context/authContext'
import { VOTE } from '@/lib/constants'

export const useVoting = (initMeme) => {
  const [meme, setMeme] = useState(initMeme)
  // TODO is this maybe better than using getVote?
  // const [voteState, setVoteState] = useState(VOTE.none)

  const auth = useAuth()

  const getVote = () => {
    if (auth.user && meme && meme.upVotes.includes(auth.user.uid)) {
      return VOTE.up
    } else if (auth.user && meme && meme.downVotes.includes(auth.user.uid)) {
      return VOTE.down
    } else {
      return VOTE.none
    }
  }

  const upVote = async () => {
    const memeRef = db.collection('meme').doc(meme.id)

    if (getVote() !== VOTE.up) {
      await memeRef
        // Remove any possible downVotes first
        .update({
          downVotes: firebase.admin.firestore.FieldValue.arrayRemove(auth.user.uid),
        })
        // Add upvote
        .then(
          memeRef.update({
            upVotes: firebase.admin.firestore.FieldValue.arrayUnion(auth.user.uid),
          })
        )
    }
  }

  const downVote = async () => {
    const memeRef = db.collection('meme').doc(meme.id)

    if (getVote() !== VOTE.down) {
      // Remove any possible upVotes first
      await memeRef
        .update({
          upVotes: firebase.admin.firestore.FieldValue.arrayRemove(auth.user.uid),
        })
        // Add upvote
        .then(
          memeRef.update({
            downVotes: firebase.admin.firestore.FieldValue.arrayUnion(auth.user.uid),
          })
        )
    }
  }

  // Handle updates of the user document
  useEffect(() => {
    if (meme) {
      // Subscribe to user document on mount
      const unsubscribe = db
        .collection('memes')
        .doc(meme.id)
        .onSnapshot((doc) => setMeme(doc.data()))
      return () => unsubscribe()
    }
  }, [])

  return { upVote: upVote, downVote: downVote }
}
