'use client';

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps) {
  // Cloudflare Image Resizing URL format
  // https://developers.cloudflare.com/images/transform-images/transform-via-url/
  const params = [
    `width=${width}`,
    `quality=${quality || 75}`,
    'format=webp',
    'fit=cover'
  ];
  
  // If the image is from Firebase Storage, we might need to handle it specifically
  // For this demo, we assume the src is already a full URL or a path that Cloudflare can handle
  // If it's a relative path, we prepend the base URL
  const baseUrl = 'https://healfex.com'; // Replace with actual domain
  const fullSrc = src.startsWith('http') ? src : `${baseUrl}${src}`;

  return `https://healfex.com/cdn-cgi/image/${params.join(',')}/${fullSrc}`;
}
