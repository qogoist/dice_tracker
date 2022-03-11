import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";

import { auth } from "../firebase";

export type IAuthContext = {
  currentUser: User;
  signup: (email: string, pass: string) => Promise<any>;
  login: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error("Context not defined");

  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const signup = (email: string, pass: string): Promise<any> => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const login = (email: string, pass: string): Promise<any> => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logout = (): Promise<any> => {
    return auth.signOut();
  };

  const resetPassword = (email: string): Promise<any> => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  });

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
