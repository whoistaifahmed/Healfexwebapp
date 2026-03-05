import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import { getJobs } from '@/lib/db';

export const revalidate = 3600;

export const metadata: Metadata = generateSEO({
  title: 'Healthcare Jobs',
  description: 'Find your next career opportunity in the medical and healthcare sector.',
  slug: '/jobs'
});

export default async function JobsPage() {
  const jobs = await getJobs();
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Healthcare Jobs</h1>
          <p className="text-gray-500 text-lg">Opportunities for medical professionals worldwide.</p>
        </div>
      </div>
      <div className="space-y-4">
        {jobs.map((j: any) => (
          <a key={j.id} href={`/jobs/${j.slug}`} className="block p-8 rounded-2xl bg-slate-50 hover:bg-cyan-50 transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold mb-1">{j.title}</h3>
                <p className="text-slate-600 mb-4">{j.location} • {j.salary}</p>
              </div>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-bold text-cyan-600">Apply Now</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
