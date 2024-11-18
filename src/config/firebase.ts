import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAR5_2sWe8i_KfdB4XOsisxA7lKFePlLhM",
  authDomain: "g-finances.firebaseapp.com",
  projectId: "g-finances",
  storageBucket: "g-finances.appspot.com",
  messagingSenderId: "296356497766",
  appId: "1:296356497766:web:9b1d4707b814c3c537a0a7",
  measurementId: "G-XBHDRL7TBJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('La persistance a échoué - plusieurs onglets ouverts');
  } else if (err.code === 'unimplemented') {
    console.warn('Le navigateur ne supporte pas la persistance');
  }
});