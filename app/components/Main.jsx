"use client";

import styled from "@emotion/styled";
import { usePathname } from "next/navigation";

const StyledMain = styled.main`
  background: ${({ isFormPage }) =>
    isFormPage ? "var(--bg-grey)" : "var(--bg-white)"};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export function Main({ children }) {
  const pathname = usePathname();
  const isFormPage = pathname.includes("signup") || pathname.includes("login");

  return <StyledMain isFormPage={isFormPage}>{children}</StyledMain>;
}
