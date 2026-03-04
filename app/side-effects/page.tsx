import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import { getSideEffects } from '@/lib/db';

export const revalidate = 86400;

export const metadata: Metadata = generateSEO({
  title: 'Side Effects Library',
  description: 'Learn about common and rare side effects of various medications.',
  slug: '/side-effects'
});

export default async function SideEffectsPage() {
  const sideEffects = await getSideEffects();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Side Effects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sideEffects.map((s: any) => (
          <a key={s.id} href={`/side-effects/${s.slug}`} className="p-6 border rounded-xl hover:border-red-200 hover:bg-red-50 transition">
            <h3 className="text-xl font-bold text-red-700">{s.name}</h3>
            <p className="text-sm text-gray-500 mt-2">Severity: {s.severity}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
