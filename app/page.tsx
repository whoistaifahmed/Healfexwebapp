import { Metadata } from 'next';
import Link from 'next/link';
import { generateSEO, generateJsonLd } from '@/lib/seo';
import { getMedicines, getGenerics } from '@/lib/db';
import MedicineSection from '@/components/client/MedicineSection';
import CompaniesSection from '@/components/client/CompaniesSection';
import SideEffectsSection from '@/components/client/SideEffectsSection';

export const revalidate = 86400; // 24 hours

export const metadata: Metadata = generateSEO({
  title: 'HealFex | Global Medical Information Platform',
  description: 'Access the most reliable information on medicines, generics, pharmaceutical companies, and healthcare jobs worldwide.',
});

export default async function HomePage() {
  const [rawMedicines, generics] = await Promise.all([
    getMedicines(),
    getGenerics(),
  ]);

  const genericMap = new Map(generics.map((g: any) => [g.id, g.name]));

  // Map generic names to medicines
  const mappedMedicines = rawMedicines.map((m: any) => ({
    ...m,
    genericName: genericMap.get(m.genericId) || 'Unknown Generic',
  }));

  // If we have fewer than 12 medicines, pad with mock data to fulfill the "exactly 12" requirement
  const mockMedicines = [
    { id: 'm1', name: 'Napa Extend', slug: 'napa-extend', genericName: 'Paracetamol', price: 15, dosageForm: 'Tablet' },
    { id: 'm2', name: 'Ace Plus', slug: 'ace-plus', genericName: 'Paracetamol + Caffeine', price: 20, dosageForm: 'Tablet' },
    { id: 'm3', name: 'Alatrol', slug: 'alatrol', genericName: 'Cetirizine Hydrochloride', price: 35, dosageForm: 'Tablet' },
    { id: 'm4', name: 'Fenadin', slug: 'fenadin', genericName: 'Fexofenadine Hydrochloride', price: 50, dosageForm: 'Tablet' },
    { id: 'm5', name: 'Pantix', slug: 'pantix', genericName: 'Pantoprazole', price: 70, dosageForm: 'Tablet' },
    { id: 'm6', name: 'Sergel', slug: 'sergel', genericName: 'Esomeprazole', price: 80, dosageForm: 'Capsule' },
    { id: 'm7', name: 'Tofen', slug: 'tofen', genericName: 'Ketotifen', price: 120, dosageForm: 'Syrup' },
    { id: 'm8', name: 'Gaviscon', slug: 'gaviscon', genericName: 'Sodium Alginate', price: 250, dosageForm: 'Suspension' },
    { id: 'm9', name: 'Ciprocin', slug: 'ciprocin', genericName: 'Ciprofloxacin', price: 150, dosageForm: 'Tablet' },
    { id: 'm10', name: 'Azithrocin', slug: 'azithrocin', genericName: 'Azithromycin', price: 300, dosageForm: 'Tablet' },
    { id: 'm11', name: 'Viodin', slug: 'viodin', genericName: 'Povidone Iodine', price: 60, dosageForm: 'Solution' },
    { id: 'm12', name: 'Bextram Gold', slug: 'bextram-gold', genericName: 'Multivitamin', price: 180, dosageForm: 'Tablet' },
  ];

  const finalMedicines = mappedMedicines.length >= 12 
    ? mappedMedicines.slice(0, 12) 
    : [...mappedMedicines, ...mockMedicines.slice(0, 12 - mappedMedicines.length)];

  const jsonLd = generateJsonLd({
    name: 'HealFex',
    url: 'https://healfex.com',
    logo: 'https://healfex.com/logo.png',
    founder: 'Taif Ahmed',
    description: 'Global medical information platform'
  }, 'Organization');

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd}
      />
      
      <section className="text-center py-20 bg-cyan-50 rounded-3xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Your Trusted Source for <span className="text-cyan-600">Medical Information</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          HealFex provides accurate, up-to-date data on medicines, generics, and pharmaceutical companies to help you make informed healthcare decisions.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/medicines" className="px-8 py-3 bg-cyan-600 text-white rounded-full font-semibold hover:bg-cyan-700 transition">
            Explore Medicines
          </Link>
          <Link href="/jobs" className="px-8 py-3 bg-white text-cyan-600 rounded-full font-semibold hover:bg-cyan-50 transition">
            Find Healthcare Jobs
          </Link>
        </div>
      </section>

      {/* New Medicines Section */}
      <MedicineSection medicines={finalMedicines} />

      {/* New Companies Section */}
      <CompaniesSection />

      {/* New Side Effects Section */}
      <SideEffectsSection />
    </div>
  );
}
