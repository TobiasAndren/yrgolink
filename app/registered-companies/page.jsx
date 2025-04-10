'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { FormSectionTitle } from '../components/form-components/FormSectionTitle';
import Link from 'next/link';

export default function RegisteredCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Hämta data från Supabase
        const { data, error } = await supabase.from('companies').select('*');
        if (error) {
          throw error;
        }
        setCompanies(data);
      } catch (error) {
        setError('Failed to load companies');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []); // Tom array betyder att detta körs en gång vid laddning

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <FormSectionTitle>Registered Companies</FormSectionTitle>
      <ul className="list">
        {companies.map((company) => (
        <li key={company.id}>
          <Link href={`/registered-companies/${company.id}`}>
              {company.name}
          </Link>
        </li>
        ))}
      </ul>
    </section>
  );
}
