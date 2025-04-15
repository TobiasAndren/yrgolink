"use client";

import styled from "@emotion/styled";
import { useState } from "react";

const StyledHeader = styled.header`
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  background-color: var(--bg-white);
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;

  a {
    display: flex;
    align-items: center;
  }

  div {
    display: flex;
    justify-content: end;
    gap: 0.75rem;
    width: 5%;
  }

  @media (min-width: 768px) {
    justify-content: space-between;
    align-items: center;

    #hamburger-menu {
      display: none;
    }
  }
`;

const DesktopNav = styled.nav`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    gap: 2rem;
    font-weight: 700;

    a:hover {
      text-decoration: underline;
    }
  }
`;

const MobileNav = styled.nav(
  ({ isActive }) => `
  overflow: hidden;
  display: flex;
  max-height: ${isActive ? `15rem` : `0`};
  transform-origin: top;
  transform: ${isActive ? `scaleY(1)` : `scaleY(0)`};
  opacity: ${isActive ? `1` : `0`};
  flex-direction: column;
  transition: all 300ms ease-in-out;
  gap: 1rem;
  background-color: ${isActive ? `var(--bg-grey)` : `transparent`};
  padding: ${isActive ? `1rem 1.5rem` : `0 1.5rem`};

  a {
    height: 100%;
    width: 100%;
    text-decoration: underline;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.5rem;
  }
`
);

export const Header = ({}) => {
  const [isActive, setIsActive] = useState(false);

  function handleHamburger() {
    setIsActive((prev) => !prev);
  }

  return (
    <>
      <StyledHeader>
        <a href="/">
          <img src="/logo-link.svg" alt="" />
        </a>
        <DesktopNav>
          <a href="/event-signup">Anmälan LIA-event</a>
          <a href="/signup">Registrera konto</a>
          <a href="/registered-companies">Bläddra bland företag</a>
        </DesktopNav>

        <div>
          <a href="/profile">
            <img src="/profile-button.svg" alt="profile icon" />
          </a>
          <a href="#" id="hamburger-menu" onClick={handleHamburger}>
            <img src="/hamburger.svg" alt="hamburger menu" />
          </a>
        </div>
      </StyledHeader>
      <MobileNav isActive={isActive}>
        <a href="/event-signup">Anmälan LIA-event</a>
        <hr />
        <a href="/signup">Registrera konto</a>
        <hr />
        <a href="/registered-companies">Bläddra bland företag</a>
      </MobileNav>
    </>
  );
};
