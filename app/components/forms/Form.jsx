"use client";

import styled from "@emotion/styled";
import { SignupForm } from "./SignupForm";
import { EventForm } from "./EventForm";
import { LoginForm } from "./LoginForm";

const StyledForm = styled.form`
  height: auto;
  background-color: var(--bg-grey);
  padding-bottom: 3rem;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  align-self: center;

  @media (min-width: 600px) {
    width: 80%;
  }

  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 1200px) {
    width: 50%;
    gap: 2rem;
  }
`;

export const Form = ({
  event,
  student,
  company,
  titles,
  action,
  method,
  login,
}) => {
  return (
    <StyledForm action={action} method={method}>
      {event && <EventForm titles={titles} />}
      {student && <SignupForm type="student" titles={titles} />}
      {company && <SignupForm type="company" titles={titles} />}
      {login && <LoginForm />}
    </StyledForm>
  );
};
