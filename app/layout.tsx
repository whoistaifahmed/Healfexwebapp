import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'HealFex | Global Medical Information Platform',
  description: 'HealFex provides comprehensive information on medicines, generics, pharmaceutical companies, and healthcare jobs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning className="min-h-screen bg-white font-sans antialiased">
        <header className="border-b bg-white">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="text-2xl font-bold text-emerald-600">HealFex</div>
            <nav className="hidden space-x-6 md:flex">
              <Link href="/medicines" className="text-sm font-medium hover:text-emerald-600">Medicines</Link>
              <Link href="/generics" className="text-sm font-medium hover:text-emerald-600">Generics</Link>
              <Link href="/companies" className="text-sm font-medium hover:text-emerald-600">Companies</Link>
              <Link href="/blogs" className="text-sm font-medium hover:text-emerald-600">Blogs</Link>
              <Link href="/jobs" className="text-sm font-medium hover:text-emerald-600">Jobs</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-900">Admin</Link>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Platform</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/about-us" className="text-base text-gray-500 hover:text-gray-900">About Us</Link></li>
                  <li><Link href="/contact-us" className="text-base text-gray-500 hover:text-gray-900">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/privacy-policy" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</Link></li>
                  <li><Link href="/terms-and-service" className="text-base text-gray-500 hover:text-gray-900">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-200 pt-8">
              <p className="text-base text-gray-400">&copy; 2026 HealFex. All rights reserved. Founder & CEO: Taif Ahmed</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
