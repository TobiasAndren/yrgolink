"use client";

import styled from "@emotion/styled";
import { Input } from "./input";
import { Button } from "./button";

const StyledForm = styled.form`
  height: auto;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  align-self: stretch;
`;

const StyledTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 400;
  align-self: flex-start;
  padding-left: 1.25rem;
`;

export const Form = ({ event, student, company, titles, action, method }) => {
  return (
    <StyledForm action={action} method={method}>
      {event && (
        <>
          <StyledTitle>{titles?.one}</StyledTitle>
          <Input
            label="Namn på företag*"
            type="text"
            placeholder="Ex. Acme Company"
            isRequired
          ></Input>
          <Input label="Antal personer som kommer*" type="select"></Input>

          <StyledTitle>{titles?.two}</StyledTitle>
          <Input
            label="för- och efternamn*"
            type="text"
            placeholder="Ex. Karl Andersson"
            isRequired
          ></Input>
          <Input
            label="E-post*"
            type="text"
            placeholder="Ex. email@example.com"
            isRequired
          ></Input>
          <Input
            label="Telefonnummer"
            type="text"
            placeholder="Ex. 073 123 45 67"
          ></Input>
          <Button
            textColor="white"
            backgroundColor="red"
            text="Anmäl företag"
            type="submit"
          ></Button>
        </>
      )}

      {student && (
        <>
          <StyledTitle>{titles.one}</StyledTitle>
          <Input
            label="E-post*"
            type="email"
            placeholder="Ex. email@example.com"
            isRequired
          ></Input>
          <Input
            label="Lösenord*"
            type="password"
            placeholder="Enter password"
          ></Input>

          <StyledTitle>{titles.two}</StyledTitle>
          <Input
            label="Förnamn*"
            type="text"
            placeholder="Ex. Karl"
            isRequired
          ></Input>
          <Input
            label="Efternamn*"
            type="text"
            placeholder="Ex. Andersson"
            isRequired
          ></Input>
          <Input label="Klass" type="text"></Input>
          <Input
            label="Om mig"
            type="text"
            placeholder="Skriv kort om dig själv"
          ></Input>
          <StyledTitle>{titles.three}</StyledTitle>
          <Input
            label="Portfolio"
            type="text"
            placeholder="Ex. www.portfolio.se"
          ></Input>
          <Input
            label="Linked in"
            type="text"
            placeholder="Ex. www.linkedin.se/example"
          ></Input>
          <Input label="CV" type="file"></Input>

          <Input label="program och tekniska kunskaper"></Input>
          <Button
            textColor="white"
            backgroundColor="red"
            text="Anmäl företag"
            type="submit"
          ></Button>
        </>
      )}
      {company && (
        <>
          <StyledTitle>{titles.one}</StyledTitle>
          <Input
            label="E-post*"
            type="email"
            placeholder="Ex. email@example.com"
            isRequired
          ></Input>
          <Input label="Lösenord*" type="password"></Input>

          <StyledTitle>{titles.two}</StyledTitle>
          <Input
            label="Namn*"
            type="text"
            placeholder="Ex. Acme Company"
            isRequired
          ></Input>
          <Input
            label="Hemsida*"
            type="text"
            placeholder="Ex. www.acemecompany.se"
            isRequired
          ></Input>
          <Input
            label="Kontaktperson namn"
            type="text"
            placeholder="Ex. Karl Andersson"
          ></Input>
          <Input
            label="Kontaktperson e-post"
            type="text"
            placeholder="Ex. karlandersson@example.com"
          ></Input>
          <StyledTitle>{titles.three}</StyledTitle>
          <Input
            label="Beskrivning av LIA-platser"
            type="text"
            placeholder="Skriv kort om era LIA-platser"
          ></Input>
          <Input label="Möjliga Arbetsformer" type="text"></Input>

          <Input label="Kunskaper som sökes"></Input>
          <Button
            textColor="white"
            backgroundColor="blue"
            text="Registrera företag"
            type="submit"
          ></Button>
        </>
      )}
    </StyledForm>
  );
};
