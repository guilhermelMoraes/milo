import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: String(FIREBASE_API_KEY),
  authDomain: String(FIREBASE_AUTH_DOMAIN),
  projectId: String(FIREBASE_PROJECT_ID),
  appId: String(FIREBASE_APP_ID),
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default auth;
