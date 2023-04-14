import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updatePassword,
  updateEmail,
  updateProfile,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../api/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function updateUser(name) {
    return updateProfile(currentUser, { displayName: name });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function glogin() {
    return signInWithRedirect(auth, provider);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email) {
    return updateEmail(currentUser, email);
  }

  function updateUserPassword(password) {
    return updatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    glogin,
    register,
    updateUser,
    logout,
    updateUserPassword,
    resetPassword,
    updateUserEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
