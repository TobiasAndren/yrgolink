"use client";

import styled from "@emotion/styled";

const StyledLabel = styled.label`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.75rem 1.25rem;
  height: 3rem;
  color: black;
  background: #e6e6e6;
  border-radius: 0.75rem;
  border: none;
`;

export const TextInput = ({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  isRequired,
}) => {
  return (
    <StyledLabel htmlFor={name}>
      {label}
      <StyledInput
        type={type}
        value={value}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        required={isRequired}
      ></StyledInput>
    </StyledLabel>
  );
};
