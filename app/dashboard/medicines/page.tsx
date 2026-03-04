'use client';

export default function DashboardMedicines() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Medicines</h1>
        <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold">Add Medicine</button>
      </div>
      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-bold text-sm text-gray-500">Name</th>
              <th className="p-4 font-bold text-sm text-gray-500">Generic</th>
              <th className="p-4 font-bold text-sm text-gray-500">Price</th>
              <th className="p-4 font-bold text-sm text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-medium">Napa Extend</td>
              <td className="p-4 text-gray-600">Paracetamol</td>
              <td className="p-4">$1.20</td>
              <td className="p-4">
                <button className="text-blue-600 hover:underline mr-4">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
