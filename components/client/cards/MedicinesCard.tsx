'use client';

import Link from 'next/link';
import { Pill, Droplets, Syringe, HelpCircle } from 'lucide-react';

interface MedicineData {
  slug: string;
  name: string;
  genericName: string;
  dosageForm: string;
  price: number;
}

interface MedicinesCardProps {
  medicine: MedicineData;
}

export default function MedicinesCard({ medicine }: MedicinesCardProps) {
  const { slug, name, genericName, dosageForm, price } = medicine;

  const getDosageIcon = (form: string) => {
    const f = form?.toLowerCase() || '';
    if (f.includes('tablet') || f.includes('capsule')) {
      return <Pill className="w-6 h-6 text-cyan-600" />;
    }
    if (f.includes('syrup') || f.includes('suspension') || f.includes('liquid')) {
      return <Droplets className="w-6 h-6 text-blue-500" />;
    }
    if (f.includes('injection') || f.includes('vial') || f.includes('ampoule')) {
      return <Syringe className="w-6 h-6 text-rose-500" />;
    }
    return <HelpCircle className="w-6 h-6 text-slate-400" />;
  };

  return (
    <Link 
      href={`/medicines/${slug}`}
      className="group relative flex flex-col p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-cyan-200 hover:-translate-y-1 active:scale-[0.98] active:opacity-90 active:bg-cyan-50/50 active:brightness-95 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 p-2 pr-4 bg-slate-50 rounded-xl group-hover:bg-cyan-50 transition-colors duration-300">
          <div className="p-1.5 bg-white rounded-lg shadow-sm">
            {getDosageIcon(dosageForm)}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            {dosageForm}
          </span>
        </div>
        <div className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100 shadow-sm">
          ৳ {price.toFixed(2)}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors duration-300 line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-slate-500 font-medium mt-1 line-clamp-1 italic">
          {genericName}
        </p>
      </div>
    </Link>
  );
}
