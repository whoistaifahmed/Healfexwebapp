import Link from 'next/link';
import MedicinesCard from './client/cards/MedicinesCard';

interface Medicine {
  id: string;
  name: string;
  slug: string;
  genericName: string;
  price: number;
  dosageForm: string;
}

export default function MedicineSection({ medicines }: { medicines: Medicine[] }) {
  // Ensure we have exactly 12 items for the design request
  const displayMedicines = medicines.slice(0, 12);

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Featured Medicines</h2>
        <Link href="/medicines" className="text-cyan-600 font-semibold hover:underline">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayMedicines.map((medicine) => (
          <MedicinesCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </section>
  );
}
