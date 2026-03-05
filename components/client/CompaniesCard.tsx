'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Building2 } from 'lucide-react';

interface CompanyData {
  slug: string;
  name: string;
  logoUrl?: string;
  totalMedicines?: number;
}

interface CompaniesCardProps {
  company: CompanyData;
}

export default function CompaniesCard({ company }: CompaniesCardProps) {
  const { slug, name, logoUrl, totalMedicines = 0 } = company;

  return (
    <Link 
      href={`/companies/${slug}`}
      className="group relative flex items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-cyan-200 hover:-translate-y-1 active:scale-[0.98] active:opacity-90 active:bg-cyan-50/50 active:brightness-95 transition-all duration-300"
    >
      <div className="relative w-16 h-16 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 group-hover:border-cyan-100 transition-colors">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <Building2 className="w-8 h-8" />
          </div>
        )}
      </div>

      <div className="ml-4 flex-1">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors duration-300">
          {name}
        </h3>
        <div className="flex items-center mt-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {totalMedicines} Medicines
          </span>
        </div>
      </div>

      <div className="ml-2 text-slate-300 group-hover:text-cyan-400 transition-colors">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
    </Link>
  );
}
