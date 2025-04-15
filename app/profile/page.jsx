import { redirect } from 'next/navigation'
import { Form } from '../components/forms/Form'
import { createClient } from '@/utils/supabase/server'
import { Hero } from '../components/common/Hero'
import { Button } from '../components/form-components/Button'

export default async function Profile() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }
  
  console.log(user.id)
  const userType = await checkUserType(user.id, supabase)
  console.log(userType)

  return (
    <>
    {userType === "student" ? (
      <>
        <Hero backgroundColor="red" title="Uppdatera" text="Profil" />
        <Form student user={user} titles={{ 
          one: "Personlig information", 
          two: "Länkar",
          three: "Tekniska kunskaper" }} />
      </>
      ) : userType === "company" ? (
      <>
        <Hero backgroundColor="blue" title="Uppdatera" text="Profil" />
        <Form company user={user} titles={{ 
          one: "Företagsinformation", 
          two: "LIA-platser",
          three: "Kunskaper som sökes"}} />
      </>
      ) : (
        <p>Du har inget konto registrerat som student eller företag.</p>
      )}
      <form action="/auth/signout" method="post">
        <Button
          textColor="white"
          backgroundColor="blue"
          text="Logga ut"
          type="submit" 
        />
      </form>
    </>
  )
}

async function checkUserType(userId, supabase) {
  if (!userId) return null;

  const { data: student } = await supabase
    .from('students')
    .select('id')
    .eq('id', userId)
    .single();

  if (student) return "student";

  const { data: company } = await supabase
    .from('companies')
    .select('id')
    .eq('id', userId)
    .single();

  if (company) return "company";

  return "unknown";
}