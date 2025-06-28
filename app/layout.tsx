import './globals.css';
import type { Metadata } from 'next';
import { Inter, Prata } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from './providers';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const prata = Prata({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-prata',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shri Jagannath Temple - Isnapur | Sacred Abode of Lord Jagannath',
  description: 'Visit the sacred Shri Jagannath Temple in Isnapur, Odisha. Experience divine darshan, participate in festivals, and contribute to temple activities.',
  keywords: 'Jagannath Temple, Isnapur, Odisha, Hindu Temple, Lord Jagannath, Balabhadra, Subhadra, Rath Yatra',
  authors: [{ name: 'Shri Jagannath Temple' }],
  creator: 'Shri Jagannath Temple',
  publisher: 'Shri Jagannath Temple',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://isanpurjagannath.in',
    title: 'Shri Jagannath Temple - Isnapur',
    description: 'Visit the sacred Shri Jagannath Temple in Isnapur, Odisha. Experience divine darshan, participate in festivals, and contribute to temple activities.',
    siteName: 'Shri Jagannath Temple',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shri Jagannath Temple - Isnapur',
    description: 'Visit the sacred Shri Jagannath Temple in Isnapur, Odisha. Experience divine darshan, participate in festivals, and contribute to temple activities.',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${prata.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1 pt-40">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}