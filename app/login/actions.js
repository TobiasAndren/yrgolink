'use server'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { data: user, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // Om inloggningen misslyckas, returnera ett fel
    return { success: false, message: error.message }
  }

  // Om inloggningen lyckas, returnera en framgång
  return { success: true, user }
}
