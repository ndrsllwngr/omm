import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import * as Realm from 'realm-web'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient

// https://docs.mongodb.com/realm/web/graphql-apollo-react
// MongoDB specific constants
const APP_ID = process.env.NEXT_PUBLIC_MONGODB_REALM_ID
const graphql_url = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
// MongoDB - connect to your MongoDB Realm app
const app = new Realm.App(APP_ID)

// Get a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  if (!app.currentUser) {
    // If no user is logged in, log in an anonymous user
    await app.logIn(Realm.Credentials.anonymous())
  } else {
    // The logged in user's access token might be stale,
    // Refreshing custom data also refreshes the access token
    await app.currentUser.refreshCustomData()
  }
  // Get a valid access token for the current user
  return app.currentUser.accessToken
}

// https://github.com/vercel/next.js/tree/canary/examples/with-apollo
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: graphql_url, // Server URL (must be absolute)
      fetch: async (uri, options) => {
        const accessToken = await getValidAccessToken()
        options.headers.Authorization = `Bearer ${accessToken}`
        return fetch(uri, options)
      },
      //credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allMemes: concatPagination(),
          },
        },
      },
    }),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
