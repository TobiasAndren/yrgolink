'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Input } from "../form-components/Input";
import { Button } from '../form-components/Button';
import { Textarea } from '../form-components/Textarea';
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
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

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

  /* Hämta alla teknologier */
  useEffect(() => {
    async function fetchTechnologies() {
      const { data, error } = await supabase.from("technologies").select("*");
      if (error) console.error("Error fetching technologies:", error);
      else setTechnologies(data);
    }
    fetchTechnologies();
  }, []);

  /* Hämta studentens valda teknologier */
  const getStudentTechnologies = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('student_technologies')
        .select('technology_id')
        .eq('student_id', user?.id);

      if (error) throw error;

      setSelectedTechnologies(data.map((item) => item.technology_id));
    } catch (error) {
      console.error("Error fetching student technologies:", error);
    }
  }, [supabase, user?.id]);

  /* Kör dessa funktioner vid inladdning */
  useEffect(() => {
    if (user?.id) {
      getProfile();
      getStudentTechnologies();
    }
  }, [user?.id, getProfile, getStudentTechnologies]);

  /* Uppladdning av CV-fil */
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

  /* Uppdatera profil och teknologier */
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

      // Uppdatera studentens profil
      const { error: profileError } = await supabase.from('students').upsert({
        id: user?.id,
        name: formData.get('name'),
        class: formData.get('class'),
        description: formData.get('description'),
        website: formData.get('website'),
        linkedin: formData.get('linkedin'),
        cv: cvUrl,
        updated_at: new Date().toISOString(),
      });

      if (profileError) throw profileError;

      // Rensa gamla teknologier
      const { error: deleteError } = await supabase
        .from('student_technologies')
        .delete()
        .eq('student_id', user?.id);

      if (deleteError) throw deleteError;

      // Lägg till de nya valda teknologierna
      const newTechnologyEntries = selectedTechnologies.map((techId) => ({
        student_id: user?.id,
        technology_id: techId,
      }));

      const { error: insertError } = await supabase
        .from('student_technologies')
        .insert(newTechnologyEntries);

      if (insertError) throw insertError;

      setMessage('Profile updated successfully!');
    } catch (error) {
      setError('Error updating the profile!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={updateProfile}>
      <FormSectionTitle>{titles.one}</FormSectionTitle>
      <Input label="Namn*" type="text" placeholder="Ex. Karl Andersson" name="name" id="name" isRequired defaultValue={profile.name} />

      <fieldset id="dd-wu">
        <legend>Klass</legend>
        <Input
          label="Digital designer"
          id="designer"
          name="class"
          type="radio"
          value="designer"
          checked={profile.class === 'designer'}
          onChange={(e) => setProfile({ ...profile, class: e.target.value })}
        />
        <Input
          label="Webbutvecklare"
          id="developer"
          name="class"
          type="radio"
          value="developer"
          checked={profile.class === 'developer'}
          onChange={(e) => setProfile({ ...profile, class: e.target.value })}
        />
      </fieldset>

      <Textarea label="Om mig" type="text" placeholder="Skriv kort om dig själv" name="description" id="description" defaultValue={profile.description} />

      <FormSectionTitle>{titles.two}</FormSectionTitle>
      <Input 
        label="Portfolio/github" 
        type="url" 
        placeholder="Ex. www.portfolio.se" 
        name="website" 
        id="website" 
        defaultValue={profile.website} 
      />
      <Input 
        label="Linked in" 
        type="url" 
        placeholder="Ex. www.linkedin.se/example" 
        name="linkedin" 
        id="linkedin" 
        defaultValue={profile.linkedin} 
      />
      <Input 
        label="CV" 
        type="file"
        name="cv"
        id="cv"
        accept="application/pdf"
        onChange={(e) => setCvFile(e.target.files[0])}
      />

      {profile.cvUrl && (
          <p><a href={profile.cvUrl} target="_blank" rel="noopener noreferrer">Visa aktuellt CV</a> | <a href="#" onClick={deleteCV}>Radera CV</a></p>
      )}

      <FormSectionTitle>{titles.three}</FormSectionTitle>
      <fieldset id="techs">
        {technologies.map((tech) => (
            <Input
              label={tech.name}
              type="checkbox"
              value={tech.id}
              key={tech.id}
              checked={selectedTechnologies.includes(tech.id)}
              onChange={(e) => {
                const techId = parseInt(e.target.value);
                setSelectedTechnologies((prev) =>
                  e.target.checked ? [...prev, techId] : prev.filter((id) => id !== techId)
                );
              }}
            />
        ))}
      </fieldset>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {message && <div style={{ color: 'green' }}>{message}</div>}

      <Button
        textColor="white"
        backgroundColor="red"
        text={loading ? 'Loading...' : 'Save Profile'}
        type="submit"
        disabled={loading}
      />
    </form>
  );
};
