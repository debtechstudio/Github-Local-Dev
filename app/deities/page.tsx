'use client';

import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Deities from '@/components/sections/Deities';

export default function DeitiesPage() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <div className="pt-20">
        <Deities />
      </div>
      <Footer />
    </main>
  );
}
