"use client";

import { TextInput } from "../form-components/TextInput";
import { Button } from "../form-components/Button";
import { FormSectionTitle } from "../form-components/FormSectionTitle";

export const EventForm = ({ titles }) => {
  return (
    <>
      <FormSectionTitle>{titles?.one}</FormSectionTitle>
      <TextInput
        label="Namn på företag*"
        type="text"
        placeholder="Ex. Acme Company"
        name="companyName"
        isRequired
      ></TextInput>
      <TextInput
        label="Antal personer som kommer"
        type="select"
        name="Attendees"
      ></TextInput>

      <FormSectionTitle>{titles?.two}</FormSectionTitle>
      <TextInput
        label="för- och efternamn*"
        type="text"
        placeholder="Ex. Karl Andersson"
        name="fullname"
        isRequired
      ></TextInput>
      <TextInput
        label="E-post*"
        type="text"
        placeholder="Ex. email@example.com"
        name="email"
        isRequired
      ></TextInput>
      <TextInput
        label="Telefonnummer"
        type="tel"
        name="phone"
        placeholder="Ex. 073 123 45 67"
      ></TextInput>
      <Button
        textColor="white"
        backgroundColor="red"
        text="Anmäl företag"
        type="submit"
      ></Button>
    </>
  );
};
