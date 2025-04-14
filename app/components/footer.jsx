"use client";

import styled from "@emotion/styled";
import { PolicyLink } from "./footer/PolicyLink";

const StyledFooter = styled.footer`
  background-color: var(--bg-white);
  padding: 5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 2.25rem;

  #logo-container {
    display: flex;
    gap: 2.25rem;
    flex-direction: column;
  }

  #logo {
    width: 35%;
  }

  #links {
    display: flex;
    flex-direction: column;
    gap: 2.25rem;
  }

  li {
    font-size: 1rem;
    font-weight: 400;
  }

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

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;

    #links {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      padding-top: 1.25rem;
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }

    #logo-container {
      align-items: center;
      order: 2;
    }

    #info-links {
      order: 1;
    }

    #important-links {
      order: 3;
    }

    #important-links,
    #info-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      li {
        line-height: 1.375rem;
      }
    }

    #hr {
      display: none;
    }

    #importants {
      width: 100%;
      height: 3%;
      justify-content: space-between;
      flex-direction: row;
      padding: 0 0.6rem;
      padding-top: 3.5rem;

      p {
        order: 2;
      }

      img {
        width: auto;
        order: 1;
      }
    }
  }

  @media (min-width: 1200px) {
    #links {
      padding-top: 1.25rem;
      padding-left: 10.8rem;
      padding-right: 10.8rem;
    }

    #socials img {
      transition: all 150ms ease-in-out;
    }

    #socials img:hover {
      transform: scale(1.1);
      cursor: pointer;
    }

    li:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export function Footer() {
  return (
    <StyledFooter>
      <div id="links">
        <div id="logo-container">
          <img src="/logo2.svg" alt="" id="logo" />
          <div id="socials">
            <img src="/instagram.svg" alt="Instagram" />
            <img src="/facebook.svg" alt="Facebook" />
          </div>
        </div>
        <ul id="important-links">
          <li>Kontakt</li>
          <PolicyLink footer></PolicyLink>
          <li>För företag</li>
          <li>För studenter</li>
        </ul>
        <ul id="info-links">
          <li>Nyheter</li>
          <li>Om Yrgo</li>
          <li>Frågor och svar</li>
        </ul>
      </div>
      <span id="hr"></span>
      <div id="importants">
        <p>&copy; 2025 Yrgo, högre yrkesutbildning Göteborg</p>
        <img src="/gbg-stad-logo.svg" alt="Göteborgs stad logo" />
      </div>
    </StyledFooter>
  );
}
