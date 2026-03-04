import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Privacy Policy',
  description: 'How HealFex handles and protects your data.',
  slug: '/privacy-policy'
});

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-sm text-gray-600 space-y-4">
        <p>Last updated: March 2026</p>
        <p>Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
        {/* Placeholder text */}
        <h2 className="text-xl font-bold text-gray-900">1. Data Collection</h2>
        <p>We collect information you provide directly to us when you use our platform.</p>
      </div>
    </div>
  );
}
