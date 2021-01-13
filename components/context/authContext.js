/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import firebase from '@/lib/firebase'
import { FIRESTORE_COLLECTION } from '@/lib/constants'

export const AuthContext = createContext({ user: {} })

export default function AuthContextComp({ children }) {
  const [user, setUser] = useState(null)

  const createUser = (user) => {
    return firebase
      .firestore()
      .collection(FIRESTORE_COLLECTION.USERS)
      .doc(user.uid)
      .set(user)
      .then(() => {
        setUser(user)
        return user
      })
      .catch((error) => {
        return { error }
      })
  }
  const signUp = ({ name, email, password }) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        //TODO do we want email verification?
        firebase.auth().currentUser.sendEmailVerification()
        return createUser({ uid: response.user.uid, email, name })
      })
      .catch((error) => {
        return { error }
      })
  }
  const signIn = ({ email, password }) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user)
        getUserAdditionalData(user)
        return response.user
      })
      .catch((error) => {
        return { error }
      })
  }

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => setUser(false))
  }

  const getUserAdditionalData = (user) => {
    return firebase
      .firestore()
      .collection(FIRESTORE_COLLECTION.USERS)
      .doc(user.uid)
      .get()
      .then((userData) => {
        if (userData.data()) {
          setUser(userData.data())
        }
      })
  }

  //Handle auth state changes
  useEffect(() => {
    const handleAuthStateChanged = (user) => {
      //setUser(user)
      if (user) {
        getUserAdditionalData(user)
      }
    }

    const unsub = firebase.auth().onAuthStateChanged(handleAuthStateChanged)

    return () => unsub()
    // TODO Q@Andy: Is the dependency 'user' missing on purpose?
  }, [])

  // Handle updates of the user document
  useEffect(() => {
    if (user && user.uid) {
      // Subscribe to user document on mount
      const unsubscribe = db
        .collection(FIRESTORE_COLLECTION.USERS)
        .doc(user.uid)
        .onSnapshot((doc) => setUser(doc.data()))
      return () => unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContextComp.propTypes = {
  children: PropTypes.any,
}

export const useAuth = () => useContext(AuthContext)
