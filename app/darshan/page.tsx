'use client';

import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DailyDarshan from '@/components/sections/DailyDarshan';

export default function DarshanPage() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <div className="pt-20">
        <DailyDarshan />
      </div>
      <Footer />
    </main>
  );
}
