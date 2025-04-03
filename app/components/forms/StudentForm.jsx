'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Input } from "../form-components/Input";
import { FormSectionTitle } from "../form-components/FormSectionTitle";

export default function StudentForm({ user, titles }) {
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
    <form onSubmit={updateProfile}>
      <FormSectionTitle>{titles.one}</FormSectionTitle>
      <Input
        label="Namn*"
        type="text"
        placeholder="Ex. Karl Andersson"
        name="name"
        id="name"
        isRequired
        defaultValue={profile.name}
      ></Input>
      <Input label="Klass" type="text"></Input>
      <Input
        label="Om mig"
        type="text"
        placeholder="Skriv kort om dig själv"
        name="description"
        id="description"
        defaultValue={profile.description}
      ></Input>
      <FormSectionTitle>{titles.two}</FormSectionTitle>
      <Input
        label="Portfolio/github"
        type="url"
        placeholder="Ex. www.portfolio.se"
        name="website"
        id="website"
        defaultValue={profile.website}
      ></Input>
      <Input
        label="Linked in"
        type="url"
        placeholder="Ex. www.linkedin.se/example"
        name="linkedin"
        id="linkedin"
        defaultValue={profile.linkedin}
      ></Input>

      <Input 
        label="Ladda upp CV (.pdf)" 
        type="file"
        name="cv"
        id="cv"
        accept="application/pdf"
        onChange={(e) => setCvFile(e.target.files[0])}
      ></Input>

      {profile.cvUrl && (
        <div>
          <p>Nuvarande CV: <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer">Visa CV</a> / <a href="#" onClick={deleteCV}>Radera CV</a></p>
        </div>
      )}

      <Input label="program och tekniska kunskaper"></Input>


      {error && <div style={{ color: 'red' }}>{error}</div>}
      {message && <div style={{ color: 'green' }}>{message}</div>}


      <button type="submit" disabled={loading}>{loading ? 'Saving ...' : 'Save Profile'}</button>
    </form>
  );
};
