"use client";

import { Input } from "../form-components/Input";
import { Button } from "../form-components/Button";
import { FormSectionTitle } from "../form-components/FormSectionTitle";
import { signupUser } from "@/app/signup/actions";
import { PolicyLink } from "../footer/PolicyLink";
import { useState } from "react";

export const SignupForm = ({ type, titles }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError(null);
    setMessage(null);
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
  
    const result = await signupUser(formData);
  
    if (result.success) {
      setMessage(result.message);
    } else {
      setError(result.message);
    }
  };

  return (
    <form id="user-signup" onSubmit={handleSubmit}>
      <FormSectionTitle>{titles.one}</FormSectionTitle>
        <Input
          label="E-post"
          type="email"
          id="email"
          name="email"
          placeholder="email@example.com"
          isRequired
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Lösenord"
          type="password"
          id="password"
          name="password"
          placeholder="••••••"
          isRequired
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* hidden inputs for user_type, to trigger new user into company table in db */}
        {type === "company" ? (
          <>
            <Input
              type="hidden"
              name="user_type"
              id="user_type"
              value="company"
              isRequired
            />
          </>
        ) : (
          <>
            <Input
              type="hidden"
              name="user_type"
              id="user_type"
              value="student"
              isRequired
            />
          </>
        )}

        <Input
          label="Jag har läst och godkänt"
          link={<PolicyLink></PolicyLink>}
          type="checkbox"
          name="policy"
          id="policy"
          isRequired
        />

        {error && <div style={{ color: 'red' }} class="message-error">{error}</div>}
        {message && <div style={{ color: 'green' }} class="message-success">{message}</div>}

        <Button
          textColor="white"
          backgroundColor={type === "company" ? "blue" : "red"}
          text={type === "company" ? "Registrera företag" : "Registrera student"}
          type="submit"
        />
    </form>
  );
};
