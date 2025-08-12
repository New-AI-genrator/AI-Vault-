import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/app/components/Analytics/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Tools Directory - Discover the Best AI Tools',
  description: 'Find and compare the best AI tools for your needs. Browse our comprehensive directory of artificial intelligence applications and services.',
  keywords: ['AI tools', 'artificial intelligence', 'machine learning', 'AI software', 'AI applications'],
  authors: [{ name: 'AI Tools Directory Team' }],
  creator: 'AI Tools Directory',
  publisher: 'AI Tools Directory',
  openGraph: {
    title: 'AI Tools Directory - Discover the Best AI Tools',
    description: 'Find and compare the best AI tools for your needs.',
    url: 'https://aitoolsdirectory.com',
    siteName: 'AI Tools Directory',
    images: [
      {
        url: 'https://aitoolsdirectory.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Tools Directory',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Directory - Discover the Best AI Tools',
    description: 'Find and compare the best AI tools for your needs.',
    images: ['https://aitoolsdirectory.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
