'use client'

import { useState } from 'react'
import { signup } from './actions'

export default function LoginPage() {
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const result = await signup(formData)

    if (result.success) {
      setIsSuccess(true)
      setMessage(result.message)
    } else {
      setIsSuccess(false)
      setMessage(result.message)
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input id="user_type" name="user_type" type="hidden" value="student" />
        
        <fieldset>
          <legend>Kontodetaljer (student)</legend>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" placeholder="email@example.com" required />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" placeholder="••••••" required />
        </fieldset>

        {message && (
            <div style={{ color: isSuccess ? 'green' : 'red' }}>
            {message}
            </div>
        )}

        <label htmlFor="consent">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            value="consent"
            required
          /> Jag har läst och godkänt <a href="/terms">integritetspolicyn</a>.
        </label>

        <button type="submit">Registrera student</button>
      </form>

    </main>
  )
}
