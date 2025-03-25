'use client'
// Navbar.js
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export function TopNav() {
  const supabase = createClient();
  const [user, setUser] = useState(null);

  // Funktion för att hämta aktuell användare
  const getUser = async () => {
    const currentUser = supabase.auth.getUser();
    setUser(currentUser);
  };

  // Kolla om användaren är inloggad när komponenten laddas
  useEffect(() => {
    getUser();

    // Lyssna på användarens login/logout-status
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    // Städa upp när komponenten tas bort
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload(); // force refresh to display login-link
  };

  return (
    <nav id="top">
      <img src="logo-link.svg" />
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        <li>
          {user ? (
            <button onClick={handleLogout} className="button">
              Logga ut
            </button>
          ) : (
            <Link href="/login">Logga in</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
