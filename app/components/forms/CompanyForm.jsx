"use client";

import { TextInput } from "../form-components/TextInput";
import { FormSectionTitle } from "../form-components/FormSectionTitle";

export const CompanyForm = ({ titles }) => {
  return (
    <>
      <FormSectionTitle>{titles.two}</FormSectionTitle>
      <TextInput
        label="Namn*"
        type="text"
        placeholder="Ex. Acme Company"
        name="companyname"
        isRequired
      ></TextInput>
      <TextInput
        label="Hemsida*"
        type="text"
        placeholder="Ex. www.acemecompany.se"
        name="website"
        isRequired
      ></TextInput>
      <TextInput
        label="Kontaktperson namn"
        type="text"
        placeholder="Ex. Karl Andersson"
        name="contactname"
      ></TextInput>
      <TextInput
        label="Kontaktperson e-post"
        type="text"
        placeholder="Ex. karlandersson@example.com"
        name="contactemail"
      ></TextInput>
      <FormSectionTitle>{titles.three}</FormSectionTitle>
      <TextInput
        label="Beskrivning av LIA-platser"
        type="text"
        placeholder="Skriv kort om era LIA-platser"
        name="description"
      ></TextInput>
      <TextInput label="Möjliga Arbetsformer" type="text"></TextInput>

      <TextInput label="Kunskaper som sökes"></TextInput>
    </>
  );
};
