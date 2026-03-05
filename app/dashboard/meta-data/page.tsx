'use client';

import { Save, ShieldCheck } from 'lucide-react';

export default function DashboardMetaData() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Global Meta Data</h1>
        <p className="text-slate-500 font-medium">Configure tracking codes and SEO verification for the entire platform.</p>
      </div>

      <form className="space-y-8 bg-white p-10 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-2xl text-cyan-700 mb-4">
          <ShieldCheck size={20} />
          <p className="text-sm font-bold">These settings affect all public pages on HealFex.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div>
            <label className="block text-slate-900 font-bold mb-2">Google Analytics ID</label>
            <input 
              type="text" 
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium" 
              placeholder="G-XXXXXXXXXX" 
            />
          </div>
          
          <div>
            <label className="block text-slate-900 font-bold mb-2">Search Console Code</label>
            <textarea 
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium" 
              rows={4} 
              placeholder="<meta name='google-site-verification' ... />"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-slate-900 font-bold mb-2">Google Ads Code</label>
            <textarea 
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium" 
              rows={4} 
              placeholder="<!-- Global site tag (gtag.js) - Google Ads -->"
            ></textarea>
          </div>
        </div>

        <button 
          type="submit" 
          className="flex items-center gap-2 px-10 py-4 bg-cyan-600 text-white rounded-2xl font-bold hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-100"
        >
          <Save size={20} strokeWidth={2.5} />
          <span>Save Settings</span>
        </button>
      </form>
    </div>
  );
}
