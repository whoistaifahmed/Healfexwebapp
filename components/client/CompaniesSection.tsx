'use client';

import { useState, useEffect } from 'react';
import { getCompanies, getMedicines } from '@/lib/db';
import CompaniesCard from './CompaniesCard';
import Link from 'next/link';
import { Building2, Loader2 } from 'lucide-react';

export default function CompaniesSection() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [companiesData, medicinesData] = await Promise.all([
          getCompanies(),
          getMedicines()
        ]);

        // Calculate total medicines per company
        const companyCounts = medicinesData.reduce((acc: any, med: any) => {
          if (med.companyId) {
            acc[med.companyId] = (acc[med.companyId] || 0) + 1;
          }
          return acc;
        }, {});

        const enrichedCompanies = companiesData.map(company => ({
          ...company,
          totalMedicines: companyCounts[company.id] || 0
        }));

        // If no companies in DB, provide some mock ones for design purposes
        if (enrichedCompanies.length === 0) {
          const mockCompanies = [
            { id: 'c1', name: 'Square Pharmaceuticals Ltd.', slug: 'square-pharma', totalMedicines: 1250, logoUrl: 'https://picsum.photos/seed/square/200' },
            { id: 'c2', name: 'Incepta Pharmaceuticals Ltd.', slug: 'incepta-pharma', totalMedicines: 980, logoUrl: 'https://picsum.photos/seed/incepta/200' },
            { id: 'c3', name: 'Beximco Pharmaceuticals Ltd.', slug: 'beximco-pharma', totalMedicines: 850, logoUrl: 'https://picsum.photos/seed/beximco/200' },
            { id: 'c4', name: 'Renata Limited', slug: 'renata', totalMedicines: 620, logoUrl: 'https://picsum.photos/seed/renata/200' },
            { id: 'c5', name: 'Eskayef Pharmaceuticals Ltd.', slug: 'skf', totalMedicines: 540, logoUrl: 'https://picsum.photos/seed/skf/200' },
            { id: 'c6', name: 'ACI Limited', slug: 'aci', totalMedicines: 490, logoUrl: 'https://picsum.photos/seed/aci/200' },
          ];
          setCompanies(mockCompanies);
        } else {
          setCompanies(enrichedCompanies);
        }
      } catch (error) {
        console.error('Error loading companies:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p className="text-sm font-medium">Loading companies...</p>
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Top Pharmaceutical Companies</h2>
        </div>
        <Link href="/companies" className="text-cyan-600 font-semibold hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.slice(0, 6).map((company) => (
          <CompaniesCard key={company.id} company={company} />
        ))}
      </div>
    </section>
  );
}
