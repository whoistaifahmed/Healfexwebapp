import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateSEO, generateJsonLd } from '@/lib/seo';
import { getBlogBySlug } from '@/lib/db';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return {};
  return generateSEO({
    title: blog.title,
    description: blog.content.substring(0, 160),
    slug: `/blogs/${slug}`,
    type: 'article'
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const jsonLd = generateJsonLd({
    headline: blog.title,
    datePublished: blog.publishedAt,
    author: {
      '@type': 'Person',
      name: blog.author
    }
  }, 'BlogPosting');

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd}
      />
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-6 leading-tight">{blog.title}</h1>
        <div className="flex items-center gap-4 text-gray-500">
          <span className="font-medium text-gray-900">{blog.author}</span>
          <span>•</span>
          <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
        </div>
      </header>
      <div className="aspect-video bg-gray-100 rounded-3xl mb-12 flex items-center justify-center text-gray-300 font-bold">HERO IMAGE</div>
      <div className="prose prose-xl max-w-none text-gray-800 leading-relaxed">
        {blog.content}
      </div>
    </article>
  );
}
