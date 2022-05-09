// Import the functions you need from the SDKs you need
import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/compat/app";
// import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth";
import {getAuth} from"firebase/auth";
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4xfqZAmS2dGvzDIdo7tlRMKdjNbxDKvI",
  authDomain: "speech-to-text-a1b66.firebaseapp.com",
  projectId: "speech-to-text-a1b66",
  storageBucket: "speech-to-text-a1b66.appspot.com",
  messagingSenderId: "58641760606",
  appId: "1:58641760606:web:d5f0e5ba533593a9bc8fcf",
  measurementId: "G-EFKF3THGQQ",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
const analytics = getAnalytics(firebaseApp);
// const db= firebase.firestore();
// export  db;
// //sign-in with google
// export const auth = firebase.auth();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });

// export const signInWithGoogle = () => auth.signInWithPopup(provider);
/**
 * https://stackoverflow.com/questions/66273155/how-to-keep-authenticated-state-on-refresh
 */
 export default firebaseApp;
const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [loading, setLoading] = useState(firebase.auth().currentUser);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log({ loading });
  }, [loading]);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async () => {
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const response = await firebase.auth().signInWithPopup(provider);
      setUser(response.user);
      return response.user;
    } finally {
      return setLoading(false);
    }
  };

  const signout = async () => {
    setLoading(true);
    try {
      await firebase.auth().signOut();
      setUser(false);
    } finally {
      return setLoading(false);
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    loading,
    user,
    signin,
    signout,
  };
}
