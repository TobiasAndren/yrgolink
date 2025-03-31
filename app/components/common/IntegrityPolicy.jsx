"use client";

import styled from "@emotion/styled";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PolicyContent = styled.article`
  background-color: var(--bg-grey);
  padding: 1.25rem;
  padding-top: 3rem;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 1.25rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;

  h3 {
    font-size: 1rem;
    font-weight: 700;
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  border: 0;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const IntegrityPolicy = ({ isOpen, onClose, children }) => {
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <PolicyContent onClick={(e) => e.stopPropagation()}>
        <CloseButton role="button" onClick={onClose}>
          <img src="/close-button.svg" alt="" />
        </CloseButton>
        {children}
      </PolicyContent>
    </Overlay>
  );
};
