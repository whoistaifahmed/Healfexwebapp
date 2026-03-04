import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import { getGenerics } from '@/lib/db';

export const revalidate = 86400;

export const metadata: Metadata = generateSEO({
  title: 'Generics Database',
  description: 'Information on active ingredients and generic formulations.',
  slug: '/generics'
});

export default async function GenericsPage() {
  const generics = await getGenerics();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Generics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {generics.map((g: any) => (
          <a key={g.id} href={`/generics/${g.slug}`} className="p-6 border rounded-xl hover:bg-emerald-50 transition">
            <h3 className="text-xl font-bold text-emerald-700">{g.name}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}
