"use client";

import styled from "@emotion/styled";
import { usePathname } from "next/navigation";

const StyledMain = styled.main`
  background: var(--bg-grey);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100vw;
`;

export function Main({ children }) {
  return <StyledMain>{children}</StyledMain>;
}
