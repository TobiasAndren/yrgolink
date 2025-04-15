"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Hero } from "./components/common/Hero";
import { Article } from "./components/common/Article";
import Styled from "@emotion/styled";

const StyledImage = Styled.img`
  width: 90%;
  object-fit: cover;
  align-self: center;
  
  @media(min-width: 600px) {
    width: 100%;
  }

  @media (min-width: 768px) {
    width: 50%;
    height: 30rem;
  }

  @media(min-width: 1200px) {
    height: 28rem;
  }
`;

const StyledContainer = Styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (min-width: 600px) {
    width: 80%;
    align-self: center;
  }

  @media (min-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    gap: 0;
  }

  @media (min-width: 1200px) {
    width: 80%;
  }
`;

export default function Home() {
  return (
    <>
      <Hero
        title="Välkommen till YrgoLink"  
        text={
          <>
            Hitta din nästa LIA –<br /> eller framtida kollega
          </>
        }
        backgroundColor="red"
        isLandingPage
      ></Hero>
      <StyledContainer>
        <StyledImage src="landing-page-image.svg" alt="" />
        <Article
          id="event-info"
          eventInfo
          title="Mingel mellan bransch och studerande på Yrgo"
          description="Varmt välkomna på mingelevent för att hitta framtida medarbetare i ert företag eller bara jobba tillsammans under LIA. Ni kommer att träffa Webbutvecklare och Digital Designers från Yrgo som vill visa vad de har jobbat med under året, och vi hoppas att ni hittar en match."
          linkButtonText="Anmäl er här"
          link="/event-signup"
          buttonBackgroundColor="blue"
        ></Article>
      </StyledContainer>
      <StyledContainer>
        <Article
          id="signup"
          title="Hitta din nästa LIA-plats
        eller framtida medarbetare
        via YrgoLink"
          description="YrgoLink för samman nytänkande studenter och framtidens arbetsgivare – oavsett om du söker en LIA-plats eller vill rekrytera nya stjärnor till teamet."
          linkButtonText="Registrera dig här"
          link="/signup"
        ></Article>
        <Article
          title="Utforska företag"
          description="Bläddra bland företag och hitta din perfekta match för LIA."
          linkButtonText="Se företag här"
          link="/"
          backgroundColor="blue"
          buttonBackgroundColor="blue"
          buttonHasBorder
        ></Article>
      </StyledContainer>
    </>
  );
}
