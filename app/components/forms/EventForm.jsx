"use client";

import { createClient } from "@/utils/supabase/client";
import { Input } from "../form-components/Input";
import { Button } from "../form-components/Button";
import { FormSectionTitle } from "../form-components/FormSectionTitle";
import { PolicyLink } from "../footer/PolicyLink";
import { StatusDisplay } from "../common/StatusDisplay";
import { useState } from "react";

export const EventForm = ({ titles }) => {
  const [companyName, setCompanyName] = useState("");
  const [noAttendees, setNoAttendees] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [policy, setPolicy] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!policy) {
      setError("Du måste godkänna policyn för att fortsätta.");
      return;
    }

    const { data, error } = await supabase
      .from("attendees")
      .insert([
        {
          company_name: companyName,
          no_attendees: parseInt(noAttendees),
          contact_name: contactName,
          contact_email: contactEmail,
          contact_phone: contactPhone,
        },
      ]);

    if (error) {
      setError("Något gick fel. Försök igen senare.");
      console.error("Error inserting data:", error.message);
    } else {
      setMessage("Anmälan genomförd! Tack för din anmälan.");
      setCompanyName("");
      setNoAttendees("");
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setPolicy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormSectionTitle>{titles?.one}</FormSectionTitle>

      <Input
        label="Namn på företag*"
        type="text"
        placeholder="Ex. Acme Company"
        name="companyName"
        isRequired
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      ></Input>

      <Input
        label="Antal personer som kommer"
        type="number"
        placeholder="Ex. 2"
        name="Attendees"
        value={noAttendees}
        onChange={(e) => setNoAttendees(e.target.value)}
      ></Input>

      <FormSectionTitle>{titles?.two}</FormSectionTitle>

      <Input
        label="För- och efternamn*"
        type="text"
        placeholder="Ex. Förnamn Efternamn"
        name="contact_name"
        isRequired
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
      ></Input>

      <Input
        label="E-post*"
        type="email"
        placeholder="Ex. email@example.com"
        name="email"
        isRequired
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
      ></Input>

      <Input
        label="Telefonnummer"
        type="tel"
        name="phone"
        placeholder="Ex. 073 123 45 67"
        value={contactPhone}
        onChange={(e) => setContactPhone(e.target.value)}
      ></Input>

      <Input
        label="Jag har läst och godkänt"
        link={<PolicyLink />}
        type="checkbox"
        name="policy"
        id="policy"
        checked={policy}
        onChange={(e) => setPolicy(e.target.checked)}
      ></Input>

      {error && <StatusDisplay isError>{error}</StatusDisplay>}
      {message && <StatusDisplay>{message}</StatusDisplay>}

      <Button
        textColor="white"
        backgroundColor="red"
        text="Anmäl företag"
        type="submit"
      ></Button>
    </form>
  );
};
