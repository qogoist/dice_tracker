import React from "react";

const AuthBackdrop: React.FC = ({ children }) => {
  return (
    <div className="auth-backdrop">
      <div className="card auth-box">{children}</div>
    </div>
  );
};

export default AuthBackdrop;
