"use client";

import { Form } from "../components/forms/Form";
import styled from "@emotion/styled";
import React from "react";
import { Hero } from "../components/common/Hero";

const ToggleContainer = styled.div`
  display: flex;
  width: 100%;

  @media (min-width: 768px) {
    width: 70%;
    align-self: center;
  }

  @media (min-width: 1200px) {
    margin-top: 4rem;
    margin-bottom: 2rem;
    width: 50%;
    align-self: center;
  }
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  background-color: ${({ variant }) =>
    variant === "company" ? "var(--bg-blue)" : "var(--bg-red)"};
  color: white;
  transition: font-weight 0.3s;
  opacity: ${({ isActive }) => (isActive ? "1" : "0.5")};
`;

export default function Home() {
  const [isCompany, setIsCompany] = React.useState(true);

  const titles = isCompany
    ? {
        one: "Kontodetaljer",
        two: "Företagsinformation",
        three: "LIA-platser",
      }
    : { one: "Kontodetaljer", two: "Personuppgifter", three: "Länkar" };

  const heroProps = isCompany
    ? {
        backgroundColor: "blue",
        text: "Företag",
      }
    : {
        backgroundColor: "red",
        text: "Student",
      };

  return (
    <>
      <Hero {...heroProps} title="registrera"></Hero>
      <ToggleContainer>
        <ToggleButton
          isActive={isCompany}
          variant="company"
          onClick={() => setIsCompany(true)}
        >
          Företag
        </ToggleButton>
        <ToggleButton
          isActive={!isCompany}
          variant="student"
          onClick={() => setIsCompany(false)}
        >
          Student
        </ToggleButton>
      </ToggleContainer>

      <Form company={isCompany} student={!isCompany} titles={titles}></Form>
    </>
  );
}
