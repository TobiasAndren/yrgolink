"use client";

import { useState } from "react";
import { LoginForm } from "../components/forms/LoginForm";
import { Hero } from "../components/common/Hero";
import { StatusDisplay } from "../components/common/StatusDisplay";
import { login } from "./actions"; // ← direkt import

export default function LoginPage() {
  const [error, setError] = useState("");

  const handleLogin = async (formData) => {
    const result = await login(formData); // Använd server action direkt

    if (result.success) {
      window.location.href = "/profile"; // redirect från client
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      <Hero backgroundColor="red" title="Logga in" />
      <LoginForm onSubmit={handleLogin} />
      {error && <StatusDisplay isError>{error}</StatusDisplay>}
    </>
  );
}
