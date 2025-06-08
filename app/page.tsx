import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import DailyDarshan from '@/components/sections/DailyDarshan';
import Deities from '@/components/sections/Deities';
import Donation from '@/components/sections/Donation';
import Events from '@/components/sections/Events';
import Gallery from '@/components/sections/Gallery';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <Hero />
      <About />
      <DailyDarshan />
      <Deities />
      <Donation />
      <Events />
      <Gallery />
      <Footer />
    </main>
  );
}