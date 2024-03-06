// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth,GoogleAuthProvider,FacebookAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAVyrqIEm29ppZ7jVzMSvgF_frYboorCc4",
  authDomain: "jsonhub-47da9.firebaseapp.com",
  projectId: "jsonhub-47da9",
  storageBucket: "jsonhub-47da9.appspot.com",
  messagingSenderId: "126386202236",
  appId: "1:126386202236:web:4026e3008b42a08a950bf9",
  measurementId: "G-SEGC18S868"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const providedrFacebook = new FacebookAuthProvider()
export {auth,providerGoogle,providedrFacebook}