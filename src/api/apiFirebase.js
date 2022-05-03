// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDlyzJPTIjYAFLrcf1rxZo2qflhIjYHFo4',
  authDomain: 'fir-api-8c978.firebaseapp.com',
  projectId: 'fir-api-8c978',
  storageBucket: 'fir-api-8c978.appspot.com',
  messagingSenderId: '1098234124850',
  appId: '1:1098234124850:web:a86a2c5078218e1786fa2b',
  measurementId: 'G-42M5KGE4MS',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// const analytics = getAnalytics(app);
