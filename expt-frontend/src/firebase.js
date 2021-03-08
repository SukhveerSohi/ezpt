// firebase.js establishes connection to our firebase project on cloud.
/* To use this library into our app we exported 
  various objects that we required for the our authentication functionality*/

import firebase from 'firebase/app';
import 'firebase/auth';

/* InitializeApp takes in our Config values and returns an app object
    that contains different useful functions like auth*/
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

// exporting auth object to provide functionality for authentication.
export const auth = app.auth()
export default app;