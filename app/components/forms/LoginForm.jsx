"use client";

import { useState } from 'react';
import { Input } from "../form-components/Input";
import { Button } from "../form-components/Button";
import { FormSectionTitle } from '../form-components/FormSectionTitle';

export const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Förhindra standardformulärens skickning

    // Skapa FormData för att skicka till servern
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // Skicka data till login action (anropar onSubmit som en prop)
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormSectionTitle>Kontodetaljer</FormSectionTitle>
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
      <Button 
        backgroundColor="red" 
        textColor="white"
        text="Logga in"
        type="submit"
      />
    </form>
  );
};
