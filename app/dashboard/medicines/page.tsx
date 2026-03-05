'use client';

import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';

export default function DashboardMedicines() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Manage Medicines</h1>
          <p className="text-slate-500 font-medium">Add, edit, or remove medicines from the database.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-2xl font-bold hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-100">
          <Plus size={20} strokeWidth={2.5} />
          <span>Add Medicine</span>
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search medicines..." 
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-600 rounded-2xl font-bold shadow-sm hover:bg-slate-50 transition-all">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-6 font-black text-xs uppercase tracking-widest text-slate-400">Name</th>
              <th className="p-6 font-black text-xs uppercase tracking-widest text-slate-400">Generic</th>
              <th className="p-6 font-black text-xs uppercase tracking-widest text-slate-400">Price</th>
              <th className="p-6 font-black text-xs uppercase tracking-widest text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { name: 'Napa Extend', generic: 'Paracetamol', price: '$1.20' },
              { name: 'Ace Plus', generic: 'Paracetamol + Caffeine', price: '$1.50' },
              { name: 'Fexo 120', generic: 'Fexofenadine', price: '$2.00' },
            ].map((med, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors group">
                <td className="p-6">
                  <p className="font-bold text-slate-900">{med.name}</p>
                  <p className="text-slate-400 text-sm font-medium">ID: MED-{1000 + i}</p>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-lg text-xs font-black uppercase tracking-wider">{med.generic}</span>
                </td>
                <td className="p-6 font-black text-slate-900">{med.price}</td>
                <td className="p-6">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
