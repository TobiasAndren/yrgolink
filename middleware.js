import { updateSession } from '@/utils/supabase/middleware'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  // Uppdatera användarens session
  const response = await updateSession(request)

  // Kontrollera om användaren är inloggad
  const supabaseUser = request.cookies.get('supabase_user') // Justera för den cookie du använder för användarsessionen
  
  const url = request.url

  // Om användaren är inloggad och försöker komma åt login-sidan, omdirigera till /account
  if (supabaseUser && url.includes('/login')) {
    return NextResponse.redirect(new URL('/account', url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
