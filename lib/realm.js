import * as Realm from 'realm-web'

const APP_ID = process.env.NEXT_PUBLIC_MONGODB_REALM_ID

// Initialize the realm app to be able to use it
const app = new Realm.App(APP_ID)

// Get a valid Realm user access token to authenticate requests
export async function getValidAccessToken() {
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

export function useRealm() {
  return app
}
