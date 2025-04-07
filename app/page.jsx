"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { TestContainer } from "./components/test-container";
import { Hero } from "./components/common/Hero";
import { Article } from "./components/common/Article";
import Styled from "@emotion/styled";

const StyledImage = Styled.img`
  width: 90%;
  object-fit: cover;
  align-self: center;
`;

export default function Home() {
  return (
    <>
      <Hero
        title="Välkommen till YrgoLink"
        text="Hitta din nästa lia eller framtida kollega"
        backgroundColor="red"
        isLandingPage
      ></Hero>
      <StyledImage src="landing-page-image.svg" alt="" />
      <Article
        id="event-signup"
        eventInfo
        title="Mingel mellan bransch och studerande på Yrgo"
        description="Varmt välkomna på mingelevent för att hitta framtida medarbetare i ert företag eller bara jobba tillsammans under LIA. Ni kommer att träffa Webbutvecklare och Digital Designers från Yrgo som vill visa vad de har jobbat med under året, och vi hoppas att ni hittar en match."
        linkButtonText="Anmäl er här"
        link="/event-signup"
      ></Article>
      <Article
        id="signup"
        title="Hitta din nästa LIA-plats
        eller framtida medarbetare
        via YrgoLink"
        description="YrgoLink för samman nytänkande studenter och framtidens arbetsgivare – oavsett om du söker en LIA-plats eller vill rekrytera nya stjärnor till teamet."
        linkButtonText="Registrera dig här"
        link="/signupp"
      ></Article>
      <Article
        title="Utforska företag"
        description="Bläddra bland företag och hitta din perfekta match för LIA."
        linkButtonText="Se företag här"
        link="/"
        backgroundColor="blue"
      ></Article>
    </>
  );
}
