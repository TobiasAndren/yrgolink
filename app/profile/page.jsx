import { redirect } from 'next/navigation'
// import ProfileForm from './profile-form'
import { Form } from '../components/forms/Form'
import { createClient } from '@/utils/supabase/server'
import { Hero } from '../components/common/Hero'

export default async function Profile() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  
  if (!user) { // Om användaren inte är inloggad, skicka den till login-sidan
    redirect('/login')
  }
  
  console.log(user.id)
  const userType = await checkUserType(user.id, supabase)
  console.log(userType)

  return (
    <>
    {userType === "student" ? (
      <>
        <Hero backgroundColor="red" title="Uppdatera" text="Student" />
        <Form student user={user} titles={{ one: "Kontodetaljer", two: "Länkar" }} />
      </>
      ) : userType === "company" ? (
      <>
        <Hero backgroundColor="blue" title="Uppdatera" text="Företag" />
        <Form company user={user} titles={{ one: "Företagsinformation", two: "Kontaktuppgifter" }} />
      </>
      ) : (
        <p>Du har inget konto registrerat som student eller företag.</p>
      )}
    </>
  )
}

async function checkUserType(userId, supabase) {
  if (!userId) return null;

  // Kolla students-tabellen
  const { data: student } = await supabase
    .from('students')
    .select('id')
    .eq('id', userId)
    .single();

  if (student) return "student";

  // Kolla companies-tabellen
  const { data: company } = await supabase
    .from('companies')
    .select('id')
    .eq('id', userId)
    .single();

  if (company) return "company";

  return "unknown";
}