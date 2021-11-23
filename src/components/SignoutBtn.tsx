import React from "react";

import { useAuth } from "../contexts/AuthContext";

import Button from "./Button";

const SignoutBtn: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Button className="btn-outline signout" onClick={logout}>
      Sign out
    </Button>
  );
};

export default SignoutBtn;
