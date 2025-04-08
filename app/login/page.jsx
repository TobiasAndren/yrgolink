"use client";

import { useState } from "react";
import { LoginForm } from "../components/forms/LoginForm"; // Importera LoginForm
import { Hero } from "../components/common/Hero";
import { redirect } from "next/navigation"; // För att omdirigera efter lyckad inloggning

export default function LoginPage() {
  const [error, setError] = useState("");  // För att hantera felmeddelanden

  // Hantera formulärets inlämning
  const handleLogin = async (formData) => {
    try {
      const result = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });

      const data = await result.json();

      if (data.success) {
        redirect("/profile");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Det gick inte att logga in. Kontrollera att e-post och lösenord är korrekt ifyllda.");
    }
  };

  return (
    <>
      <Hero backgroundColor="red" title="Logga in" />
      <LoginForm onSubmit={handleLogin} />
      <section>{error && <div style={{ color: "red" }}>{error}</div>}</section>
    </>
  );
}
