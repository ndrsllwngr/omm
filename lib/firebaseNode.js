import * as admin from 'firebase-admin'

// Create firebase credentials object for Firebase Admin (Backend-Client) from .env variables in
const adminCredentials = {
  type: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TYPE,
  project_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
  client_email: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
}

if (!admin.apps.length) {
  //Initialize the firebase admin app
  // This can be used to use the Firebase Cloud Storage in the backend (e.g. for downloading images from there)
  admin.initializeApp({
    credential: admin.credential.cert(adminCredentials),
    //TODO potentially move this to .env
    databaseURL: 'https://online-multimedia.firebaseio.com',
    storageBucket: 'online-multimedia.appspot.com',
  })
}

export default admin
