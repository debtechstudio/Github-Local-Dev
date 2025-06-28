import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import DailyDarshan from '@/components/sections/DailyDarshan';
import Deities from '@/components/sections/Deities';
import Donation from '@/components/sections/Donation';
import Events from '@/components/sections/Events';
import Gallery from '@/components/sections/Gallery';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <DailyDarshan />
      <Deities />
      <Donation />
      <Events />
      <Gallery />
    </main>
  );
}