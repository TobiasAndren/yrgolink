import { redirect } from 'next/navigation'
import ProfileForm from './profile-form'
import { createClient } from '@/utils/supabase/server'

export default async function Profile() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) { // Om användaren inte är inloggad, skicka den till login-sidan
    redirect('/login')
  }

  return <ProfileForm user={user} />
}