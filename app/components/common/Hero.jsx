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
    min-height: 11.25rem;
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

    h1 {
        font-size: 2rem;
        line-height: 1em;
        font-style: normal;
        font-weight: 900;
        text-transform: uppercase;
    }
    
    h3 {
        font-size: 2rem;
        font-weight: 200;
        line-height: 2rem;
        text-transform: uppercase;
        transition: all 150ms ease-in-out;
        line-height: 1em;
    }

    #LIA-link {
      line-height: 1rem;
      font-weight: 500;
      text-decoration: underline;
      text-underline-offset: 3px;
    }

  @media (min-width: 600px) {
    padding: 0rem 3.5rem;
    min-height: 15rem;
    gap: 0.5rem;

    h1 {
      font-size: 2.5rem;
    }

    h3 {
      font-size: 2.5rem;
    }
  }

  @media (min-width: 768px) {
    padding: 0rem 6.5rem;
    min-height: 20rem;
    gap: 0.5rem;

    h1 {
      font-size: 3rem;
    }

    h3 {
      font-size: 3rem;
    }
  }

  @media (min-width: 1200px) {
    padding: 0rem 9.5rem;
    min-height: 30rem;
    gap: 0.5rem;

    h1 {
      font-size: 4.5rem;
    }

    h3 {
      font-size: 4.5rem;
    }

    h3:hover {
      font-weight: 900;
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
          <h3>
            {text} <br></br>
            {text2}
          </h3>
        )}
      </article>
      {isLandingPage && (
        <>
          <LinkButton
            href="/event-signup"
            text="Anmäl er här"
            backgroundColor="red"
          ></LinkButton>
          <a href="#event-signup" id="LIA-link">
            LIA-event 2025
          </a>
        </>
      )}
    </StyledHero>
  );
};
