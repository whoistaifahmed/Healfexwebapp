import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'About Us',
  description: 'Learn about HealFex, our mission, and our team led by Taif Ahmed.',
  slug: '/about-us'
});

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">About HealFex</h1>
      <div className="prose prose-lg text-gray-700 space-y-6">
        <p>
          HealFex is a global medical information platform dedicated to providing accurate and accessible data on pharmaceutical products.
        </p>
        <p>
          Founded by <strong>Taif Ahmed</strong>, our mission is to bridge the gap between complex medical data and the people who need it most.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-12">Our Vision</h2>
        <p>
          We envision a world where every individual has the information they need to manage their health effectively and safely.
        </p>
      </div>
    </div>
  );
}
