import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import UnauthorizedPage from '@/pages/403'
import * as Realm from 'realm-web'
import { useRouter } from 'next/router'
import { AUTH_PROVIDER, STORAGE_COLLECTION } from 'lib/constants'
import { useRealm } from '@/lib/realm'
import { gql, useMutation } from '@apollo/client'

const ADD_USER = gql`
  mutation AddUser($user: UserInsertInput!) {
    insertOneUser(data: $user) {
      createdAt
      name
      email
      uid
    }
  }
`

export const AuthContext = createContext({ user: null })

export default function AuthContextComp({ children }) {
  const [insertOneUser] = useMutation(ADD_USER)
  const router = useRouter()
  const app = useRealm()

  const getUser = () => {
    return isAuthenticated() ? app.currentUser : null
  }

  const register = ({ name, email, password }) => {
    return app.emailPasswordAuth
      .registerUser(email, password)
      .then(() => {
        return loginEmailPassword({ email, password })
      })
      .then((authUser) => {
        return insertOneUser({
          variables: {
            user: {
              createdAt: new Date(),
              name: name,
              email: email,
              uid: authUser.id.toString(),
            },
          },
        }).then((dbUser) => {
          return dbUser
        })
      })
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
    return app.currentUser.logOut().then(() => {
      return router.push('/')
    })
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
