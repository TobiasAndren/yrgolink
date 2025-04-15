"use client";

import styled from "@emotion/styled";

const StyledMain = styled.main`
  background: var(--bg-grey);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (min-width: 600px) {
    padding-bottom: 2.5rem;
  }

  @media (min-width: 768px) {
    padding-bottom: 3rem;
  }

  @media (min-width: 1200px) {
    padding-bottom: 3.5rem;
  }
`;

export function Main({ children }) {
  return <StyledMain>{children}</StyledMain>;
}
