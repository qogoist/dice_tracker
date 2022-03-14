import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  User,
  deleteUser,
  reauthenticateWithCredential,
  AuthCredential,
  EmailAuthProvider,
} from "firebase/auth";

import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { resetSessions } from "../api/session";
import { resetSettings } from "../api/settings";

export type IAuthContext = {
  currentUser: User;
  signup: (email: string, pass: string) => Promise<any>;
  login: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  resetData: () => void;
  deleteAccount: (credentials: { email: string; password: string }) => Promise<any>;
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
  const navigate = useNavigate();

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

  const resetData = () => {
    resetSessions(currentUser);
  };

  const deleteAccount = async (credentials: { email: string; password: string }): Promise<any> => {
    const authCredentials = EmailAuthProvider.credential(credentials.email, credentials.password);

    await reauthenticateWithCredential(currentUser, authCredentials)
      .then(() => {
        resetSessions(currentUser);
        resetSettings(currentUser);
      })
      .then(() => deleteUser(currentUser))
      .then(() => navigate("/signup"));
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
    resetData,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
