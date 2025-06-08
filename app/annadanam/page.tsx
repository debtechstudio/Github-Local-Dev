'use client';

import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AnnadanamPage() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <div className="pt-28 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-8 text-center">
            Annadanam Service
          </h1>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <Image
                src="/annadanam.jpg"
                alt="Annadanam Service"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-4">
                Serving with Devotion
              </h2>
              <p className="text-[#6D6D6D] mb-6 leading-relaxed">
                Annadanam is one of the most sacred services offered at our temple. It involves providing 
                free meals to devotees and the needy, embodying the principle of serving humanity through 
                food donation. This service is considered highly meritorious in Hindu dharma.
              </p>
              <Button asChild size="lg">
                <Link href="/donate">
                  Contribute to Annadanam
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Daily Meals */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-prata text-[#1E1E24] mb-4">Daily Meals</h3>
              <ul className="space-y-3 text-[#6D6D6D]">
                <li>• Breakfast: 8:00 AM - 10:00 AM</li>
                <li>• Lunch: 12:00 PM - 2:00 PM</li>
                <li>• Dinner: 7:00 PM - 9:00 PM</li>
              </ul>
            </div>

            {/* Sponsorship Options */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-prata text-[#1E1E24] mb-4">Sponsorship Options</h3>
              <ul className="space-y-3 text-[#6D6D6D]">
                <li>• One-time meal: ₹5,100</li>
                <li>• Weekly sponsorship: ₹25,000</li>
                <li>• Monthly sponsorship: ₹1,00,000</li>
              </ul>
            </div>

            {/* Special Occasions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-prata text-[#1E1E24] mb-4">Special Occasions</h3>
              <ul className="space-y-3 text-[#6D6D6D]">
                <li>• Birthdays celebrations</li>
                <li>• Marriage anniversaries</li>
                <li>• In memory of loved ones</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#FFF9F0] p-8 rounded-2xl">
            <h2 className="text-xl font-prata text-[#1E1E24] mb-4">How to Sponsor</h2>
            <div className="space-y-4 text-[#6D6D6D]">
              <p>
                1. Choose your preferred sponsorship option or amount
              </p>
              <p>
                2. Fill out the donation form with your details
              </p>
              <p>
                3. Make the payment through our secure gateway
              </p>
              <p>
                4. Receive confirmation and blessing certificate
              </p>
              <div className="mt-6">
                <Button asChild size="lg">
                  <Link href="/donate">
                    Sponsor Annadanam Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
