"use client";

import { Input } from "../form-components/Input";
import { FormSectionTitle } from "../form-components/FormSectionTitle";

export const StudentForm = ({ titles }) => {
  return (
    <form>
      <FormSectionTitle>{titles.two}</FormSectionTitle>
      <Input
        label="Namn*"
        type="text"
        placeholder="Ex. Karl Andersson"
        name="fullname"
        isRequired
      ></Input>
      <Input label="Klass" type="text"></Input>
      <Input
        label="Om mig"
        type="text"
        placeholder="Skriv kort om dig själv"
        name="description"
      ></Input>
      <FormSectionTitle>{titles.three}</FormSectionTitle>
      <Input
        label="Portfolio/github"
        type="text"
        placeholder="Ex. www.portfolio.se"
        name="portfolio"
      ></Input>
      <Input
        label="Linked in"
        type="text"
        placeholder="Ex. www.linkedin.se/example"
        name="linkedin"
      ></Input>
      <Input label="CV" type="file"></Input>

      <Input label="program och tekniska kunskaper"></Input>
    </form>
  );
};
