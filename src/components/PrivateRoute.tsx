import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute: React.FC = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
