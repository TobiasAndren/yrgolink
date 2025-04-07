"use client";

import styled from "@emotion/styled";

const StyledButton = styled.button(
  ({ textColor, backgroundColor, width }) => `
  color: var(--${textColor});
  background-color: var(--bg-${backgroundColor});
  width: 100%;
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3.5rem;
  border: none;
  gap: 0.5rem;
  transition: all 200ms ease-in-out;

  &:hover {
    transform: scale(1.01);
  }

  &:active {
    background-color: var(--bg-blue);
    transform: translateY(0.1rem);
  }
`
);

export const Button = ({
  textColor,
  backgroundColor,
  width,
  text,
  type,
  formAction,
}) => {
  return (
    <StyledButton
      formAction={formAction}
      textColor={textColor}
      backgroundColor={backgroundColor}
      width={width}
      type={type}
    >
      {text}
    </StyledButton>
  );
};
