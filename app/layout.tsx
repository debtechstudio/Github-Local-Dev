import './globals.css';
import type { Metadata } from 'next';
import { Inter, Prata } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const prata = Prata({ weight: '400', subsets: ['latin'], variable: '--font-prata' });

export const metadata: Metadata = {
  title: 'Shri Jagannath Temple - Isnapur | Sacred Abode of Lord Jagannath',
  description: 'Visit the sacred Shri Jagannath Temple in Isnapur, Odisha. Experience divine darshan, participate in festivals, and contribute to temple activities.',
  keywords: 'Jagannath Temple, Isnapur, Odisha, Hindu Temple, Lord Jagannath, Balabhadra, Subhadra, Rath Yatra',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${prata.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}