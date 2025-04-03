"use client";

import styled from "@emotion/styled";
import { EventForm } from "./EventForm";
import { LoginForm } from "./LoginForm";
import StudentForm from "./StudentForm";
import CompanyForm from "./CompanyForm";
import { SignupForm } from "./SignupForm";

// const StyledForm = styled.form`
//   height: auto;
//   background-color: var(--bg-grey);
//   padding-bottom: 3rem;
//   width: 90%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 0.75rem;
//   align-self: center;

//   @media (min-width: 600px) {
//     width: 80%;
//   }

//   @media (min-width: 768px) {
//     width: 70%;
//   }

//   @media (min-width: 1200px) {
//     width: 50%;
//     gap: 2rem;
//   }
// `;

export const Form = ({
  event,
  signupStudent,
  signupCompany,
  student,
  company,
  titles,
  action,
  method,
  login,
  onSubmit,
  user,
}) => {
  return (
    <>
      {event && <EventForm titles={titles} />}
      {student && <StudentForm type="student" titles={titles} user={user} />}
      {company && <CompanyForm type="company" titles={titles} user={user} />}
      {signupStudent && <SignupForm type="student" titles={titles} />}
      {signupCompany && <SignupForm type="company" titles={titles} />}
      {login && <LoginForm />}
    </>
  );
};
