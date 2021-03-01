import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import UnauthorizedPage from '@/pages/403'
import * as Realm from 'realm-web'
import { useRouter } from 'next/router'
import { AUTH_PROVIDER } from 'lib/constants'
import { useRealm } from '@/lib/realm'
import { gql, useMutation } from '@apollo/client'

// Mutation for adding a user to the User collection in mongodb
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
// Create a new context
export const AuthContext = createContext({ user: null })

export default function AuthContextComp({ children }) {
  // Initialize variables
  const [insertOneUser] = useMutation(ADD_USER)
  const router = useRouter()
  const app = useRealm()

  // Return the currently logged in realm user if there is one otherwise return null
  const getUser = () => {
    return isAuthenticated() ? app.currentUser : null
  }

  const register = ({ name, email, password }) => {
    return (
      app.emailPasswordAuth
        // Register a new email password user in Realm
        .registerUser(email, password)
        .then(() => {
          // log the newly created user in
          return loginEmailPassword({ email, password })
        })
        .then((authUser) => {
          // Insert the new users custom user data into the mongoDB user collection
          return insertOneUser({
            variables: {
              user: {
                _id: authUser.id,
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
    )
  }

  const loginEmailPassword = ({ email, password }) => {
    // Create a user password credential Object
    const credentials = Realm.Credentials.emailPassword(email, password)
    // Try to login to realm with the provided credentials
    return app.logIn(credentials)
  }

  const isAuthenticated = () => {
    // Check if a user is logged into realm which did not use anonymous login (-> logged in with email and password)
    return app.currentUser != null && app.currentUser.providerType !== AUTH_PROVIDER.anon
  }

  const signOut = () => {
    //Sign the user out from realm
    return app.currentUser.logOut().then(() => {
      //Route to index page
      return router.push('/')
    })
  }

  // Provide the Context with the necessary funtionality
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

// Wrapper for routes which need the user to be logged in
export const ProtectedRoute = ({ children }) => {
  const auth = useAuth()
  // If the user is not authenticated return the unauthorized (403) Page
  if (!auth.isAuthenticated()) {
    return <UnauthorizedPage />
  }
  // If the user is authenticated return the wrapped children
  return children
}
