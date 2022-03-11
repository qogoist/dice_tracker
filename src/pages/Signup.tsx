import React, { useState } from "react";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import AlertBox from "../components/AlertBox";

import AuthBackdrop from "../components/AuthBackdrop";
import FormLabel from "../components/FormLabel";
import { useAuth } from "../contexts/AuthContext";
import { mapAuthErrorMessage } from "../helper/AuthErrorMessage";

type EmailSignupData = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<EmailSignupData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (formData?.password !== formData?.confirmPassword) return;

    try {
      setIsLoading(true);
      setError("");

      if (!formData || !formData.email || !formData.password)
        throw new Error("Please fill out the entire form.");

      await signup(formData.email, formData.password);

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
    const value = e.currentTarget.value;

    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <AuthBackdrop>
      <h1>Sign Up</h1>
      <AlertBox active={error ? true : false} type="error" message={error} />
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormLabel
          description="Email"
          type="email"
          name="email"
          autocomplete="username"
          isRequired={true}
          handleChange={handleChange}
        />
        <FormLabel
          description="Password"
          type="password"
          name="password"
          autocomplete="new-password"
          isRequired={true}
          handleChange={handleChange}
        />
        <FormLabel
          description="Confirm Password"
          type="password"
          name="confirmPassword"
          autocomplete="new-password"
          isRequired={true}
          handleChange={handleChange}
        />

        <button className="btn auth-btn" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      <p>Already have an account? {<RouteLink to="/login">Log in</RouteLink>}</p>
    </AuthBackdrop>
  );
};

export default Signup;
