'use client';

import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Gallery from '@/components/sections/Gallery';

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <div className="pt-20">
        <Gallery />
      </div>
      <Footer />
    </main>
  );
}
