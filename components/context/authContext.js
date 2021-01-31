import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import UnauthorizedPage from '@/pages/403'
import * as Realm from 'realm-web'
import { useRouter } from 'next/router'
import { AUTH_PROVIDER } from 'lib/constants'
import { useRealm } from '@/lib/realm'

export const AuthContext = createContext({ user: null })

export default function AuthContextComp({ children }) {
  const router = useRouter()

  const app = useRealm()

  const getUser = () => {
    return isAuthenticated() ? app.currentUser : null
  }

  const register = ({ email, password }) => {
    return app.emailPasswordAuth.registerUser(email, password)
  }

  // TODO maybe get custom data (refreshCustomData)
  const loginEmailPassword = ({ email, password }) => {
    // Create a user password credential
    const credentials = Realm.Credentials.emailPassword(email, password)
    return app.logIn(credentials)
  }

  const isAuthenticated = () => {
    return app.currentUser != null && app.currentUser.providerType !== AUTH_PROVIDER.anon
  }

  const signOut = () => {
    return (
      app.currentUser
        .logOut()
        /* TODO not necessary (probably)
      .then((_user) => {

        return loginAnon()
      })*/
        .then(() => {
          router.push('/')
        })
    )
  }

  return (
    <AuthContext.Provider
      value={{ getUser, signOut, loginEmailPassword, register, isAuthenticated }}
    >
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
  if (!auth.isAuthenticated()) {
    return <UnauthorizedPage />
  }
  return children
}
