"use client";

import styled from "@emotion/styled";

const StyledTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  align-self: flex-start;
  margin-bottom: .75rem;

  @media (min-width: 1200px) {
    font-size: 2rem;
  }
`;

export const FormSectionTitle = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};
