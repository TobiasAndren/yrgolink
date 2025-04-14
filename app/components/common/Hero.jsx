"use client";

import styled from "@emotion/styled";
import { LinkButton } from "./LinkButton";

const StyledHero = styled.section(
  ({ backgroundColor, backgroundImage }) => `
    background-color: var(--bg-${backgroundColor});
    ${backgroundImage ? `background-image: url(${backgroundImage});` : ""}
    background-size: cover;
    color: var(--white);
    padding: 2.5rem 1.25rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 11.275rem;
    width: 100%;
    transition: background-color 200ms ease-in-out;
    overflow: hidden;
    gap: 2rem;
    
    &.slide-in {
      animation: slideIn 0.5 ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    h1, h2 {
      font-size: 2rem;
      line-height: 1em;
      text-transform: uppercase;
    }

    h1 {
        font-weight: 900;
    }
    
    h2 {
      display: inline;
      font-weight: 200;
    }

    #lia-link {
      line-height: 1rem;
      font-weight: 500;
      text-decoration: underline;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

  @media (min-width: 600px) {
    padding: 2.5rem 4rem;
    min-height: 20rem;
    gap: 0.5rem;

    h1, h2 {
      font-size: 2.5rem;
      max-width: 65%;
    }
  }

  @media (min-width: 768px) {
    padding: 3rem 7rem;
    min-height: 25rem;
    gap: 0.5rem;

    h1, h2 {
      font-size: 3rem;
      max-width: 70%;
    }
  }

  @media (min-width: 1200px) {
    padding: 6rem 9.5rem;
    min-height: 90vh;
    gap: 0.5rem;

    
    h1, h2 {
      font-size: 6rem;
      max-width: 90%;
      text-wrap: wrap;
    }

    h2 {
      transition: all 150ms ease-in-out;
    }

    h2:hover {
      font-weight: 900;
    }

    div {
      flex-direction: row;
      width: 30%;
      align-items: center;
      padding-top: 4rem;
    }

    #lia-link {
      order: 1;
    }

    #signup-button {
      order: 2;
    }
  }
`
);

export const Hero = ({
  backgroundColor,
  title,
  text,
  text2,
  backgroundImage,
  isLandingPage,
}) => {
  return (
    <StyledHero
      backgroundColor={backgroundColor}
      className="slide-in"
      backgroundImage={backgroundImage}
      isLandingPage={isLandingPage}
    >
      <article>
        {title && <h1>{title}</h1>}
        {text && (
          <h2>
            {text} <br></br>
            {text2}
          </h2>
        )}
      </article>
      {isLandingPage && (
        <div>
          <LinkButton
            href="/event-signup"
            text="Anmäl er här"
            backgroundColor="red"
            hasBorder
            id="signup-button"
          ></LinkButton>
          <a href="#event-info" id="lia-link">
            LIA-event 2025
          </a>
        </div>
      )}
    </StyledHero>
  );
};
