'use client';

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export default function StatCard({ label, value, icon: Icon, color, bg }: StatCardProps) {
  return (
    <div className="p-4 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className={`w-12 h-12 ${bg} ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{label}</h3>
      <p className="text-4xl font-black text-slate-900">{value}</p>
    </div>
  );
}
