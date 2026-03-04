'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        // router.push('/login'); // Redirect if not logged in
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="p-20 text-center">Loading Admin Panel...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r">
        <div className="p-6 font-bold text-xl text-emerald-600 border-b">HealFex Admin</div>
        <nav className="p-4 space-y-2">
          <a href="/dashboard" className="block p-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium">Overview</a>
          <a href="/dashboard/medicines" className="block p-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium">Medicines</a>
          <a href="/dashboard/generics" className="block p-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium">Generics</a>
          <a href="/dashboard/companies" className="block p-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium">Companies</a>
          <a href="/dashboard/side-effects" className="block p-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium">Side Effects</a>
          <a href="/dashboard/blogs" className="block p-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium">Blogs</a>
          <a href="/dashboard/jobs" className="block p-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium">Jobs</a>
          <a href="/dashboard/meta-data" className="block p-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium">Meta Data</a>
        </nav>
      </aside>
      <main className="flex-1 p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
