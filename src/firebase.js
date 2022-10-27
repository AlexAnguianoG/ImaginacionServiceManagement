// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCXTEzZjxQpxb8DLyMfhl6rzBYI6s9QxCI',
  authDomain: 'imaginacion-service-mana-39182.firebaseapp.com',
  projectId: 'imaginacion-service-mana-39182',
  storageBucket: 'imaginacion-service-mana-39182.appspot.com',
  messagingSenderId: '303834039474',
  appId: '1:303834039474:web:e5ca0ee68f67ce6d8275ab',
  measurementId: 'G-07F8F74Z3K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Log in
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Sign up
const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Passwod reset
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Sign out
const logout = () => {
  signOut(auth);
};

export {
  auth,
  analytics,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
