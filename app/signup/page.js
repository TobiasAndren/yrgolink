"use client";

import { Form } from "../components/form/form";
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
    variant === "student" ? "var(--bg-red)" : "var(--bg-blue)"};
  color: white;
  transition: font-weight 0.3s;
  opacity: ${({ isActive }) => (isActive ? "1" : "0.5")};
`;

export default function Home() {
  const [isStudent, setIsStudent] = React.useState(true);

  return (
    <>
      <ToggleContainer>
        <ToggleButton
          isActive={isStudent}
          variant="student"
          onClick={() => setIsStudent(true)}
        >
          Student
        </ToggleButton>
        <ToggleButton
          isActive={!isStudent}
          variant="company"
          onClick={() => setIsStudent(false)}
        >
          Företag
        </ToggleButton>
      </ToggleContainer>

      <Form
        company={!isStudent}
        student={isStudent}
        titles={{
          one: "Kontodetaljer",
          two: "Företags information",
          three: "LIA-platser",
        }}
      ></Form>
    </>
  );
}

{
  /* <Form
  event
  titles={{ one: "Företagsinformation", two: "Kontaktperson" }}
></Form> */
}
