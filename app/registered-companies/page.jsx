"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { FormSectionTitle } from "../components/form-components/FormSectionTitle";
import Link from "next/link";
import { Hero } from "../components/common/Hero";
import styled from "@emotion/styled";
import { SearchForm } from "../components/forms/SearchFilterForm";

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
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [matchedCompanies, setMatchedCompanies] = useState([]);
  const [allTechnologies, setAllTechnologies] = useState([]);
  const [companyTechnologies, setCompanyTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: companiesData }, { data: techData }, { data: compTech }] =
          await Promise.all([
            supabase.from("companies").select("id, name"),
            supabase.from("technologies").select("*"),
            supabase.from("company_technologies").select("*"),
          ]);

        setCompanies(companiesData || []);
        setAllTechnologies(techData || []);
        setCompanyTechnologies(compTech || []);
        setFilteredCompanies(companiesData || []);
        setMatchedCompanies(companiesData || []); // <- Här kan du lägga till matchningslogik senare
      } catch (err) {
        console.error(err);
        setError("Något gick fel vid hämtning av data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query, selectedTechIds) => {
    const lowerQuery = query.toLowerCase();
    const noQuery = lowerQuery.trim() === "";
    const noTechs = selectedTechIds.length === 0;

    // Visa alla om inget är valt
    if (noQuery && noTechs) {
      setFilteredCompanies(companies);
      return;
    }

    // Filtrera på namn
    let filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(lowerQuery)
    );

    // Filtrera på teknik
    if (!noTechs) {
      filtered = filtered.filter((company) => {
        const techsForCompany = companyTechnologies
          .filter((ct) => ct.company_id === company.id)
          .map((ct) => ct.technology_id);

        return selectedTechIds.every((id) => techsForCompany.includes(id));
      });
    }

    setFilteredCompanies(filtered);
  };

  const heroProps = isMatched
    ? { backgroundColor: "red", title: "Matchade" }
    : { backgroundColor: "blue", title: "Alla" };

  if (loading) return <section><p>Laddar...</p></section>;
  if (error) return <section><p>{error}</p></section>;

  return (
    <>
      <Hero {...heroProps} text="Företag" />

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

      <section style={{ padding: 0 }}>
        {isMatched ? (
          <>
            <FormSectionTitle>Du har matchat med</FormSectionTitle>
            {matchedCompanies.length > 0 ? (
              <ul className="list">
                {matchedCompanies.map((company) => (
                  <li key={company.id}>
                    <Link href={`/registered-companies/${company.id}`}>
                      {company.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Inga matchade företag.</p>
            )}
          </>
        ) : (
          <>
            <SearchForm
              onSubmit={handleSearch}
              technologies={allTechnologies}
            />
            {filteredCompanies.length > 0 ? (
              <ul className="list">
                {filteredCompanies.map((company) => (
                  <li key={company.id}>
                    <Link href={`/registered-companies/${company.id}`}>
                      {company.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Inga företag matchade din sökning.</p>
            )}
          </>
        )}
      </section>
    </>
  );
}
