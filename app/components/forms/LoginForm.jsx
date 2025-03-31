"use client";

import { Input } from "../form-components/Input";
import { Button } from "../form-components/Button";
import { FormSectionTitle } from "../form-components/FormSectionTitle";
import { login } from "@/app/login/actions";

export const LoginForm = () => {
  return (
    <>
      <FormSectionTitle>Logga in</FormSectionTitle>
      <Input
        label="E-post"
        type="email"
        id="email"
        name="email"
        placeholder="email@example.com"
        isRequired
      />
      <Input
        label="Lösenord"
        type="password"
        id="password"
        name="password"
        placeholder="••••••"
        isRequired
      />
      <Button
        backgroundColor="red"
        textColor="white"
        text="Logga in"
        formAction={login}
      />
    </>
  );
};
