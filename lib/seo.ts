import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  slug?: string;
  ogImage?: string;
  type?: 'website' | 'article';
}

export function generateSEO({
  title,
  description,
  slug = '',
  ogImage = 'https://healfex.com/og-image.jpg',
  type = 'website'
}: SEOProps): Metadata {
  const url = `https://healfex.com${slug}`;
  const siteName = 'HealFex';
  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateJsonLd(data: any, type: string) {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    })
  };
}
