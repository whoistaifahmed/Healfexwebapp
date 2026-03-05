'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  startAfter, 
  QueryDocumentSnapshot, 
  DocumentData 
} from 'firebase/firestore';
import { db } from '@/firebase';
import MedicinesCard from '@/components/client/cards/MedicinesCard';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Plus } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  slug: string;
  genericId: string;
  genericName?: string;
  price: number;
  dosageForm: string;
}

const MOCK_MEDICINES = [
  { id: 'm1', name: 'Napa Extend', slug: 'napa-extend', genericId: 'mock', genericName: 'Paracetamol', price: 15, dosageForm: 'Tablet' },
  { id: 'm2', name: 'Ace Plus', slug: 'ace-plus', genericId: 'mock', genericName: 'Paracetamol + Caffeine', price: 20, dosageForm: 'Tablet' },
  { id: 'm3', name: 'Alatrol', slug: 'alatrol', genericId: 'mock', genericName: 'Cetirizine Hydrochloride', price: 35, dosageForm: 'Tablet' },
  { id: 'm4', name: 'Fenadin', slug: 'fenadin', genericId: 'mock', genericName: 'Fexofenadine Hydrochloride', price: 50, dosageForm: 'Tablet' },
  { id: 'm5', name: 'Pantix', slug: 'pantix', genericId: 'mock', genericName: 'Pantoprazole', price: 70, dosageForm: 'Tablet' },
  { id: 'm6', name: 'Sergel', slug: 'sergel', genericId: 'mock', genericName: 'Esomeprazole', price: 80, dosageForm: 'Capsule' },
  { id: 'm7', name: 'Tofen', slug: 'tofen', genericId: 'mock', genericName: 'Ketotifen', price: 120, dosageForm: 'Syrup' },
  { id: 'm8', name: 'Gaviscon', slug: 'gaviscon', genericId: 'mock', genericName: 'Sodium Alginate', price: 250, dosageForm: 'Suspension' },
  { id: 'm9', name: 'Ciprocin', slug: 'ciprocin', genericId: 'mock', genericName: 'Ciprofloxacin', price: 150, dosageForm: 'Tablet' },
  { id: 'm10', name: 'Azithrocin', slug: 'azithrocin', genericId: 'mock', genericName: 'Azithromycin', price: 300, dosageForm: 'Tablet' },
  { id: 'm11', name: 'Viodin', slug: 'viodin', genericId: 'mock', genericName: 'Povidone Iodine', price: 60, dosageForm: 'Solution' },
  { id: 'm12', name: 'Bextram Gold', slug: 'bextram-gold', genericId: 'mock', genericName: 'Multivitamin', price: 180, dosageForm: 'Tablet' },
  { id: 'm13', name: 'Fexo 120', slug: 'fexo-120', genericId: 'mock', genericName: 'Fexofenadine', price: 45, dosageForm: 'Tablet' },
  { id: 'm14', name: 'Napa 500', slug: 'napa-500', genericId: 'mock', genericName: 'Paracetamol', price: 10, dosageForm: 'Tablet' },
  { id: 'm15', name: 'Ace 500', slug: 'ace-500', genericId: 'mock', genericName: 'Paracetamol', price: 10, dosageForm: 'Tablet' },
  { id: 'm16', name: 'Zithrin', slug: 'zithrin', genericId: 'mock', genericName: 'Azithromycin', price: 280, dosageForm: 'Tablet' },
  { id: 'm17', name: 'Monas 10', slug: 'monas-10', genericId: 'mock', genericName: 'Montelukast', price: 150, dosageForm: 'Tablet' },
  { id: 'm18', name: 'Entacyd', slug: 'entacyd', genericId: 'mock', genericName: 'Antacid', price: 25, dosageForm: 'Suspension' },
];

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genericMap, setGenericMap] = useState<Map<string, string>>(new Map());
  const initialFetchRef = useRef(false);

  // Fetch generics first to map genericId to genericName
  useEffect(() => {
    const fetchGenerics = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'generics'));
        const gMap = new Map<string, string>();
        snapshot.docs.forEach(doc => {
          gMap.set(doc.id, doc.data().name);
        });
        setGenericMap(gMap);
      } catch (error) {
        console.error('Error fetching generics:', error);
      }
    };
    fetchGenerics();
  }, []);

  const fetchMedicines = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);
    else setLoadingMore(true);

    try {
      const medicinesCol = collection(db, 'medicines');
      let q = query(
        medicinesCol, 
        orderBy('createdAt', 'desc'), 
        limit(isInitial ? 18 : 10)
      );

      if (!isInitial && lastDoc) {
        q = query(
          medicinesCol, 
          orderBy('createdAt', 'desc'), 
          startAfter(lastDoc), 
          limit(10)
        );
      }

      const snapshot = await getDocs(q);
      
      const fetchedMedicines = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Medicine[];

      // Map generic names
      const mappedMedicines = fetchedMedicines.map(m => ({
        ...m,
        genericName: genericMap.get(m.genericId) || 'Unknown Generic'
      }));

      if (isInitial) {
        // If we have fewer than 18 medicines, pad with mock data
        if (mappedMedicines.length < 18) {
          const needed = 18 - mappedMedicines.length;
          const padded = [...mappedMedicines, ...MOCK_MEDICINES.slice(0, needed)];
          setMedicines(padded);
        } else {
          setMedicines(mappedMedicines);
        }
        setHasMore(snapshot.docs.length === 18);
      } else {
        setMedicines(prev => [...prev, ...mappedMedicines]);
        setHasMore(snapshot.docs.length === 10);
      }

      if (snapshot.docs.length > 0) {
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      } else if (isInitial && mappedMedicines.length === 0) {
        // If database is completely empty, just show mock data
        setMedicines(MOCK_MEDICINES.slice(0, 18));
        setHasMore(false);
      }

    } catch (error) {
      console.error('Error fetching medicines:', error);
      if (isInitial) {
        setMedicines(MOCK_MEDICINES.slice(0, 18));
        setHasMore(false);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [lastDoc, genericMap]);

  // Initial load once genericMap is ready
  useEffect(() => {
    if ((genericMap.size > 0 || medicines.length === 0) && !initialFetchRef.current) {
      initialFetchRef.current = true;
      fetchMedicines(true);
    }
  }, [genericMap, fetchMedicines, medicines.length]);

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            Medicines <span className="text-cyan-600">Directory</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto font-medium"
          >
            Browse our comprehensive database of pharmaceutical products, including dosage forms, pricing, and generic information.
          </motion.p>
        </header>

        {/* Grid Layout */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-cyan-600 animate-spin" />
            <p className="text-slate-500 font-bold animate-pulse">Loading Medicines...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {medicines.map((medicine, index) => (
                  <motion.div
                    key={`${medicine.id}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: (index % 18) * 0.05 }}
                  >
                    <MedicinesCard medicine={medicine as any} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => fetchMedicines(false)}
                  disabled={loadingMore}
                  className="group flex items-center gap-2 px-8 py-4 bg-white border-2 border-cyan-600 text-cyan-600 rounded-2xl font-black hover:bg-cyan-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-xl active:scale-95"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Fetching More...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                      <span>Load More Medicines</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {!hasMore && medicines.length > 0 && (
              <div className="text-center py-8">
                <p className="text-slate-400 font-bold italic">
                  You&apos;ve reached the end of the directory.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
