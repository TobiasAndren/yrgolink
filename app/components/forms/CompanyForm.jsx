"use client";
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Input } from "../form-components/Input";
import { FormSectionTitle } from "../form-components/FormSectionTitle";

export default function CompanyForm({ user, titles }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    website: '',
    description: '',
    contact_name: '',
    contact_email: '',
    employment_mode: '',
  });

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('companies')
        .select('name, website, description, contact_name, contact_email, employment_mode')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      setProfile({
        name: data?.name || '',
        website: data?.website || '',
        description: data?.description || '',
        contact_name: data?.contact_name || '',
        contact_email: data?.contact_email || '',
        employment_mode: data?.employment_mode || '',
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

  const updateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const { error } = await supabase.from('companies').upsert({
        id: user?.id,
        name: formData.get('name'),
        website: formData.get('website'),
        description: formData.get('description'),
        contact_name: formData.get('contact_name'),
        contact_email: formData.get('contact_email'),
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
        placeholder="Ex. Acme Company"
        name="name"
        id="name"
        defaultValue={profile.name}
        isRequired
      ></Input>
      <Input
        label="Hemsida*"
        type="text"
        placeholder="Ex. www.acemecompany.se"
        name="website"
        id="website"
        defaultValue={profile.website}
        isRequired
      ></Input>
      <Input
        label="Kontaktperson namn"
        type="text"
        placeholder="Ex. Karl Andersson"
        name="contact_name"
        id="contact_name"
        defaultValue={profile.contact_name}
      ></Input>
      <Input
        label="Kontaktperson e-post"
        type="text"
        placeholder="Ex. karlandersson@example.com"
        name="contact_email"
        id="contact_email"
        defaultValue={profile.contact_email}
      ></Input>
      <FormSectionTitle>{titles.two}</FormSectionTitle>
      <Input
        label="Beskrivning av LIA-platser"
        type="text"
        placeholder="Skriv kort om era LIA-platser"
        name="description"
        id="description"
        defaultValue={profile.description}
      ></Input>
      <fieldset>
        <legend>Möjliga arbetsformer</legend>
        <Input label="På plats" type="radio" name="employment_mode" id="in_house"/>
        <Input label="Remote" type="radio" name="employment_mode" id="remote"/>
        <Input label="Hybrid" type="radio" name="employment_mode" id="hybrid"/>
      </fieldset>

      <Input label="Kunskaper som sökes"></Input>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {message && <div style={{ color: 'green' }}>{message}</div>}

      <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Save Profile'}</button>
    </form>
  );
};
