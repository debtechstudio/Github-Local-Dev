'use client';

import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import About from '@/components/sections/About';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <div className="pt-20">
        <About />
      </div>
      <Footer />
    </main>
  );
}
