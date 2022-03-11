import React, { useState } from "react";
import { useNavigate, Link as RouteLink } from "react-router-dom";
import AlertBox from "../components/AlertBox";

import AuthBackdrop from "../components/AuthBackdrop";
import FormLabel from "../components/FormLabel";
import { useAuth } from "../contexts/AuthContext";
import { mapAuthErrorMessage } from "../helper/AuthErrorMessage";

type EmailLoginData = {
  email?: string;
  password?: string;
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<EmailLoginData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      if (!formData || !formData.email || !formData.password)
        throw new Error("Please fill out the entire form.");

      await login(formData.email, formData.password);

      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      let message: string;

      if (error.code) message = mapAuthErrorMessage(error.code);
      else message = error.message;

      setError(message);
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const key: string = e.currentTarget.name;
    const value: string = e.currentTarget.value;

    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <AuthBackdrop>
      <h1>Login</h1>
      <AlertBox active={error ? true : false} type="error" message={error} />
      <form onSubmit={handleSubmit} className="auth-form">
        <FormLabel
          description="Email"
          name="email"
          type="email"
          autocomplete="username"
          isRequired={true}
          handleChange={handleChange}
        />
        <FormLabel
          description="Password"
          name="password"
          type="password"
          autocomplete="current-password"
          isRequired={true}
          handleChange={handleChange}
        />
        <RouteLink to="/password-reset">Reset Password</RouteLink>
        <button className="btn auth-btn" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      <p>
        Don't have an account yet? <RouteLink to="/signup">Sign Up</RouteLink>
      </p>
    </AuthBackdrop>
  );
};

export default Login;
