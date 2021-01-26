import React, { useState, useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import UnauthorizedPage from '@/pages/403'
import * as Realm from 'realm-web'
import { useRouter } from 'next/router'

export const AuthContext = createContext({ user: null })

export default function AuthContextComp({ children }) {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const APP_ID = process.env.NEXT_PUBLIC_MONGODB_REALM_ID
  const app = new Realm.App(APP_ID)

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
    return app.currentUser
      .logOut()
      .then((_user) => {
        setUser('ANON')
        return app.logIn(Realm.Credentials.anonymous())
      })
      .then(() => {
        router.push('/')
      })
  }

  //Handle auth state changes
  useEffect(() => {
    if (!user) {
      setUser(app.currentUser)
    }
  }, [setUser, user])

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
