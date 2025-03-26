import { signup } from './actions'
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
                <legend>Kontodetaljer (företag)</legend>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required />
                <input id="user_type" name="user_type" type="hidden" value="company" />
                <button formAction={signup}>Sign up</button>
          </fieldset>
        </form>
    </main>
  )
}