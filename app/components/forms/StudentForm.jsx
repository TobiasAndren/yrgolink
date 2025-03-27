"use client";

import { TextInput } from "../form-components/TextInput";
import { FormSectionTitle } from "../form-components/FormSectionTitle";

export const StudentForm = ({ titles }) => {
  return (
    <>
      <FormSectionTitle>{titles.two}</FormSectionTitle>
      <TextInput
        label="Förnamn*"
        type="text"
        placeholder="Ex. Karl"
        name="firstname"
        isRequired
      ></TextInput>
      <TextInput
        label="Efternamn*"
        type="text"
        placeholder="Ex. Andersson"
        name="lastname"
        isRequired
      ></TextInput>
      <TextInput label="Klass" type="text"></TextInput>
      <TextInput
        label="Om mig"
        type="text"
        placeholder="Skriv kort om dig själv"
        name="description"
      ></TextInput>
      <FormSectionTitle>{titles.three}</FormSectionTitle>
      <TextInput
        label="Portfolio/github"
        type="text"
        placeholder="Ex. www.portfolio.se"
        name="portfolio"
      ></TextInput>
      <TextInput
        label="Linked in"
        type="text"
        placeholder="Ex. www.linkedin.se/example"
        name="linkedin"
      ></TextInput>
      <TextInput label="CV" type="file"></TextInput>

      <TextInput label="program och tekniska kunskaper"></TextInput>
    </>
  );
};
