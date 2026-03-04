import { Metadata } from 'next';
import Link from 'next/link';
import { generateSEO, generateJsonLd } from '@/lib/seo';
import { getMedicines, getBlogs, getJobs } from '@/lib/db';

export const revalidate = 86400; // 24 hours

export const metadata: Metadata = generateSEO({
  title: 'HealFex | Global Medical Information Platform',
  description: 'Access the most reliable information on medicines, generics, pharmaceutical companies, and healthcare jobs worldwide.',
});

export default async function HomePage() {
  const medicines = await getMedicines();
  const blogs = await getBlogs();
  const jobs = await getJobs();

  const jsonLd = generateJsonLd({
    name: 'HealFex',
    url: 'https://healfex.com',
    logo: 'https://healfex.com/logo.png',
    founder: 'Taif Ahmed',
    description: 'Global medical information platform'
  }, 'Organization');

  return (
    <div className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd}
      />
      
      <section className="text-center py-20 bg-emerald-50 rounded-3xl mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Your Trusted Source for <span className="text-emerald-600">Medical Information</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          HealFex provides accurate, up-to-date data on medicines, generics, and pharmaceutical companies to help you make informed healthcare decisions.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/medicines" className="px-8 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition">
            Explore Medicines
          </Link>
          <Link href="/jobs" className="px-8 py-3 bg-white text-emerald-600 border border-emerald-600 rounded-full font-semibold hover:bg-emerald-50 transition">
            Find Healthcare Jobs
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Latest Medicines</h2>
          <ul className="space-y-2">
            {medicines.slice(0, 5).map((m: any) => (
              <li key={m.id}>
                <Link href={`/medicines/${m.slug}`} className="text-emerald-600 hover:underline">{m.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-6 border rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Health Blogs</h2>
          <ul className="space-y-2">
            {blogs.slice(0, 5).map((b: any) => (
              <li key={b.id}>
                <Link href={`/blogs/${b.slug}`} className="text-emerald-600 hover:underline">{b.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 border rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Recent Jobs</h2>
          <ul className="space-y-2">
            {jobs.slice(0, 5).map((j: any) => (
              <li key={j.id}>
                <Link href={`/jobs/${j.slug}`} className="text-emerald-600 hover:underline">{j.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
