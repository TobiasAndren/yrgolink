'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Input } from "../form-components/Input";
import { Button } from '../form-components/Button';
import { Textarea } from '../form-components/Textarea';
import { FormSectionTitle } from "../form-components/FormSectionTitle";
import { StatusDisplay } from '../common/StatusDisplay';

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
      setError('Något gick fel vid inladdning av data.');
    } finally {
      setLoading(false);
    }
  }, [supabase, user?.id]);

  useEffect(() => {
    async function fetchTechnologies() {
      const { data, error } = await supabase.from("technologies").select("*");
      if (error) console.error("Error fetching technologies:", error);
      else setTechnologies(data);
    }
    fetchTechnologies();
  }, []);

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

  useEffect(() => {
    if (user?.id) {
      getProfile();
      getStudentTechnologies();
    }
  }, [user?.id, getProfile, getStudentTechnologies]);

  async function uploadFile(file) {
    if (!file) return null;

    const filePath = `cv-${user.id}`;
    const { data, error } = await supabase.storage
    .from('cvs')
    .upload(filePath, file, { upsert: true }); // upsert overwrites old file


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
      
      const filePath = profile.cvUrl.split('/').pop();
      
      const { error: deleteError } = await supabase.storage.from('cvs').remove([filePath]);
  
      if (deleteError) {
        throw deleteError;
      }
  
      const { error: updateError } = await supabase
        .from('students')
        .update({ cv: null })
        .eq('id', user?.id);
  
      if (updateError) {
        throw updateError;
      }
  
      setProfile((prev) => ({ ...prev, cvUrl: '' }));
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
          setError('Uppladdning av CV misslyckades.');
          setLoading(false);
          return;
        }
        cvUrl = supabase.storage.from('cvs').getPublicUrl(uploadedFilePath).data.publicUrl;
      }

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

      const { error: deleteError } = await supabase
        .from('student_technologies')
        .delete()
        .eq('student_id', user?.id);

      if (deleteError) throw deleteError;

      const newTechnologyEntries = selectedTechnologies.map((techId) => ({
        student_id: user?.id,
        technology_id: techId,
      }));

      const { error: insertError } = await supabase
        .from('student_technologies')
        .insert(newTechnologyEntries);

      if (insertError) throw insertError;

      setMessage('Profil sparad!');
    } catch (error) {
      setError('Något gick fel! Profilen kunde inte sparas.');
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
            key={tech.id}
            label={tech.name}
            type="checkbox"
            id={`tech-${tech.id}`}
            value={tech.id}
            checked={selectedTechnologies.includes(tech.id)}
            onChange={(e) => {
              const techId = parseInt(e.target.value, 10);
              setSelectedTechnologies((prev) =>
                e.target.checked
                  ? [...prev, techId]
                  : prev.filter((id) => id !== techId)
              );
            }}
          />
        ))}
      </fieldset>

      {error && <StatusDisplay isError>{error}</StatusDisplay>}
      {message && <StatusDisplay>{message}</StatusDisplay>}

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
