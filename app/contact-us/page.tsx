import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Contact Us',
  description: 'Get in touch with the HealFex team for inquiries, support, or feedback.',
  slug: '/contact-us'
});

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea rows={5} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="How can we help you?"></textarea>
        </div>
        <button type="submit" className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition">
          Send Message
        </button>
      </form>
    </div>
  );
}
