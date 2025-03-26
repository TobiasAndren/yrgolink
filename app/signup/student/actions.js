'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signup(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
        data: {
          user_type: formData.get('user_type'),
          name: formData.get('name'),
          class: formData.get('class'),
          description: formData.get('description'),
          employment_mode: formData.get('employment-mode'),
          website: formData.get('website'),
          linkedin: formData.get('linkedin')
        },
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
}