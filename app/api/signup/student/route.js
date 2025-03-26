// app/api/signup/student/route.js
import { studentSignup } from '@/app/signup/student/actions'

export async function POST(request) {
  try {
    console.log('POST request received') // Logga för att verifiera POST-begäran
    const formData = await request.formData()  // Fånga formulärdata från POST-begäran
    await studentSignup(formData)  // Skicka formData till signup-funktionen
    return new Response(null, { status: 302, headers: { Location: '/profile' } })  // Redirect till profil efter lyckad registrering
  } catch (error) {
    console.error('Error in POST request:', error)
    return new Response(null, { status: 500 }) // Returnera 500 om det sker ett fel
  }
}
