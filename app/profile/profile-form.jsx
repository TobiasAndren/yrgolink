'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ProfileForm({ user }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    class: '',
    description: '',
    website: '',
    linkedin: '',
    cvUrl: '',
  });
  const [cvFile, setCvFile] = useState(null);
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('students')
        .select('name, class, description, website, linkedin, cv')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      setProfile({
        name: data?.name || '',
        class: data?.class || '',
        description: data?.description || '',
        website: data?.website || '',
        linkedin: data?.linkedin || '',
        cvUrl: data?.cv || '',
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

  async function uploadFile(file) {
    if (!file) return null;

    const filePath = `cv-${user.id}`;
    const { data, error } = await supabase.storage
    .from('cvs')
    .upload(filePath, file, { upsert: true }); // Detta skriver över gamla filer


    if (error) {
      console.error('File upload failed:', error);
      return null;
    }
    return data.path;
  }

  const deleteCV = async () => {
    if (!profile.cvUrl) {
      setError("Du har inget CV att radera.");
      return;
    }
  
    try {
      setLoading(true);
      
      // Extrahera filnamnet från URL:en
      const filePath = profile.cvUrl.split('/').pop();
      
      // Ta bort filen från Supabase Storage
      const { error: deleteError } = await supabase.storage.from('cvs').remove([filePath]);
  
      if (deleteError) {
        throw deleteError;
      }
  
      // Uppdatera databasen genom att sätta cv till null
      const { error: updateError } = await supabase
        .from('students')
        .update({ cv: null })
        .eq('id', user?.id);
  
      if (updateError) {
        throw updateError;
      }
  
      setProfile((prev) => ({ ...prev, cvUrl: '' })); // Uppdatera state
      setMessage("CV har raderats!");
    } catch (error) {
      setError("Det gick inte att radera CV.");
      console.error("Delete CV Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const updateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      
      let cvUrl = profile.cvUrl;
      if (cvFile) {
        const uploadedFilePath = await uploadFile(cvFile);
        if (!uploadedFilePath) {
          setError('CV upload failed. Please try again.');
          setLoading(false);
          return;
        }
        cvUrl = supabase.storage.from('cvs').getPublicUrl(uploadedFilePath).data.publicUrl;
      }

      const { error } = await supabase.from('students').upsert({
        id: user?.id,
        name: formData.get('name'),
        class: formData.get('class'),
        description: formData.get('description'),
        website: formData.get('website'),
        linkedin: formData.get('linkedin'),
        cv: cvUrl,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      setMessage('Profile updated!');
    } catch (error) {
      setError('Error updating the profile!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Profil</h2>
      <form onSubmit={updateProfile}>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={user?.email} disabled />
        </fieldset>

        <fieldset>
          <legend>Personlig information</legend>
          <label htmlFor="name">Namn *</label>
          <input id="name" name="name" type="text" defaultValue={profile.name} required />

          <fieldset id="dd-wu">
            <legend>Klass</legend>
            <input
              id="designer"
              name="class"
              type="radio"
              value="designer"
              checked={profile.class === 'designer'}
              onChange={(e) => setProfile({ ...profile, class: e.target.value })}
            />
            <label htmlFor="designer">Digital designer</label>

            <input
              id="developer"
              name="class"
              type="radio"
              value="developer"
              checked={profile.class === 'developer'}
              onChange={(e) => setProfile({ ...profile, class: e.target.value })}
            />
            <label htmlFor="developer">Webbutvecklare</label>
          </fieldset>

          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" defaultValue={profile.description}></textarea>
        </fieldset>

        <fieldset>
          <legend>Länkar</legend>
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="url" defaultValue={profile.website} />

          <label htmlFor="linkedin">LinkedIn</label>
          <input id="linkedin" name="linkedin" type="url" defaultValue={profile.linkedin} />

          <label htmlFor="cv">Ladda upp CV (.pdf)</label>
          <input id="cv" name="cv" type="file" accept="application/pdf" onChange={(e) => setCvFile(e.target.files[0])} />

          {profile.cvUrl && (
            <div>
              <p>Nuvarande CV: <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer">Visa CV</a> / <a href="#" onClick={deleteCV}>Radera CV</a></p>
            </div>
          )}
        </fieldset>

        {error && <div style={{ color: 'red' }}>{error}</div>}
        {message && <div style={{ color: 'green' }}>{message}</div>}

        <button type="submit" disabled={loading}>{loading ? 'Saving ...' : 'Save Profile'}</button>
      </form>

      <form action="/auth/signout" method="post">
        <button type="submit">Sign out</button>
      </form>
    </>
  );
}
