import React, { useState, useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import firebase from '@/lib/firebase'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { useRouter } from 'next/router'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'

export const AuthContext = createContext({ user: null })

export default function AuthContextComp({ children }) {
  const [user, setUser] = useState(null)

  const router = useRouter()

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
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            getUserAdditionalData(response.user)
            return response.user
          })
          .catch((error) => {
            return { error }
          })
      })
      .catch((error) => {
        return { error }
      })
  }

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null)
        console.log('Signed out!')
        router.push('/')
      })
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
      console.log('handleAuthStateChanged: ' + user)
      //setUser(user)
      if (user) {
        getUserAdditionalData(user)
      } else {
        setUser(null)
      }
    }

    const unsub = firebase.auth().onAuthStateChanged(handleAuthStateChanged)

    return () => unsub()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const ProtectedRoute = ({ children }) => {
  const auth = useAuth()
  if (!auth.user) {
    return (
      <>
        <HtmlHead title={'Unauthorized'} />
        <Navbar />
        <p className={'flex flex-col justify-center items-center'}>401 (Unauthorized)</p>
      </>
    )
  }
  return children
}
