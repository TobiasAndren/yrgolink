"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ProfileForm({ user }) {
  const supabase = useMemo(() => createClient(), []); // Memoize supabase client
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state to hold error messages
  const [profile, setProfile] = useState({
    name: '',
    class: '',
    description: '',
    website: ''
  }); // State to hold profile data

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from('students')
        .select('name, class, description, website')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      // Set profile data in state after fetching
      setProfile({
        name: data?.name || '',
        class: data?.class || '',
        description: data?.description || '',
        website: data?.website || ''
      });
    } catch (error) {
      setError('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [supabase, user?.id]);

  useEffect(() => {
    if (user?.id) {
      getProfile();
    }
  }, [user?.id, getProfile]);

  async function updateProfile(e) {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.target); // Get form data from the form

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
            name="name"
            type="text"
            defaultValue={profile.name} 
          />
        </div>

        <div>
          <label htmlFor="class">Klass</label>
          <input
            id="class"
            name="class"
            type="text"
            defaultValue={profile.class} 
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={profile.description}
          ></textarea>
        </div>

        <div>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="url"
            defaultValue={profile.website}
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
