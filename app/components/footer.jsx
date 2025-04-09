"use client";

import styled from "@emotion/styled";
import { PolicyLink } from "./footer/PolicyLink";

const StyledFooter = styled.footer`
  background-color: var(--bg-white);
  padding: 5rem 1.25rem;

  #hr {
    height: 1px;
    background-color: var(--bg-grey);
    width: 100%;
  }

  #socials {
    display: flex;
    gap: 0.75rem;
  }

  #importants {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    img {
      width: 25%;
    }
  }
`;

export function Footer() {
  return (
    <StyledFooter>
      <img src="/logo2.svg" alt="" />
      <div id="socials">
        <img src="/instagram.svg" alt="Instagram" />
        <img src="/facebook.svg" alt="Facebook" />
      </div>
      <ul>
        <li>Kontakt</li>
        <PolicyLink footer></PolicyLink>
        <li>För företag</li>
        <li>För studenter</li>
      </ul>
      <ul>
        <li>Nyheter</li>
        <li>Om Yrgo</li>
        <li>Frågor och svar</li>
      </ul>
      <span id="hr"></span>
      <div id="importants">
        <p>&copy; 2025 Yrgo, högre yrkesutbildning Göteborg</p>
        <img src="/gbg-stad-logo.svg" alt="Göteborgs stad logo" />
      </div>
    </StyledFooter>
  );
}
