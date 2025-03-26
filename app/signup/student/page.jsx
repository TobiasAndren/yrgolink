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
            <input id="user_type" name="user_type" type="hidden" value="student" />
            <fieldset>
                <legend>Kontodetaljer (student)</legend>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" placeholder="email@example.com" required />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="••••••" required />
            </fieldset>
            <fieldset>
                <legend>Personlig information</legend>

                <label htmlFor="name">Namn *</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="ex: Förnamn Efternamn"
                    required
                />
        
                <fieldset id="dd-wu">
                    <legend>Välj klass</legend>
                    <input
                    type="radio"
                    id="designer"
                    name="class"
                    value="designer"
                    />
                    <label htmlFor="designer">Digital Designer</label>

                    <input
                    type="radio"
                    id="developer"
                    name="class"
                    value="developer"
                    />
                    <label htmlFor="developer">Webbutvecklare</label>
                </fieldset>

                <label htmlFor="description">Om mig</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Skriv kort om dig själv"
                />

                <label htmlFor="employment-mode">Föredragen arbetsform</label>
                <select
                    name="employment-mode"
                    id="employment-mode"
                >
                    <option value="" disabled>Välj</option>
                    <option value="in_house">På plats</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                </select>
            </fieldset>

            <fieldset>
                <legend>Länkar</legend>

                <label htmlFor="website">Portfolio</label>
                <input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="ex: https://www.portfolio.se"
                />

                <label htmlFor="linkedin">LinkedIn</label>
                <input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    placeholder="ex: https://www.linkedin.se/yrgo"
                />
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