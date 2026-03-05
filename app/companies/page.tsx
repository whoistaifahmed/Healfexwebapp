import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import { getCompanies } from '@/lib/db';

export const revalidate = 86400;

export const metadata: Metadata = generateSEO({
  title: 'Pharmaceutical Companies',
  description: 'Directory of pharmaceutical companies and their medical products.',
  slug: '/companies'
});

export default async function CompaniesPage() {
  const companies = await getCompanies();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Companies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((c: any) => (
          <div key={c.id} className="p-8 border rounded-2xl flex items-center gap-6">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400">Logo</div>
            <div>
              <h3 className="text-xl font-bold">{c.name}</h3>
              <a href={`/companies/${c.slug}`} className="text-cyan-600 text-sm hover:underline">View Profile</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
