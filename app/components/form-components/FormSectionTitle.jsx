"use client";

import styled from "@emotion/styled";

const StyledTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 400;
  align-self: flex-start;
  padding-left: 1.25rem;
`;

export const FormSectionTitle = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};
