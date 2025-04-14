"use client";

import { EventForm } from "./EventForm";
import { LoginForm } from "./LoginForm";
import StudentForm from "./StudentForm";
import CompanyForm from "./CompanyForm";
import { SignupForm } from "./SignupForm";

export const Form = ({
  event,
  signupStudent,
  signupCompany,
  student,
  company,
  titles,
  login,
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
