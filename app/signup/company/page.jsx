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
            <input id="user_type" name="user_type" type="hidden" value="company" />
            <fieldset>
                <legend>Kontodetaljer (företag)</legend>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" placeholder="email@example.com" required />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="••••••" required />
          </fieldset>

          <fieldset>
                <legend>Företagsinfo</legend>
            
                <label htmlFor="name">Namn *</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="ex: Yrgo"
                    required
                />

                <label htmlFor="website">Hemsida *</label>
                <input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="ex: https://www.yrgo.se"
                />

                <label htmlFor="website">Kontaktperson namn *</label>
                <input
                    id="contact_name"
                    name="contact_name"
                    type="text"
                    placeholder="ex: Förnamn Efternamn"
                />

                <label htmlFor="website">Kontaktperson namn *</label>
                <input
                    id="contact_email"
                    name="contact_email"
                    type="text"
                    placeholder="ex: email@example.com"
                />

          </fieldset>

        <fieldset>
            <legend>LIA-platser</legend>

            <label htmlFor="description">Beskrivning av LIA-platser *</label>
            <textarea
                id="description"
                name="description"
                placeholder="Skriv kort om era LIA-platser"
            />

            <fieldset>
                <legend>Möjliga arbetsformer</legend>

                <label htmlFor="in-house">
                    <input 
                        id="in-house"
                        name="in-house"
                        type="checkbox" 
                    />
                    På plats
                </label>

                <label htmlFor="remote">
                    <input 
                        id="remote"
                        name="remote"
                        type="checkbox" 
                    />
                    Remote
                </label>

                <label htmlFor="hybrid">
                    <input 
                        id="hybrid"
                        name="hybrid"
                        type="checkbox" 
                    />
                    Hybrid
                </label>
            </fieldset>
        </fieldset>

          <label htmlFor="consent">
            <input
                type="checkbox"
                id="consent"
                name="consent"
                value="consent"
                required
            />
            Jag har läst och godkänt <a href="/terms">Användarvillkoren</a>.
          </label>

          <button formAction={signup}>Sign up</button>
        </form>
    </main>
  )
}