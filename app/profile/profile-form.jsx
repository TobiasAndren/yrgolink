"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ProfileForm({ user }) {
  const supabase = useMemo(() => createClient(), []); // Memoize supabase client
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state to hold error messages

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from('students')
        .select('name, class, description, website')
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      // Assuming profile data is being set in form elements' defaultValue
    } catch (error) {
      setError('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [supabase, user]); // Memoize the getProfile function

  useEffect(() => {
    if (user?.id) {
      getProfile();
    }
  }, [user, getProfile]);

  async function updateProfile(e) {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.target); // Get form data

    try {
      setLoading(true);

      const { error } = await supabase.from('students').upsert({
        id: user?.id,
        name: formData.get('name'),
        class: formData.get('class'),
        description: formData.get('description'),
        website: formData.get('website'),
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      alert('Credentials updated!');
    } catch (error) {
      setError('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <form onSubmit={updateProfile}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={user?.email} disabled />
        </div>

        <div>
          <label htmlFor="name">Namn</label>
          <input
            id="name"
            name="name" // name attribute is required to access the form data
            type="text"
            defaultValue={user?.name || ''} // Use defaultValue instead of state
          />
        </div>

        <div>
          <label htmlFor="class">Klass</label>
          <input
            id="class"
            name="class" // name attribute for form submission
            type="text"
            defaultValue={user?.classOption || ''}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description" // name attribute for form submission
            defaultValue={user?.description || ''}
          ></textarea>
        </div>

        <div>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website" // name attribute for form submission
            type="url"
            defaultValue={user?.website || ''}
          />
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>} {/* Error message */}

        <div>
          <button
            className="button primary block"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>
      </form>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </section>
  );
}
