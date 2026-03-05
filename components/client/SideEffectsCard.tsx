'use client';

import Image from 'next/image';
import Link from 'next/link';

interface SideEffectData {
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  severity: string;
}

interface SideEffectsCardProps {
  sideEffect: SideEffectData;
}

export default function SideEffectsCard({ sideEffect }: SideEffectsCardProps) {
  const { name, slug, description, imageUrl, severity } = sideEffect;

  // Truncate description to around 20-30 words
  const truncatedDescription = description
    ? description.split(' ').slice(0, 25).join(' ') + (description.split(' ').length > 25 ? '...' : '')
    : '';

  const getSeverityColor = (sev: string) => {
    switch (sev?.toLowerCase()) {
      case 'severe':
        return 'bg-rose-100 text-rose-700';
      case 'moderate':
        return 'bg-amber-100 text-amber-700';
      case 'mild':
      default:
        return 'bg-emerald-100 text-emerald-700';
    }
  };

  return (
    <Link 
      href={`/side-effects/${slug}`}
      className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden p-4"
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4">
        <Image
          src={imageUrl || `https://picsum.photos/seed/${slug}/800/450`}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${getSeverityColor(severity)}`}>
          {severity}
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors mb-2">
          {name}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {truncatedDescription}
        </p>
      </div>
    </Link>
  );
}
