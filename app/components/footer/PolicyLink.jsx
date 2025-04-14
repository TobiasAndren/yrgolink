"use client";

import { useState } from "react";
import { IntegrityPolicy } from "../common/IntegrityPolicy";
import styled from "@emotion/styled";

const StyledLink = styled.span(
  ({ textColor, footer }) => `
    background: none;
    border: none;
    color: ${textColor};
    text-decoration: ${footer ? "none" : "underline"};
    cursor: pointer;
    font-size: ${footer ? "1rem" : "0.875rem"};
    font-weight: 400;
`
);

export const PolicyLink = ({ footer }) => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  return (
    <>
      <StyledLink
        footer={footer}
        role="button"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsPolicyOpen(true);
        }}
      >
        {footer ? "Integritetspolicy" : "integritetspolicyn."}
      </StyledLink>

      <IntegrityPolicy
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      >
        <h3>Senast uppdaterad: 27 Mars 2025</h3>
        <p>
          På YrgoLink värnar vi om din personliga integritet. Denna
          integritetspolicy förklarar hur vi samlar in, använder och skyddar
          dina personuppgifter när du använder vår tjänst. När du registrerar
          dig som elev eller företag samlar vi in grundläggande uppgifter som
          namn, e-postadress och annan information du väljer att dela i din
          profil eller vid eventanmälan. Denna information används för att
          administrera ditt konto, möjliggöra kontakt mellan användare, och ge
          dig tillgång till våra funktioner – som att söka eller publicera
          LIA-annonser samt delta i event. Vi sparar bara personuppgifter så
          länge det är nödvändigt för att tillhandahålla tjänsten eller uppfylla
          rättsliga krav. Vi lämnar aldrig ut dina uppgifter till tredje part
          utan ditt samtycke, såvida det inte krävs enligt lag. Du har rätt att
          när som helst begära tillgång till dina personuppgifter, få dem
          rättade eller raderade. Du kan också begära att vi begränsar hur dina
          uppgifter används, eller invända mot viss behandling. Vi använder
          tekniska och organisatoriska säkerhetsåtgärder för att skydda dina
          uppgifter mot obehörig åtkomst eller förlust. Genom att använda vår
          tjänst godkänner du denna policy. Vi kan komma att uppdatera
          innehållet, och vid större ändringar informerar vi dig.
        </p>
      </IntegrityPolicy>
    </>
  );
};
