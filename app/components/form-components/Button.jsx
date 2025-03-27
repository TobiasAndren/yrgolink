"use client";

import styled from "@emotion/styled";

const StyledLabel = styled.label`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledButton = styled.button(
  ({ textColor, backgroundColor }) => `
  color: var(--${textColor});
  background-color: var(--bg-${backgroundColor});
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3.5rem;
  border: none;
  gap: 0.5rem;
`
);

export const Button = ({ textColor, backgroundColor, label, text, type }) => {
  return (
    <StyledLabel>
      {label}
      <StyledButton
        textColor={textColor}
        backgroundColor={backgroundColor}
        type={type}
      >
        {text}
      </StyledButton>
    </StyledLabel>
  );
};
