import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import { getMedicines } from '@/lib/db';

export const revalidate = 86400;

export const metadata: Metadata = generateSEO({
  title: 'All Medicines',
  description: 'Browse our comprehensive database of medical products and brands.',
  slug: '/medicines'
});

export default async function MedicinesPage() {
  const medicines = await getMedicines();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Medicines Database</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {medicines.map((m: any) => (
          <div key={m.id} className="p-6 rounded-xl bg-slate-50 hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-2">{m.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{m.strength} - {m.dosageForm}</p>
            <a href={`/medicines/${m.slug}`} className="text-cyan-600 font-medium hover:underline">
              View Details &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
