"use client";

import { Input } from "../form-components/Input";
import { Button } from "../form-components/Button";
import { FormSectionTitle } from "../form-components/FormSectionTitle";
import { PolicyLink } from "../footer/PolicyLink";
import styled from "@emotion/styled";

const StyledSection = styled.section`
  align-self: flex-start;
  padding: 0;
`;

const StyledContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  img {
    width: 5%;
  }
`;

export const EventForm = ({ titles }) => {
  return (
    <form>
      <StyledSection>
        <StyledContainer>
          <img src="/calendar.svg" alt="a small calendar icon" />
          <strong>Datum:</strong> 23 april
        </StyledContainer>
        <StyledContainer>
          <img src="/clock.svg" alt="a small clock icon" />
          <strong>Tid:</strong> 13:00-15:00
        </StyledContainer>
        <StyledContainer>
          <img src="/mappin.svg" alt="a small map pin icon" />
          <strong>Plats:</strong> Visual Arena, Lindholmspiren 3<br />
        </StyledContainer>
      </StyledSection>
      <FormSectionTitle>{titles?.one}</FormSectionTitle>
      <Input
        label="Namn på företag*"
        type="text"
        placeholder="Ex. Acme Company"
        name="companyName"
        isRequired
      ></Input>
      <Input
        label="Antal personer som kommer"
        type="select"
        name="Attendees"
      ></Input>

      <FormSectionTitle>{titles?.two}</FormSectionTitle>
      <Input
        label="för- och efternamn*"
        type="text"
        placeholder="Ex. Karl Andersson"
        name="fullname"
        isRequired
      ></Input>
      <Input
        label="E-post*"
        type="text"
        placeholder="Ex. email@example.com"
        name="email"
        isRequired
      ></Input>
      <Input
        label="Telefonnummer"
        type="tel"
        name="phone"
        placeholder="Ex. 073 123 45 67"
      ></Input>
      <Input
        label="Jag har läst och godkänt"
        link={<PolicyLink></PolicyLink>}
        type="checkbox"
        name="policy"
      ></Input>
      <Button
        textColor="white"
        backgroundColor="red"
        text="Anmäl företag"
        type="submit"
      ></Button>
    </form>
  );
};
