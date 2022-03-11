import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  User,
  deleteUser,
} from "firebase/auth";

import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export type IAuthContext = {
  currentUser: User;
  signup: (email: string, pass: string) => Promise<any>;
  login: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  resetData: () => void;
  deleteAccount: () => Promise<any>;
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
    console.log("Currently not working 😟");
  };

  const deleteAccount = async (): Promise<any> => {
    //TODO: Reauthenticate user https://firebase.google.com/docs/auth/web/manage-users?hl=en#re-authenticate_a_user

    await deleteUser(currentUser)
      .then(() => navigate("/signup"))
      .catch((error: any) => {
        console.log(error);
      });
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
