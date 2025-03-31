"use client";

import { Input } from "../form-components/Input";
import { FormSectionTitle } from "../form-components/FormSectionTitle";

export const CompanyForm = ({ titles }) => {
  return (
    <>
      <FormSectionTitle>{titles.two}</FormSectionTitle>
      <Input
        label="Namn*"
        type="text"
        placeholder="Ex. Acme Company"
        name="companyname"
        isRequired
      ></Input>
      <Input
        label="Hemsida*"
        type="text"
        placeholder="Ex. www.acemecompany.se"
        name="website"
        isRequired
      ></Input>
      <Input
        label="Kontaktperson namn"
        type="text"
        placeholder="Ex. Karl Andersson"
        name="contactname"
      ></Input>
      <Input
        label="Kontaktperson e-post"
        type="text"
        placeholder="Ex. karlandersson@example.com"
        name="contactemail"
      ></Input>
      <FormSectionTitle>{titles.three}</FormSectionTitle>
      <Input
        label="Beskrivning av LIA-platser"
        type="text"
        placeholder="Skriv kort om era LIA-platser"
        name="description"
      ></Input>
      <Input label="På plats" type="checkbox"></Input>
      <Input label="Remote" type="checkbox"></Input>
      <Input label="Hybrid" type="checkbox"></Input>

      <Input label="Kunskaper som sökes"></Input>
    </>
  );
};
