'use client';

import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Events from '@/components/sections/Events';

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <div className="pt-20">
        <Events />
      </div>
      <Footer />
    </main>
  );
}
