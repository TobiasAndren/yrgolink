// formulär för anmälan
// behöver funktionalitet samt en tabell att lagra data i db
import { createClient } from '@/utils/supabase/server'

export default async function AttendEvent() {
    const supabase = await createClient()

  return (
    <main>

        <section>
            <strong>Datum:</strong> 23 april<br />
            <strong>Tid:</strong> 13:00-15:00<br />
            <strong>Plats:</strong> Visual Arena, Lindholmspiren 3<br />
        </section>

        <form>
            <fieldset>
                <legend>Företagsinformation</legend>

                <label htmlFor="name">Namn på företag *</label>
                <input id="name" name="name" type="text" placeholder="ex: Yrgo" required />

                <label htmlFor="attendees">Antal personer som kommer *</label>
                <select id="attendees" name="attendees" defaultValue="none" required>
                    <option value="none" disabled>Välj antal</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </fieldset>

            <fieldset>
                <legend>Kontaktperson</legend>

                <label htmlFor="contact-name">För- och efternamn *</label>
                <input id="contact-name" name="contact-name" type="text" placeholder="ex: Förnamn Efternamn" required />

                <label htmlFor="contact-email">E-post *</label>
                <input id="contact-email" name="contact-email" type="email" placeholder="ex: email@example.com" required />

                <label htmlFor="contact-email">Telefonnummer</label>
                <input id="contact-phone" name="contact-phone" type="tel" placeholder="070 123 45 67" />
            </fieldset>

            <label htmlFor="consent">
                <input type="checkbox" id="consent" name="consent" value="consent" required />
                Jag har läst och godkänt <a>Användarvillkoren</a>.
            </label>

          <button formAction={signup}>Anmäl företag</button>
        </form>
    </main>
  )
}