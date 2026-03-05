import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateSEO, generateJsonLd } from '@/lib/seo';
import { getJobBySlug } from '@/lib/db';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return {};
  return generateSEO({
    title: `${job.title} Job Opening`,
    description: job.description.substring(0, 160),
    slug: `/jobs/${slug}`
  });
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const jsonLd = generateJsonLd({
    title: job.title,
    description: job.description,
    jobLocation: {
      '@type': 'Place',
      address: job.location
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: job.salary
    }
  }, 'JobPosting');

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd}
      />
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">{job.title}</h1>
        <div className="flex gap-6 text-gray-500 text-lg">
          <span>{job.location}</span>
          <span>•</span>
          <span>{job.salary}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.requirements}</p>
          </section>
        </div>
        <div>
          <button className="w-full py-4 bg-cyan-600 text-white rounded-2xl font-bold text-lg hover:bg-cyan-700 transition shadow-lg shadow-cyan-200">
            Apply for this Position
          </button>
        </div>
      </div>
    </div>
  );
}
