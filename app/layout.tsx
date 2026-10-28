import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import StickyCta from '@/components/StickyCta';
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from '@/config/site';
import { organizationSchema, webSiteSchema } from '@/lib/schema';
import { getAllTags } from '@/lib/posts';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | E-Ticaret Operasyon Rehberi`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'e-ticaret',
    'pazaryeri entegrasyonu',
    'trendyol entegrasyon',
    'e-fatura entegrasyonu',
    'ön muhasebe',
    'stok takibi',
    'e-ticaret rehberi',
    ...getAllTags(),
  ],
  applicationName: SITE_NAME,
  creator: 'Entegrematik',
  publisher: 'Entegrematik',
  category: 'technology',
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | E-Ticaret Operasyon Rehberi`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Entegrematik Blog — E-Ticaret Operasyon Rehberi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | E-Ticaret Operasyon Rehberi`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
    site: '@entegrematik',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={inter.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col font-sans" suppressHydrationWarning>
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}