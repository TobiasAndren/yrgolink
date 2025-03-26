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

export const Input = ({
  label,
  type,
  value,
  placeholder,
  onChange,
  isRequired,
}) => {
  return (
    <StyledLabel>
      {label}
      <StyledInput
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={isRequired}
      ></StyledInput>
    </StyledLabel>
  );
};
