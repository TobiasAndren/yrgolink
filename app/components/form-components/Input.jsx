"use client";

import styled from "@emotion/styled";

const StyledLabel = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${({ type }) =>
    (type === "checkbox" || type === "radio") &&
    `
    padding: 0;
    display:flex;
    flex-direction: row;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.875rem;
  `}
`;

const StyledInput = styled.input`
  padding: 0.75rem 1.25rem;
  height: 3rem;
  color: black;
  background-color: var(--white);
  border-radius: 0.75rem;
  border: none;

  ${({ type }) =>
    (type === "checkbox" || type === "radio") &&
    `
    height: auto;
    padding: 0;
  `}
`;

export const Input = ({
  label,
  name,
  id,
  type,
  value,
  link,
  placeholder,
  onChange,
  isRequired,
  defaultValue,
  accept
}) => {
  return (
    <StyledLabel htmlFor={id} type={type}>
      {(type != "checkbox" && type != "radio") && label}
      <StyledInput
        type={type}
        value={value}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={isRequired}
        defaultValue={defaultValue}
        accept={accept}
      ></StyledInput>
      {(type === "checkbox" || type === "radio") && label}
      {link && link}
    </StyledLabel>
  );
};
