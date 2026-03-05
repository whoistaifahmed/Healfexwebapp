'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Pill, 
  Dna, 
  Building2, 
  AlertTriangle, 
  FileText, 
  Briefcase, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/medicines', label: 'Medicines', icon: Pill },
  { href: '/dashboard/generics', label: 'Generics', icon: Dna },
  { href: '/dashboard/companies', label: 'Companies', icon: Building2 },
  { href: '/dashboard/side-effects', label: 'Side Effects', icon: AlertTriangle },
  { href: '/dashboard/blogs', label: 'Blogs', icon: FileText },
  { href: '/dashboard/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/dashboard/meta-data', label: 'Meta Data', icon: Settings },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <aside className={`${isCollapsed ? 'w-[60px]' : 'w-72'} bg-white flex flex-col h-screen sticky top-0 shadow-sm transition-all duration-300 ease-in-out`}>
      <div className={`${isCollapsed ? 'p-2' : 'p-8'} flex flex-col h-full`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center mt-4' : 'justify-between'} mb-8`}>
          {!isCollapsed && (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="min-w-[40px] w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-100">H</div>
              <span className="font-black text-2xl text-slate-900 tracking-tight whitespace-nowrap">HealFex</span>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-cyan-600 transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-all duration-200 ${
                  isActive 
                    ? 'bg-cyan-50 text-cyan-600' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon size={20} strokeWidth={2.5} className="min-w-[20px]" />
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-50">
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-3 p-3 w-full rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? 'Logout' : ''}
          >
            <LogOut size={20} strokeWidth={2.5} className="min-w-[20px]" />
            {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
