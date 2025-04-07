"use client";

import styled from "@emotion/styled";

const StyledLinkButton = styled.a(
  ({ backgroundColor }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 3rem;
  background-color: ${
    backgroundColor ? `var(--bg-${backgroundColor})` : `var(--bg-red)`
  };
  border: ${backgroundColor ? `1px solid var(--white)` : `none`};
  color: var(--white);
  border-radius: 3.7rem;
`
);

export const LinkButton = ({ text, href, backgroundColor }) => {
  return (
    <StyledLinkButton href={href} backgroundColor={backgroundColor}>
      {text}
    </StyledLinkButton>
  );
};
