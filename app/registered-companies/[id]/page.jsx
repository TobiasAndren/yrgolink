'use client'
import { Hero } from '@/app/components/common/Hero';
import { Button } from '@/app/components/form-components/Button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { FormSectionTitle } from '@/app/components/form-components/FormSectionTitle';

export default function CompanyDetails() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClient();

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      console.log("No ID in URL");
      return; // Tidig return om ID inte finns
    }

    const fetchCompanyDetails = async () => {
      try {
        setLoading(true); // Sätt loading till true
        console.log("Fetching company details for ID:", id);

        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .eq('id', id)
          .single(); // Hämta en enda rad (företag)

        if (error) {
          throw error;
        }

        console.log("Fetched data:", data);
        setCompany(data);
      } catch (error) {
        console.error("Error:", error);  // Logga eventuella fel
        setError('Failed to load company details');
      } finally {
        setLoading(false); // Sätt loading till false
      }
    };

    fetchCompanyDetails();
  }, [id]);  // Kör denna effekt när id förändras

  const employmentModeMap = {
    in_house: "På plats",
    remote: "På distans",
    hybrid: "Hybrid (på plats/på distans)",
  };
  
  const arbetsform = employmentModeMap[company?.employment_mode] || "Uppgift saknas";  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <section style={{ paddingBottom: "0" }}>
      <a 
        href="/registered-companies"
        style={{ 
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          color: "#5E5E5E",
          fontWeight: "500"
        }}
      >
        <Image src="/ArrowLeft.svg" width="24" height="24" alt="Go back icon" />
        Tillbaka till alla företag
      </a>
    </section>
    <section className="company-info">
        <FormSectionTitle>Företagsinformation</FormSectionTitle>
        <div>
            <h4>{company?.name || 'Företagsnamn saknas'}</h4>
            <p>{company?.website ? company.website.replace(/^https?:\/\//, '') : 'Hemsida saknas'}</p>
        </div>
        <div>
            <h4>Kontaktperson</h4>
            <p>{company?.contact_name || 'Namn saknas'}</p>
            <p>{company?.contact_email || 'E-post saknas'}</p>
        </div>
        <div>
            <h4>Om företaget</h4>
            <p>{company?.description || 'Beskrivning saknas'}</p>
        </div>
        <div><strong>Arbetsform</strong>: {arbetsform}</div>
        
        {company?.contact_email && (
            <Button
            text="Skicka anmälan"
            textColor="white"
            backgroundColor="red"
            onClick={() => window.location.href = `mailto:${company.contact_email}`}
          />
        )}
    </section>
    </>
  );
}
