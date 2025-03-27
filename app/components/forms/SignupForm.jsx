"use client";

import { TextInput } from "../form-components/TextInput";
import { Button } from "../form-components/Button";
import { FormSectionTitle } from "../form-components/FormSectionTitle";
import { StudentForm } from "./StudentForm";
import { CompanyForm } from "./CompanyForm";

export const SignupForm = ({ type, titles }) => {
  return (
    <>
      <FormSectionTitle>{titles.one}</FormSectionTitle>

      <TextInput
        label="E-post*"
        type="email"
        placeholder="Ex. email@example.com"
        name="email"
        isRequired
      ></TextInput>
      <TextInput
        label="Lösenord*"
        type="password"
        placeholder="Skriv ditt lösenord"
        name="password"
        isRequired
      ></TextInput>

      {type === "student" ? (
        <StudentForm titles={titles} />
      ) : (
        <CompanyForm titles={titles} />
      )}

      <TextInput
        label="Jag har läst och godkänt integritetspolicyn"
        type="checkbox"
        name="policy"
      ></TextInput>
      <Button
        textColor="white"
        backgroundColor={type === "company" ? "blue" : "red"}
        text={type === "company" ? "Registrera företag" : "Registrera student"}
        type="submit"
      />
    </>
  );
};
