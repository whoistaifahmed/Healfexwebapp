'use client';

import Link from 'next/link';
import { Mail, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Top: Newsletter Section */}
        <div className="bg-cyan-600 rounded-[3rem] p-8 md:p-16 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-cyan-100">
          <div className="max-w-md text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Stay Healthy, Stay Informed</h2>
            <p className="text-cyan-100 font-medium">Subscribe to our newsletter for the latest medical updates and health tips.</p>
          </div>
          <div className="w-full max-w-md">
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600 z-10">
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full pl-12 pr-32 py-5 bg-white rounded-2xl outline-none focus:ring-4 focus:ring-white/20 transition-all font-bold text-slate-900"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-cyan-700 transition-all">
                <span>Join</span>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-black text-xl">H</div>
              <span className="font-black text-2xl text-slate-900 tracking-tight">HealFex</span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed">
              Your trusted global platform for medical information, medicines, and healthcare career opportunities.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Platform</h3>
            <ul className="space-y-4">
              <li><Link href="/medicines" className="text-slate-600 font-bold hover:text-cyan-600 transition-colors">Medicines</Link></li>
              <li><Link href="/generics" className="text-slate-600 font-bold hover:text-cyan-600 transition-colors">Generics</Link></li>
              <li><Link href="/companies" className="text-slate-600 font-bold hover:text-cyan-600 transition-colors">Companies</Link></li>
              <li><Link href="/jobs" className="text-slate-600 font-bold hover:text-cyan-600 transition-colors">Healthcare Jobs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about-us" className="text-slate-600 font-bold hover:text-cyan-600 transition-colors">About Us</Link></li>
              <li><Link href="/blogs" className="text-slate-600 font-bold hover:text-cyan-600 transition-colors">Health Blogs</Link></li>
              <li><Link href="/contact-us" className="text-slate-600 font-bold hover:text-cyan-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/privacy-policy" className="text-slate-600 font-bold hover:text-cyan-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-service" className="text-slate-600 font-bold hover:text-cyan-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-100/50">
          <p className="text-slate-400 font-bold text-sm">
            &copy; 2026 HealFex. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-slate-300 text-xs font-black uppercase tracking-widest">Founder & CEO</span>
            <span className="px-3 py-1 bg-white rounded-full text-slate-900 font-black text-xs shadow-sm">Taif Ahmed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
