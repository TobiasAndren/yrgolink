"use client";

import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // justera path vid behov
import { Form } from "../components/forms/Form";
import { Hero } from "../components/common/Hero";

export default function Home() {
  const [isCompany, setIsCompany] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push("/profile");
      }
    };
    checkUser();
  }, []);

  const titles = isCompany
    ? {
        one: "Kontodetaljer",
        two: "Företagsinformation",
        three: "LIA-platser",
      }
    : { one: "Kontodetaljer", two: "Personuppgifter", three: "Länkar" };

  const heroProps = isCompany
    ? { backgroundColor: "blue", text: "Företag" }
    : { backgroundColor: "red", text: "Student" };

  return (
    <>
      <Hero {...heroProps} title="registrera" />
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
      <Form
        signupCompany={isCompany}
        signupStudent={!isCompany}
        titles={titles}
      />
    </>
  );
}

const ToggleContainer = styled.div`
  display: flex;
  width: 100%;
  @media (min-width: 768px) {
    width: 70%;
    align-self: center;
  }
  @media (min-width: 1200px) {
    margin-top: 2.5rem;
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