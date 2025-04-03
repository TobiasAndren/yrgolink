import { Form } from "../components/forms/Form";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Hero } from "../components/common/Hero";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // if user is logged in, redirect them to their profile page
    redirect("/profile");
  }

  return (
    <>
      <Hero backgroundColor="red" title="Logga in"></Hero>
      <Form login />
    </>
  );
}
