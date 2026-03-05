'use client';

import { 
  Eye, 
  Calendar, 
  BarChart3, 
  Pill, 
  Dna, 
  Building2, 
  AlertTriangle, 
  FileText, 
  Briefcase 
} from 'lucide-react';
import StatCard from '@/components/dashboard/cards/StatCard';

export default function DashboardOverview() {
  const analyticsData = [
    { label: 'Today Views', value: '1,240', icon: Eye, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: '7-Day Views', value: '8,562', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: '30-Day Views', value: '32,410', icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const summaryData = [
    { label: 'Total Medicine', value: '450', icon: Pill, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Generics', value: '120', icon: Dna, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Companies', value: '85', icon: Building2, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total Side Effects', value: '2,100', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Total Blogs', value: '56', icon: FileText, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Total Jobs', value: '12', icon: Briefcase, color: 'text-sky-600', bg: 'bg-sky-50' },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Dashboard Overview</h1>
        <p className="text-slate-500 font-medium">Real-time analytics and platform summary.</p>
      </div>

      {/* Section 1: Analytics */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-6 bg-cyan-600 rounded-full" />
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">Analytics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analyticsData.map((item, idx) => (
            <StatCard key={idx} {...item} />
          ))}
        </div>
      </section>

      {/* Section 2: Summary */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-6 bg-cyan-600 rounded-full" />
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">Summary</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {summaryData.map((item, idx) => (
            <StatCard key={idx} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
