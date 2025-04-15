"use client";

import styled from "@emotion/styled";

const StyledLabel = styled.label`
  width: 100%;

  ${({ type }) =>
    type === "radio" &&
    `
    padding: 0.75rem 1.25rem;
    height: 3rem;
    color: black;
    background-color: var(--white);
    border-radius: 0.75rem;
    background: var(--bg-white);
    font-size: 0.8rem;
    cursor: pointer;
    text-align: center;
  `}
  ${({ type }) =>
    type === "checkbox" &&
    `
    padding: 2rem 1.25rem;
    color: black;
    text-align: center;
    border-radius: 0.75rem;
    background: var(--bg-white);
    font-size: 0.8rem;
    cursor: pointer;
  `}
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1.25rem;
  height: 3rem;
  color: black;
  background-color: var(--white);
  border-radius: 0.75rem;
  border: none;
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;

  ${({ type }) =>
    (type === "checkbox" || type === "radio") &&
    `
    display: none;
  `}

  ${({ type }) =>
    type === "file" &&
    ` /* styled in global.css */
    background: none;
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
  accept,
  checked,
}) => {
  return (
    <>
      {type !== "radio" && type !== "checkbox" && (
        <StyledLabel htmlFor={id} type={type}>
          {label}
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
            checked={checked}
          />
        </StyledLabel>
      )}

      {(type === "radio" || type === "checkbox") && (
        <>
          <StyledInput
            type={type}
            value={value}
            id={id}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            required={isRequired}
            defaultValue={defaultValue}
            checked={checked}
          />
          <StyledLabel htmlFor={id} type={type}>
            {label}
          </StyledLabel>
        </>
      )}

      {link && link}
    </>
  );
};
