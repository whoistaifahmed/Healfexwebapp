import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateSEO } from '@/lib/seo';
import { getSideEffectBySlug } from '@/lib/db';

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sideEffect = await getSideEffectBySlug(slug);
  if (!sideEffect) return {};
  return generateSEO({
    title: `${sideEffect.name} Information`,
    description: sideEffect.description,
    slug: `/side-effects/${slug}`
  });
}

export default async function SideEffectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sideEffect = await getSideEffectBySlug(slug);
  if (!sideEffect) notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          sideEffect.severity === 'severe' ? 'bg-red-100 text-red-700' : 
          sideEffect.severity === 'moderate' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {sideEffect.severity} Severity
        </span>
        <h1 className="text-4xl font-bold mt-4">{sideEffect.name}</h1>
      </div>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed">{sideEffect.description}</p>
      </div>
    </div>
  );
}
