"use client";

import styled from "@emotion/styled";

const StyledLinkButton = styled.a(
  ({ backgroundColor, hasBorder }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 50%;
  height: 3rem;
  background-color: ${
    backgroundColor ? `var(--bg-${backgroundColor})` : `var(--bg-red)`
  };
  border: ${hasBorder ? `1px solid var(--white)` : `none`};
  color: var(--white);
  border-radius: 3.7rem;

  @media (min-width: 600px) {
    max-width: 35%;
  }

  @media (min-width: 1200px) {
    min-width: 50%;
  }
`
);

export const LinkButton = ({ text, href, backgroundColor, hasBorder, id }) => {
  return (
    <StyledLinkButton
      href={href}
      backgroundColor={backgroundColor}
      hasBorder={hasBorder}
      id={id}
    >
      {text}
    </StyledLinkButton>
  );
};
