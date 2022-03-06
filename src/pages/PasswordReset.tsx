import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertBox from "../components/AlertBox";
import AuthBackdrop from "../components/AuthBackdrop";
import FormLabel from "../components/FormLabel";
import { useAuth } from "../contexts/AuthContext";
import { mapAuthErrorMessage } from "../helper/AuthErrorMessage";

const PasswordReset: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      await resetPassword(email);

      setIsLoading(false);
      setSuccess(
        "Password reset request sent. A password reset link has been sent to your email adress."
      );
    } catch (error: any) {
      setError(mapAuthErrorMessage(error.code));
      setIsLoading(false);
    }
  };

  return (
    <AuthBackdrop>
      <h1>Reset your password</h1>
      <AlertBox active={error ? true : false} type="error" message={error} />
      <AlertBox active={success ? true : false} type="success" message={success} />
      <form onSubmit={handleSubmit} className="auth-form">
        <FormLabel
          description="Email"
          name="email"
          type="email"
          autocomplete="username"
          isRequired={true}
          handleChange={handleChange}
        />

        <button className="btn auth-btn" type="submit">
          {isLoading ? "Loading..." : "Request password reset"}
        </button>
      </form>
      <p>
        Here on accident? Go back to <Link to="/login">Login</Link>
      </p>
    </AuthBackdrop>
  );
};

export default PasswordReset;
