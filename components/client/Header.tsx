'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SearchModal from './SearchModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Close menu on resize if desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle ESC key for Search Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Medicines', href: '/medicines' },
    { name: 'Generics', href: '/generics' },
    { name: 'Companies', href: '/companies' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Jobs', href: '/jobs' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm h-[60px] flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo (Left) */}
          <Link href="/" className="flex items-center space-x-2 group shrink-0">
            <div className="h-8 w-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-cyan-100 transition-transform group-hover:scale-105">H</div>
            <span className="text-xl font-bold tracking-tight text-slate-800">Heal<span className="text-cyan-600">Fex</span></span>
          </Link>

          {/* Nav List (Center - Desktop Only) */}
          <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[14px] font-medium text-slate-500 transition-all hover:text-cyan-600 whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons (Right) */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Icon */}
            <button 
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Menu Icon (Mobile Only) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-50 md:hidden transition-colors"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-[60px] left-0 right-0 bg-white shadow-lg border-t border-slate-100 md:hidden overflow-hidden"
            >
              <nav className="flex flex-col p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 text-base font-semibold text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Admin Dashboard</span>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </>
  );
}
