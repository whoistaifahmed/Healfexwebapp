import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateSEO } from '@/lib/seo';
import { getGenericBySlug } from '@/lib/db';

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const generic = await getGenericBySlug(slug);
  if (!generic) return {};
  return generateSEO({
    title: `${generic.name} Pharmacology`,
    description: `Detailed information about ${generic.name} including pharmacology, dosage, and precautions.`,
    slug: `/generics/${slug}`
  });
}

export default async function GenericDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const generic = await getGenericBySlug(slug);
  if (!generic) notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">{generic.name}</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-2">Pharmacology</h2>
          <p className="text-gray-700">{generic.pharmacology}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2">Dosage</h2>
          <p className="text-gray-700">{generic.dosage}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2">Side Effects</h2>
          <p className="text-gray-700">{generic.sideEffects}</p>
        </section>
      </div>
    </div>
  );
}
