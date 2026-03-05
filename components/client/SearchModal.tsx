'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Pill, Dna, Building2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchResult {
  id: string;
  name: string;
  category: 'Medicine' | 'Generic' | 'Company';
}

const mockResults: SearchResult[] = [
  { id: '1', name: 'Paracetamol 500mg', category: 'Medicine' },
  { id: '2', name: 'Omeprazole 20mg', category: 'Medicine' },
  { id: '3', name: 'Acetaminophen', category: 'Generic' },
  { id: '4', name: 'Proton Pump Inhibitor', category: 'Generic' },
  { id: '5', name: 'Square Pharmaceuticals', category: 'Company' },
  { id: '6', name: 'Beximco Pharma', category: 'Company' },
  { id: '7', name: 'Napa Extend', category: 'Medicine' },
  { id: '8', name: 'Incepta Pharmaceuticals', category: 'Company' },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Calculate results during render
  const results = query.trim().length > 0 
    ? mockResults.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Medicine':
        return <Pill className="h-5 w-5 text-blue-500" />;
      case 'Generic':
        return <Dna className="h-5 w-5 text-purple-500" />;
      case 'Company':
        return <Building2 className="h-5 w-5 text-amber-500" />;
      default:
        return <Search className="h-5 w-5 text-slate-400" />;
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Medicine':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Generic':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Company':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Mobile Close Button (Fixed) */}
          <div className="fixed top-4 right-4 z-[110] md:hidden">
            <button
              onClick={onClose}
              className="p-3 bg-white rounded-full shadow-lg text-slate-500 active:scale-95 transition-transform"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Search Input Area */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <div className="flex-1 flex items-center gap-3 bg-transparent transition-all">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search medicines, generics, or companies..."
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-base md:text-lg text-slate-800 placeholder-slate-400 py-1"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button
                onClick={onClose}
                className="hidden md:flex p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-medium">Start typing to search across HealFex</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-[6px] p-3 hover:bg-slate-50 rounded-2xl cursor-pointer group transition-colors"
                    >
                      <div className="shrink-0">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 truncate">{item.name}</h4>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getCategoryBadgeColor(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center">
                  <p className="text-slate-500 font-medium">No results found for &quot;{query}&quot;</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <span>{results.length} results found</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-500">ESC</span> to close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
