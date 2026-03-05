'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { db } from '@/firebase';
import SideEffectsCard from './SideEffectsCard';
import { motion } from 'motion/react';
import Link from 'next/link';

interface SideEffect {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  severity: string;
}

export default function SideEffectsSection() {
  const [sideEffects, setSideEffects] = useState<SideEffect[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'side-effects'), limit(4));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const effectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SideEffect[];
      
      setSideEffects(effectsData);
      
      // If no side effects in DB, provide some mock ones for design purposes
      if (effectsData.length === 0) {
        const mockEffects: SideEffect[] = [
          { 
            id: 'se1', 
            name: 'Drowsiness', 
            slug: 'drowsiness', 
            description: 'A feeling of being sleepy or lethargic.', 
            severity: 'Mild',
            imageUrl: 'https://picsum.photos/seed/sleep/400/300'
          },
          { 
            id: 'se2', 
            name: 'Nausea', 
            slug: 'nausea', 
            description: 'A sensation of unease and discomfort in the upper stomach.', 
            severity: 'Moderate',
            imageUrl: 'https://picsum.photos/seed/nausea/400/300'
          },
          { 
            id: 'se3', 
            name: 'Dizziness', 
            slug: 'dizziness', 
            description: 'An impairment in spatial perception and stability.', 
            severity: 'Mild',
            imageUrl: 'https://picsum.photos/seed/dizzy/400/300'
          },
          { 
            id: 'se4', 
            name: 'Dry Mouth', 
            slug: 'dry-mouth', 
            description: 'A condition where the salivary glands don\'t make enough saliva.', 
            severity: 'Mild',
            imageUrl: 'https://picsum.photos/seed/mouth/400/300'
          },
        ];
        setSideEffects(mockEffects);
      }
      
      setLoading(false);
    }, (error) => {
      console.error("Error fetching side effects:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section className="bg-slate-50/50 rounded-3xl p-8">
        <div className="container">
          <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="aspect-video bg-slate-100 rounded-xl mb-4 animate-pulse"></div>
                <div className="h-6 w-3/4 bg-slate-100 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-full bg-slate-100 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sideEffects.length === 0) {
    return (
      <section className="bg-slate-50/50 rounded-3xl p-8 text-center">
        <p className="text-slate-500 font-medium">No side effects found.</p>
      </section>
    );
  }

  return (
    <section className="bg-slate-50/50 rounded-3xl p-8">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Common <span className="text-cyan-600">Side Effects</span>
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Learn about potential side effects of common medications.
            </p>
          </div>
          <Link 
            href="/side-effects" 
            className="text-sm font-bold text-cyan-600 hover:text-cyan-700 transition-colors flex items-center gap-1 group"
          >
            View All
            <span className="group-hover:translate-x-1 transition-transform">â†’</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sideEffects.map((effect, index) => (
            <motion.div
              key={effect.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SideEffectsCard sideEffect={effect} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
