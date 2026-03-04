import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import { getBlogs } from '@/lib/db';

export const revalidate = 3600;

export const metadata: Metadata = generateSEO({
  title: 'Health Blogs & Articles',
  description: 'Read the latest health tips, medical news, and wellness articles.',
  slug: '/blogs'
});

export default async function BlogsPage() {
  const blogs = await getBlogs();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">Health Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {blogs.map((b: any) => (
          <article key={b.id} className="group">
            <div className="aspect-video bg-gray-100 rounded-3xl mb-6 overflow-hidden">
              {/* Image placeholder */}
              <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-2xl">BLOG IMAGE</div>
            </div>
            <h2 className="text-2xl font-bold mb-3 group-hover:text-emerald-600 transition">{b.title}</h2>
            <p className="text-gray-600 line-clamp-3 mb-4">{b.content}</p>
            <a href={`/blogs/${b.slug}`} className="font-bold text-emerald-600 hover:underline">Read Article &rarr;</a>
          </article>
        ))}
      </div>
    </div>
  );
}
