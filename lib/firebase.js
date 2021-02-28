import firebase from 'firebase/app'
import 'firebase/auth' // If you need it
import 'firebase/firestore' // If you need it
import 'firebase/storage' // If you need it
import 'firebase/analytics' // If you need it

// Create firebase credentials object for Firebase Webclient from .env variables in
const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Check that `window` is in scope for the analytics module!
// TODO we may have to deactive analytics to use it with our /api/*
if (typeof window !== 'undefined' && !firebase.apps.length) {
  //Initialize the firebase App
  firebase.initializeApp(clientCredentials)
  // Mute firebase logs
  firebase.setLogLevel('silent')
  // Anonymously login the Website user to firebase to be able to use Firebase Cloud Storage
  firebase
    .auth()
    .signInAnonymously()
    .then((userCredentials) => console.log({ userCredentials }))
    .catch((e) => console.error(e))
  // To enable analytics. https://firebase.google.com/docs/analytics/get-started
  if ('measurementId' in clientCredentials) firebase.analytics()
}

export default firebase
