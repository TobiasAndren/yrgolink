import { login } from './actions'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function LoginPage() {
    const supabase = await createClient()

    const {
    data: { user },
    } = await supabase.auth.getUser()

    if (user) { // if user is logged in, redirect them to their profile page
    redirect('/profile')
    }

  return (
    <main>
        <form>
          <fieldset>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          </fieldset>
          <a>Don't have an account?</a>
          <button formAction={login}>Log in</button>
        </form>
    </main>
  )
}