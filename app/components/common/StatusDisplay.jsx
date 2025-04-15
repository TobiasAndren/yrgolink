"use client";

import styled from "@emotion/styled";

const StyledStatus = styled.p(
  ({ isError }) => `
  background-color: ${isError ? `#FFCCCC` : `#DFF2BF`};
  color: ${isError ? `#800000` : `#1E5700`};
  align-self: center;
  width: 90%;
  border-radius: 0.75rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  font-weight: 400;
  gap: 1rem;
  border: 1px solid ${isError ? `#800000` : `#1E5700`};
  height: 3rem;
  margin-bottom: 2.5rem;

  img {
    height: 1.25rem;
  }

  @media (min-width: 600px) {
    width: 80%;
  }

  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 1200px) {
    width: 50%;
  }
`
);

export function StatusDisplay({ isError, children }) {
  return (
    <StyledStatus isError={isError}>
      {isError ? (
        <img src="red-x.svg" alt="" />
      ) : (
        <img src="green-check.svg" alt="" />
      )}
      {children}
    </StyledStatus>
  );
}
