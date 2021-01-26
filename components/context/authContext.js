import React, { useState, useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import firebase from '@/lib/firebase'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { useRouter } from 'next/router'
import UnauthorizedPage from '@/pages/403'
import * as Realm from 'realm-web'

export const AuthContext = createContext({ user: null })

export default function AuthContextComp({ children }) {
  const [user, setUser] = useState(null)
  const APP_ID = process.env.NEXT_PUBLIC_MONGODB_REALM_ID
  const app = new Realm.App(APP_ID)

  //const router = useRouter()

  const createLogin = ({ email, password }) => {
    return app.emailPasswordAuth.registerUser(email, password)
  }

  // TODO maybe get custom data (refreshCustomData)
  const loginEmailPassword = ({ email, password }) => {
    // Create an anonymous credential
    const credentials = Realm.Credentials.emailPassword(email, password)
    return app.logIn(credentials).then((user) => {
      setUser(user)
      return user
    })
  }

  // TODO use anon creds if logged out
  const signOut = () => {
    return app.currentUser.logOut().then((user) => {
      setUser(null)
      return user
    })
  }

  useEffect(() => {
    console.log({ user })
  }, [user])

  // const getUserAdditionalData = (user) => {
  //   return firebase
  //     .firestore()
  //     .collection(FIRESTORE_COLLECTION.USERS)
  //     .doc(user.uid)
  //     .get()
  //     .then((userData) => {
  //       console.debug(
  //         'FIRESTORE_COLLECTION.USERS',
  //         'READ',
  //         'AuthContextComp',
  //         'getUserAdditionalData'
  //       )
  //       if (userData.data()) {
  //         setUser(userData.data())
  //       }
  //     })
  // }
  //
  // //Handle auth state changes
  // useEffect(() => {
  //   const handleAuthStateChanged = (user) => {
  //     console.log('handleAuthStateChanged: ' + user)
  //     //setUser(user)
  //     if (user) {
  //       getUserAdditionalData(user)
  //     } else {
  //       setUser(null)
  //     }
  //   }
  //
  //   const unsub = firebase.auth().onAuthStateChanged(handleAuthStateChanged)
  //
  //   return () => unsub()
  // }, [])

  // Handle updates of the user document
  // useEffect(() => {
  //   if (user && user.uid) {
  //     // Subscribe to user document on mount
  //     const unsubscribe = db
  //       .collection(FIRESTORE_COLLECTION.USERS)
  //       .doc(user.uid)
  //       .onSnapshot((doc) => {
  //         console.debug(`FIRESTORE_COLLECTION.USERS`, 'READ', 'AuthContextComp', 'useEffect')
  //         setUser(doc.data())
  //       })
  //     return () => unsubscribe()
  //   }
  //   // TODO Evaluate the dependencies of this useEffect.
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <AuthContext.Provider value={{ user, signOut, loginEmailPassword, createLogin }}>
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
    return <UnauthorizedPage />
  }
  return children
}
