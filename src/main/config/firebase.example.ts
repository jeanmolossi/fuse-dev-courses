import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'apiKey_ENV_VART',
  authDomain: 'authDomain_ENV_VART',
  projectId: 'projectId_ENV_VART',
  storageBucket: 'storageBucket_ENV_VART',
  messagingSenderId: 'messagingSenderId_ENV_VART',
  appId: 'appId_ENV_VART',
  measurementId: 'measurementId_ENV_VART',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
