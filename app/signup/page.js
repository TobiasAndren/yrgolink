"use client";

import { Form } from "../components/forms/Form";
import styled from "@emotion/styled";
import React from "react";

const ToggleContainer = styled.div`
  display: flex;
  width: 100%;
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
        two: "Företags information",
        three: "LIA-platser",
      }
    : { one: "Kontodetaljer", two: "Personuppgifter", three: "Länkar" };
  return (
    <>
      <ToggleContainer>
        <ToggleButton
          isActive={!isCompany}
          variant="student"
          onClick={() => setIsCompany(false)}
        >
          Student
        </ToggleButton>
        <ToggleButton
          isActive={isCompany}
          variant="company"
          onClick={() => setIsCompany(true)}
        >
          Företag
        </ToggleButton>
      </ToggleContainer>

      <Form company={isCompany} student={!isCompany} titles={titles}></Form>
    </>
  );
}
