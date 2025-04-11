"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { FormSectionTitle } from "../components/form-components/FormSectionTitle";
import Link from "next/link";
import { Hero } from "../components/common/Hero";
import styled from "@emotion/styled";

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
    variant === "matched" ? "var(--bg-red)" : "var(--bg-blue)"};
  color: white;
  transition: font-weight 0.3s;
  opacity: ${({ isActive }) => (isActive ? "1" : "0.5")};
`;

export default function RegisteredCompanies() {
  const [isMatched, setIsMatched] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Hämta data från Supabase
        const { data, error } = await supabase.from("companies").select("*");
        if (error) {
          throw error;
        }
        setCompanies(data);
      } catch (error) {
        setError("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []); // Tom array betyder att detta körs en gång vid laddning

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const heroProps = isMatched
    ? {
        backgroundColor: "red",
        title: "Matchade",
      }
    : {
        backgroundColor: "blue",
        title: "Alla",
      };

  return (
    <>
      <Hero {...heroProps} text="Företag"></Hero>

      <ToggleContainer>
        <ToggleButton
          isActive={isMatched}
          variant="matched"
          onClick={() => setIsMatched(true)}
        >
          Matchade företag
        </ToggleButton>
        <ToggleButton
          isActive={!isMatched}
          variant="all"
          onClick={() => setIsMatched(false)}
        >
          Alla företag
        </ToggleButton>
      </ToggleContainer>
      <section>
        <FormSectionTitle>Registered Companies</FormSectionTitle>
        <ul className="list">
          {companies.map((company) => (
            <li key={company.id}>
              <Link href={`/registered-companies/${company.id}`}>
                {company.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
