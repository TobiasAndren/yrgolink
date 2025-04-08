"use client";

import styled from "@emotion/styled";
import { LinkButton } from "./LinkButton";

const StyledArticle = styled.article(
  ({ backgroundColor }) => `
  width: 100%;
  background-color: ${
    backgroundColor ? `var(--bg-${backgroundColor})` : "var(--bg-grey)"
  };
  color: ${backgroundColor ? `var(--white)` : `var(--black)`};
  ${
    backgroundColor &&
    `padding-top: 2.5rem;
    padding-bottom: 2.5rem;`
  };
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  scroll-margin-top: 2.5rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.5rem;
  }

  section {
    display: flex;
    flex-direction: row;
    gap: 2.5rem;
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  div h3 {
    color: var(--bg-red);
    text-transform: uppercase;
    font-size: 1.25rem;
    line-height: 1.375em;
  }

  div span {
    font-size: 1.1rem;
    font-weight: 400;
  }

  p {
    font-weight: 400;
    line-height: 1.375rem;
  }

  @media (min-width: 600px) {
    padding: 2rem;
    background-color: ${
      backgroundColor ? `var(--bg-${backgroundColor})` : "var(--bg-white)"
    };
  }

  @media (min-width: 1200px) {
    width: 50%;
    display: flex;
    justify-content: space-between;
  }
`
);

export const Article = ({
  title,
  description,
  linkButtonText,
  link,
  backgroundColor,
  buttonBackgroundColor,
  eventInfo,
  id,
  buttonHasBorder,
}) => {
  return (
    <StyledArticle backgroundColor={backgroundColor} id={id}>
      <h2>
        <strong>{title}</strong>
      </h2>
      {eventInfo && (
        <section aria-label="event-info">
          <div>
            <h3>När?</h3>
            <span>23 april</span>
            <span>13:00 - 15:00</span>
          </div>
          <div>
            <h3>var?</h3>
            <span>Visual Arena</span>
            <span>Lindholmspiren 3</span>
          </div>
        </section>
      )}
      <p>{description}</p>
      <LinkButton
        text={linkButtonText}
        href={link}
        backgroundColor={buttonBackgroundColor}
        hasBorder={buttonHasBorder}
      ></LinkButton>
    </StyledArticle>
  );
};
