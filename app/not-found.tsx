import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-9xl font-black text-emerald-100 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-8">Page Not Found</h2>
      <p className="text-gray-500 mb-12 max-w-md mx-auto">
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition">
        Back to Home
      </Link>
    </div>
  );
}
