"use client";

import styled from "@emotion/styled";

const StyledHero = styled.section(
  ({ backgroundColor, backgroundImage }) => `
    background-color: var(--bg-${backgroundColor});
    ${backgroundImage ? `background-image: url(${backgroundImage});` : ""}
    color: var(--white);
    padding: 2.5rem 1.25rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 11.25rem;
    width: 100%;
    transition: background-color 200ms ease-in-out;
    overflow: hidden;
    gap: 0.2rem;
    
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
        height: 2rem;
        font-size: 2rem;
        line-height: 2rem;
        font-style: normal;
        font-weight: 900;
        text-transform: uppercase;
    }
    
    h3 {
        height: 2rem;
        font-size: 2rem;
        font-weight: 200;
        line-height: 2rem;
        text-transform: uppercase;
        transition: all 150ms ease-in-out;
    }

    h3:hover {
        font-weight: 900;
    }

  @media (min-width: 600px) {
    padding: 0rem 3.5rem;
    min-height: 15rem;
    gap: 0.5rem;

    h1 {
      height: 2.5rem;
      font-size: 2.5rem;
    }

    h3 {
      height: 2.5rem;
      font-size: 2.5rem;
    }
  }

  @media (min-width: 768px) {
    padding: 0rem 6.5rem;
    min-height: 20rem;
    gap: 0.5rem;

    h1 {
      height: 3rem;
      font-size: 3rem;
    }

    h3 {
      height: 3rem;
      font-size: 3rem;
    }
  }

  @media (min-width: 1200px) {
    padding: 0rem 9.5rem;
    min-height: 30rem;
    gap: 0.5rem;

    h1 {
      height: 4.5rem;
      font-size: 4.5rem;
    }

    h3 {
      height: 4.5rem;
      font-size: 4.5rem;
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
}) => {
  return (
    <StyledHero
      backgroundColor={backgroundColor}
      className="slide-in"
      backgroundImage={backgroundImage}
    >
      {title && <h1>{title}</h1>}
      {text && <h3>{text}</h3>}
      {text2 && <h3>{text2}</h3>}
    </StyledHero>
  );
};
