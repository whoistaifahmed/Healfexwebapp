'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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

  const navLinks = [
    { name: 'Medicines', href: '/medicines' },
    { name: 'Generics', href: '/generics' },
    { name: 'Companies', href: '/companies' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Jobs', href: '/jobs' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Section - 60px */}
      <div className="container mx-auto px-4 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="h-8 w-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-cyan-100 transition-transform group-hover:scale-105">H</div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Heal<span className="text-cyan-600">Fex</span></span>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[14px] font-medium text-slate-500 transition-all hover:text-cyan-600"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Dashboard Button / Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="hidden md:flex items-center space-x-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200 active:scale-95"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-50 md:hidden transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Bottom Section: Search Bar - 50px */}
      <div className="bg-white h-[50px] flex items-center">
        <div className="container mx-auto px-4 max-w-[1200px] w-full">
          <div className="relative flex items-center h-full">
            <div className="relative flex-1 flex items-center">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className={`h-4 w-4 transition-colors ${isSearchFocused ? 'text-cyan-500' : 'text-slate-300'}`} />
              </div>
              <input
                type="text"
                className="block w-full rounded-l-xl border-none bg-slate-50 h-9 pl-11 pr-4 text-sm placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100"
                placeholder="Search medicines, generics, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              <button className="h-9 px-6 bg-cyan-600 text-white text-[11px] font-bold tracking-wider rounded-r-xl hover:bg-cyan-700 transition-colors uppercase shadow-sm shadow-cyan-100">
                Search
              </button>
            </div>
            
            {/* Real-time Search Results Placeholder */}
            <AnimatePresence>
              {isSearchFocused && searchQuery.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-white p-3 shadow-2xl z-50"
                >
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Search Results for &quot;{searchQuery}&quot;
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-cyan-600 rounded-xl cursor-pointer transition-colors">
                      <div className="h-9 w-9 rounded-xl bg-cyan-50 text-cyan-500 mr-3 flex items-center justify-center font-bold">M</div>
                      <div>
                        <div className="font-semibold text-slate-700">Example Medicine</div>
                        <div className="text-[11px] text-slate-400">Generic Name • Company</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white overflow-hidden"
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
  );
}
