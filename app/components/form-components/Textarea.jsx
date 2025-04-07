"use client";

import styled from "@emotion/styled";

const StyledLabel = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StyledTextarea = styled.textarea`
  padding: 0.75rem 1.25rem;
  height: 3rem;
  color: black;
  background-color: var(--white);
  border-radius: 0.75rem;
  border: none;
  font: inherit;
  font-size: .875rem;
`;

export const Textarea = ({
  label,
  name,
  id,
  type,
  value,
  link,
  placeholder,
  onChange,
  isRequired,
  defaultValue
}) => {
  return (
    <StyledLabel htmlFor={id} type={type}>
    {label}
      <StyledTextarea
        type={type}
        value={value}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={isRequired}
        defaultValue={defaultValue}
      />
      {link && link}
    </StyledLabel>
  );
};
