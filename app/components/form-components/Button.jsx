"use client";

import styled from "@emotion/styled";

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

export const Button = ({
  textColor,
  backgroundColor,
  text,
  type,
  formAction,
  onClick, 
}) => {
  return (
    <StyledButton
      formAction={formAction}
      textColor={textColor}
      backgroundColor={backgroundColor}
      type={type}
      onClick={onClick} 
    >
      {text}
    </StyledButton>
  );
};
