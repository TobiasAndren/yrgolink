"use client";

import styled from "@emotion/styled";
import { SignupForm } from "./SignupForm";
import { EventForm } from "./EventForm";
import { LoginForm } from "./LoginForm";

const StyledForm = styled.form`
  height: auto;
  background-color: var(--bg-grey);
  padding-bottom: 3rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
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
