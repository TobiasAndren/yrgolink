"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { FormSectionTitle } from "../components/form-components/FormSectionTitle";
import Link from "next/link";
import { Hero } from "../components/common/Hero";
import { SearchForm } from "../components/forms/SearchFilterForm";
import styled from "@emotion/styled";

export default function RegisteredCompanies() {
  const router = useRouter();
  const [isMatched, setIsMatched] = useState(false); // Start with showing all companies
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [matchedCompanies, setMatchedCompanies] = useState([]);
  const [allTechnologies, setAllTechnologies] = useState([]);
  const [companyTechnologies, setCompanyTechnologies] = useState([]);
  const [studentTechnologies, setStudentTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isStudent, setIsStudent] = useState(false); // Track if user is a student
  const [isCompany, setIsCompany] = useState(false); // Track if user is a company

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        // If the user is logged in, check if they are a student or a company
        if (user) {
          const { data: student, error: studentError } = await supabase
            .from("students")
            .select("id")
            .eq("id", user.id)
            .single();

          if (student && !studentError) {
            setIsStudent(true);
            setIsCompany(false); // It's not a company if the user is a student
          } else {
            setIsStudent(false); // The user is not a student
            setIsCompany(true); // Assume it's a company if not a student
          }
        }

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

        // If the user is a student, match companies based on their technologies
        if (isStudent) {
          const { data: studentTechs } = await supabase
            .from("student_technologies")
            .select("technology_id")
            .eq("student_id", user.id);

          const studentTechIds = studentTechs?.map((t) => t.technology_id) || [];
          setStudentTechnologies(studentTechIds);

          if (studentTechIds.length > 0 && companiesData && compTech) {
            const matched = companiesData.filter((company) => {
              // Get the technologies for the company
              const techsForCompany = compTech
                .filter((ct) => ct.company_id === company.id)
                .map((ct) => ct.technology_id);

              // Check if any technology for the company matches the student's technologies
              return techsForCompany.some((techId) => studentTechIds.includes(techId));
            });

            setMatchedCompanies(matched);
          }
        }
      } catch (err) {
        console.error(err);
        setError("Något gick fel vid hämtning av data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isStudent]);

  const handleSearch = (query, selectedTechIds, selectedClasses) => {
    const lowerQuery = query.toLowerCase();
    const noQuery = lowerQuery.trim() === "";
    const noTechs = selectedTechIds.length === 0;
    const noClasses = selectedClasses.length === 0;
  
    const classToTechMap = {
      "Digital designer": ["UI/UX", "Motion design", "Product design"],
      "Webbutvecklare": ["Frontend", "Backend", "Fullstack"],
    };
  
    const classTechNames = selectedClasses.flatMap((Class) => classToTechMap[Class] || []);
  
    const classTechIds = allTechnologies
      .filter((tech) => classTechNames.includes(tech.name))
      .map((tech) => tech.id);
  
    const combinedTechIds = [...new Set([...selectedTechIds, ...classTechIds])];
  
    if (noQuery && combinedTechIds.length === 0) {
      setFilteredCompanies(companies);
      return;
    }
  
    let filtered = companies;
  
    if (!noQuery) {
      filtered = filtered.filter((company) =>
        company.name.toLowerCase().includes(lowerQuery)
      );
    }
  
    if (combinedTechIds.length > 0) {
      filtered = filtered.filter((company) => {
        const techsForCompany = companyTechnologies
          .filter((ct) => ct.company_id === company.id)
          .map((ct) => ct.technology_id);
  
        // If class is checked (or class + techs) show companies that match any of those
        if (selectedClasses.length > 0 && selectedTechIds.length === 0) {
          return classTechIds.some((id) => techsForCompany.includes(id));
        }
  
        // If techs are checked, show companies matching all techs
        return combinedTechIds.every((id) => techsForCompany.includes(id));
      });
    }
  
    setFilteredCompanies(filtered);
  };  

  const toggleView = () => {
    setIsMatched((prevState) => !prevState);
  };

  const heroProps = isMatched
    ? { backgroundColor: "red", title: "Matchade" }
    : { backgroundColor: "blue", title: "Alla" };

  if (loading) return <section><p>Laddar...</p></section>;
  if (error) return <section><p>{error}</p></section>;

  return (
    <>
      <Hero {...heroProps} text="Företag" />

      {isStudent && ( // Show toggle only for students
        <section>
          <ToggleContainer>
            <ToggleButton
              isActive={!isMatched}
              variant="all"
              onClick={toggleView}
            >
              Alla företag
            </ToggleButton>
            <ToggleButton
              isActive={isMatched}
              variant="matched"
              onClick={toggleView}
            >
              Matchade företag
            </ToggleButton>
          </ToggleContainer>
        </section>
      )}

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

const ToggleContainer = styled.div`
  display: flex;
  width: 100%;
  @media (min-width: 768px) {
    align-self: center;
  }
  @media (min-width: 1200px) {
    margin-top: 2.5rem;
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
