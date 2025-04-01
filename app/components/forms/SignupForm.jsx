"use client";

import { Input } from "../form-components/Input";
import { Button } from "../form-components/Button";
import { FormSectionTitle } from "../form-components/FormSectionTitle";
import { StudentForm } from "./StudentForm";
import { CompanyForm } from "./CompanyForm";
import { PolicyLink } from "../footer/PolicyLink";

export const SignupForm = ({ type, titles }) => {
  return (
    <>
      <FormSectionTitle>{titles.one}</FormSectionTitle>

      <Input
        label="E-post*"
        type="email"
        placeholder="Ex. email@example.com"
        name="email"
        isRequired
      ></Input>
      <Input
        label="Lösenord*"
        type="password"
        placeholder="Skriv ditt lösenord"
        name="password"
        isRequired
      ></Input>

      {type === "student" ? (
        <StudentForm titles={titles} />
      ) : (
        <CompanyForm titles={titles} />
      )}

      <Input
        label="Jag har läst och godkänt"
        link={<PolicyLink></PolicyLink>}
        type="checkbox"
        name="policy"
      ></Input>
      <Button
        textColor="white"
        backgroundColor={type === "company" ? "blue" : "red"}
        text={type === "company" ? "Registrera företag" : "Registrera student"}
        type="submit"
      />
    </>
  );
};
