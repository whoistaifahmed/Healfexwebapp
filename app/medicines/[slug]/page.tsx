import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateSEO, generateJsonLd } from '@/lib/seo';
import { getMedicineBySlug } from '@/lib/db';

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const medicine = await getMedicineBySlug(slug);
  if (!medicine) return {};

  return generateSEO({
    title: `${medicine.name} Details`,
    description: medicine.description || `Information about ${medicine.name} including dosage, side effects, and more.`,
    slug: `/medicines/${slug}`
  });
}

export default async function MedicineDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const medicine = await getMedicineBySlug(slug);
  if (!medicine) notFound();

  const jsonLd = generateJsonLd({
    name: medicine.name,
    description: medicine.description,
    brand: {
      '@type': 'Brand',
      name: medicine.name
    }
  }, 'Drug');

  return (
    <div className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{medicine.name}</h1>
          <div className="flex gap-4 text-gray-500">
            <span>{medicine.strength}</span>
            <span>•</span>
            <span>{medicine.dosageForm}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Indications</h2>
              <p className="text-gray-700 leading-relaxed">{medicine.indications}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{medicine.description}</p>
            </section>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-2xl border">
              <h3 className="font-bold mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Price</span>
                  <span className="font-medium">${medicine.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Generic</span>
                  <a href={`/generics/${medicine.genericId}`} className="text-cyan-600 hover:underline">View Generic</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Company</span>
                  <a href={`/companies/${medicine.companyId}`} className="text-cyan-600 hover:underline">View Company</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
