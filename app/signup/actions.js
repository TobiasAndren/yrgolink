'use server'

import { createClient } from '@/utils/supabase/server'

export async function signupUser(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        user_type: formData.get('user_type'),
      },
      emailRedirectTo: 'http://localhost:3000/profile', // URL after email verification
    },
  }

  const { user, error } = await supabase.auth.signUp(data)

  if (error) {
    console.error("Signup error:", error)
    return { success: false, message: "Något gick fel vid registrering." }
  } else {
    return { success: true, message: "Registrering genomförd! Verifiera din e-post för att logga in och fyll i ytterligare information på din profil." }
  }
}