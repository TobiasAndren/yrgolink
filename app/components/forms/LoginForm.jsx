"use client";

import { useState } from 'react';
import { Button } from "../form-components/Button";
import { TextInput } from "../form-components/TextInput";
import { login } from "@/app/login/actions"; // Serverfunktion

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Förhindra standardformulärens skickning

    // Skapa FormData för att skicka till servern
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // Skicka data till login action
    await login(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="E-post"
        type="email"
        id="email"
        name="email"
        placeholder="email@example.com"
        isRequired
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
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
