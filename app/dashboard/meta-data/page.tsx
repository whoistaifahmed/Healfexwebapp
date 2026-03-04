'use client';

export default function DashboardMetaData() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Global Meta Data</h1>
      <form className="space-y-6 bg-white p-8 rounded-2xl border">
        <div>
          <label className="block text-sm font-bold mb-1">Google Analytics ID</label>
          <input type="text" className="w-full p-3 border rounded-xl" placeholder="G-XXXXXXXXXX" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Search Console Code</label>
          <textarea className="w-full p-3 border rounded-xl" rows={3} placeholder="<meta name='google-site-verification' ... />"></textarea>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Google Ads Code</label>
          <textarea className="w-full p-3 border rounded-xl" rows={3} placeholder="<!-- Global site tag (gtag.js) - Google Ads -->"></textarea>
        </div>
        <button type="submit" className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold">Save Settings</button>
      </form>
    </div>
  );
}
