"use client";

import { useState, useEffect } from "react";
import styled from "@emotion/styled";

export const SearchForm = ({ onSubmit, technologies }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const roleToTechMap = {
    "Digital designer": ["UI/UX", "Motion design", "Product design"],
    "Webbutvecklare": ["Frontend", "Backend", "Fullstack"],
  };

  useEffect(() => {
    onSubmit(searchQuery, selectedTechnologies);
  }, [searchQuery, selectedTechnologies]);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const toggleTechnology = (techId) => {
    setSelectedTechnologies((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId]
    );
  };

  const toggleRole = (role) => {
    const techNames = roleToTechMap[role];
    const techIds = technologies
      .filter((t) => techNames.includes(t.name))
      .map((t) => t.id);

    const isSelected = selectedRoles.includes(role);

    setSelectedRoles((prev) =>
      isSelected ? prev.filter((r) => r !== role) : [...prev, role]
    );

    setSelectedTechnologies((prev) => {
      const newSet = new Set(prev);
      if (isSelected) {
        // Avmarkera roller => ta bort techs
        techIds.forEach((id) => newSet.delete(id));
      } else {
        // Markera roller => lägg till techs
        techIds.forEach((id) => newSet.add(id));
      }
      return Array.from(newSet);
    });
  };

  return (
    <FormContainer onSubmit={(e) => e.preventDefault()}>
      <SearchRow>
        <SearchInput
          type="text"
          placeholder="Sök företag"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterToggle 
          type="button" 
          onClick={toggleFilters}
          isActive={showFilters}>
          Filter
        </FilterToggle>
      </SearchRow>

      {showFilters && (
        <FilterMenu>
          <div>
            <strong>Utbildning</strong>
            {Object.keys(roleToTechMap).map((role) => (
              <label key={role}>
                <input
                  type="checkbox"
                  checked={selectedRoles.includes(role)}
                  onChange={() => toggleRole(role)}
                />
                {role}
              </label>
            ))}
          </div>

          <div>
            <strong>Kunskaper</strong>
            {technologies.map((tech) => (
              <label key={tech.id}>
                <input
                  type="checkbox"
                  checked={selectedTechnologies.includes(tech.id)}
                  onChange={() => toggleTechnology(tech.id)}
                />
                {tech.name}
              </label>
            ))}
          </div>
        </FilterMenu>
      )}
    </FormContainer>
  );
};



// Styled components (oförändrade)

const FormContainer = styled.form`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: .5rem 1.5rem;
  border: none;
  border-radius: 2.5rem;
  background-color: var(--bg-white);
  font: inherit;
  background-image: url("/MagnifyingGlass.svg");
  background-size: 1.5rem;
  background-repeat: no-repeat;
  background-position: right 2rem center;


  @media screen and (min-width: 600px) {  
    padding: 1rem 2rem;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
  }
`;

const FilterToggle = styled.button`
  padding: .5rem 1.5rem;
  font: inherit;
  font-size: 0px;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ isActive }) => isActive ? "var(--white)" : "var(--Typocolor)"};
  background-color: ${({ isActive }) => isActive ? "var(--bg-blue)" : "var(--bg-white)"};
  background-image: ${({ isActive }) => isActive ? `url("/SlidersHorizontalWhite.svg")` : `url("/SlidersHorizontal.svg")`};
  background-size: 1.5rem;
  background-repeat: no-repeat;
  background-position: center;
  
  @media screen and (min-width: 600px) {  
    padding: 1rem 4.5rem 1rem 2rem;
    background-position: right 2rem center;
    font-size: 1rem;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const FilterMenu = styled.div`
  margin-top: 1rem;
  padding: .75rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.25rem;

  div:last-of-type {
    @media screen and (min-width: 600px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: .75rem;
    }
    @media screen and (min-width: 1030px) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: .75rem;
    }
  }

  strong {
    grid-column: 1 / -1;
    display: block;
    margin-bottom: 1rem;
  }

  label {
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: .75rem;

    input[type="checkbox"] {
      transform: scale(1.2);
    }
  }
`;
