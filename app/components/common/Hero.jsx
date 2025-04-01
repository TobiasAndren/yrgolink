"use client";

import styled from "@emotion/styled";

const StyledHero = styled.section(
  ({ backgroundColor, backgroundImage }) => `
    background-color: var(--bg-${backgroundColor});
    background-image: url(${backgroundImage});
    color: var(--white);
    padding: 2.5rem 1.25rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 11.25rem;
    width: 100%;
    transition: background-color 200ms ease-in-out;
    overflow: hidden;
    
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
        line-height: 2rem;
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
    }

    h3:hover {
        font-weight: 900;
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
