import { MetadataRoute } from 'next';
import { getMedicines, getGenerics, getCompanies, getBlogs, getJobs } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://healfex.com';

  // Fetch all dynamic routes
  const medicines = await getMedicines();
  const generics = await getGenerics();
  const companies = await getCompanies();
  const blogs = await getBlogs();
  const jobs = await getJobs();

  const medicineUrls = medicines.map((m: any) => ({
    url: `${baseUrl}/medicines/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const genericUrls = generics.map((g: any) => ({
    url: `${baseUrl}/generics/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const companyUrls = companies.map((c: any) => ({
    url: `${baseUrl}/companies/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const blogUrls = blogs.map((b: any) => ({
    url: `${baseUrl}/blogs/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const jobUrls = jobs.map((j: any) => ({
    url: `${baseUrl}/jobs/${j.slug}`,
    lastModified: new Date(j.postedAt),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/medicines`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/generics`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/companies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...medicineUrls,
    ...genericUrls,
    ...companyUrls,
    ...blogUrls,
    ...jobUrls,
  ];
}
