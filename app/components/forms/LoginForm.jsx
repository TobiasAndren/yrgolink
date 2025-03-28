"use client";

import { TextInput } from "../form-components/TextInput";
import { Button } from "../form-components/Button";
import { FormSectionTitle } from "../form-components/FormSectionTitle";
import { login } from "@/app/login/actions";

export const LoginForm = () => {
    return (
        <>
            <FormSectionTitle>Logga in</FormSectionTitle>
            <TextInput
                label="E-post"
                type="email"
                id="email"
                name="email"
                placeholder="email@example.com"
                isRequired
            />
            <TextInput
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
    )
}