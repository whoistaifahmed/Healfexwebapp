'use client';

export default function DashboardOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white rounded-2xl shadow-sm border">
          <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Total Medicines</h3>
          <p className="text-4xl font-bold">1,240</p>
        </div>
        <div className="p-8 bg-white rounded-2xl shadow-sm border">
          <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Total Blogs</h3>
          <p className="text-4xl font-bold">85</p>
        </div>
        <div className="p-8 bg-white rounded-2xl shadow-sm border">
          <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Active Jobs</h3>
          <p className="text-4xl font-bold">12</p>
        </div>
      </div>
    </div>
  );
}
