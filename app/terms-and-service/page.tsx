import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Terms of Service',
  description: 'The terms and conditions for using the HealFex platform.',
  slug: '/terms-and-service'
});

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-sm text-gray-600 space-y-4">
        <p>By accessing HealFex, you agree to be bound by these terms.</p>
        <h2 className="text-xl font-bold text-gray-900">1. Use of Content</h2>
        <p>The information provided on HealFex is for informational purposes only and is not a substitute for professional medical advice.</p>
      </div>
    </div>
  );
}
