import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateSEO } from '@/lib/seo';
import { getCompanyBySlug } from '@/lib/db';

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  if (!company) return {};
  return generateSEO({
    title: `${company.name} Profile`,
    description: `Information about ${company.name}, their address, contact, and medical products.`,
    slug: `/companies/${slug}`
  });
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  if (!company) notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center gap-8 mb-12">
        <div className="w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-gray-300">LOGO</div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
          <p className="text-gray-500">{company.address}</p>
        </div>
      </div>
      <div className="p-8 bg-gray-50 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <p className="text-gray-700">{company.contact}</p>
      </div>
    </div>
  );
}
