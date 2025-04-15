"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "../form-components/Input";
import { Button } from "../form-components/Button";
import { Textarea } from "../form-components/Textarea";
import { FormSectionTitle } from "../form-components/FormSectionTitle";
import { StatusDisplay } from "../common/StatusDisplay";

export default function CompanyForm({ user, titles }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [profile, setProfile] = useState({
    name: "",
    website: "",
    description: "",
    contact_name: "",
    contact_email: "",
    employment_mode: "",
  });

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("companies")
        .select("name, website, description, contact_name, contact_email, employment_mode")
        .eq("id", user?.id)
        .single();

      if (error) throw error;

      setProfile({
        name: data?.name || "",
        website: data?.website || "",
        description: data?.description || "",
        contact_name: data?.contact_name || "",
        contact_email: data?.contact_email || "",
        employment_mode: data?.employment_mode || "",
      });
    } catch (error) {
      setError("Error loading user data!");
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

  const getCompanyTechnologies = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("company_technologies")
        .select("technology_id")
        .eq("company_id", user?.id);

        console.log(data.map((item) => item.technology_id))

      if (error) throw error;

      setSelectedTechnologies(data.map((item) => item.technology_id));
    } catch (error) {
      console.error("Error fetching company technologies:", error);
    }
  }, [supabase, user?.id]);

  useEffect(() => {
    if (user?.id) {
      getProfile();
      getCompanyTechnologies();
    }
  }, [user?.id, getProfile, getCompanyTechnologies]);

  const updateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const { error: profileError } = await supabase.from("companies").upsert({
        id: user?.id,
        name: formData.get("name"),
        website: formData.get("website"),
        description: formData.get("description"),
        contact_name: formData.get("contact_name"),
        contact_email: formData.get("contact_email"),
        employment_mode: profile.employment_mode,
        updated_at: new Date().toISOString(),
      });      

      if (profileError) throw profileError;

      const { error: deleteError } = await supabase
        .from("company_technologies")
        .delete()
        .eq("company_id", user?.id);

      if (deleteError) throw deleteError;

      const newTechnologyEntries = selectedTechnologies.map((techId) => ({
        company_id: user?.id,
        technology_id: techId,
      }));

      const { error: insertError } = await supabase
        .from("company_technologies")
        .insert(newTechnologyEntries);

      if (insertError) throw insertError;

      setMessage("Profile updated successfully!");
    } catch (error) {
      setError("Error updating the profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={updateProfile}>
      <FormSectionTitle>{titles.one}</FormSectionTitle>
      <Input label="Namn*" type="text" name="name" id="name" defaultValue={profile.name} isRequired />
      <Input label="Hemsida*" type="text" name="website" id="website" defaultValue={profile.website} isRequired />
      <Input label="Kontaktperson namn" type="text" name="contact_name" id="contact_name" defaultValue={profile.contact_name} />
      <Input label="Kontaktperson e-post" type="text" name="contact_email" id="contact_email" defaultValue={profile.contact_email} />
      
      <FormSectionTitle>{titles.two}</FormSectionTitle>
      <Textarea label="Beskrivning av LIA-platser" type="text" name="description" id="description" defaultValue={profile.description} />

      <fieldset id="employment-mode">
        <legend>Arbetsform</legend>
        <Input 
          label="På plats" 
          type="radio" 
          name="employment_mode" 
          id="in_house" 
          value="in_house" 
          checked={profile.employment_mode === "in_house"} 
          onChange={(e) => setProfile((prev) => ({ ...prev, employment_mode: e.target.value }))} 
        />
        <Input 
          label="Remote" 
          type="radio" 
          name="employment_mode" 
          id="remote" 
          value="remote" 
          checked={profile.employment_mode === "remote"} 
          onChange={(e) => setProfile((prev) => ({ ...prev, employment_mode: e.target.value }))} 
        />
        <Input 
          label="Hybrid" 
          type="radio" 
          name="employment_mode" 
          id="hybrid" 
          value="hybrid" 
          checked={profile.employment_mode === "hybrid"} 
          onChange={(e) => setProfile((prev) => ({ ...prev, employment_mode: e.target.value }))} 
        />
      </fieldset>


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
