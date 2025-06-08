'use client';

import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function AccommodationPage() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <div className="pt-28 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-8 text-center">
            Accommodation
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Standard Room */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/standard-room.jpg"
                  alt="Standard Room"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-prata text-[#1E1E24] mb-2">Standard Room</h3>
                <p className="text-[#6D6D6D] mb-4">
                  Comfortable accommodation with basic amenities suitable for pilgrims.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Price per night:</span>
                    <span className="font-medium">₹500</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Capacity:</span>
                    <span className="font-medium">2 Persons</span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href="/contact">Book Now</Link>
                </Button>
              </div>
            </div>

            {/* Deluxe Room */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/deluxe-room.jpg"
                  alt="Deluxe Room"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-prata text-[#1E1E24] mb-2">Deluxe Room</h3>
                <p className="text-[#6D6D6D] mb-4">
                  Spacious rooms with modern amenities and comfortable furnishings.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Price per night:</span>
                    <span className="font-medium">₹1,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Capacity:</span>
                    <span className="font-medium">3 Persons</span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href="/contact">Book Now</Link>
                </Button>
              </div>
            </div>

            {/* Family Suite */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/family-suite.jpg"
                  alt="Family Suite"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-prata text-[#1E1E24] mb-2">Family Suite</h3>
                <p className="text-[#6D6D6D] mb-4">
                  Luxury suites ideal for families with separate living area.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Price per night:</span>
                    <span className="font-medium">₹2,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Capacity:</span>
                    <span className="font-medium">4 Persons</span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href="/contact">Book Now</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-[#FFF9F0] p-6 rounded-2xl">
            <h2 className="text-xl font-prata text-[#1E1E24] mb-4">Booking Information</h2>
            <ul className="list-disc list-inside space-y-2 text-[#6D6D6D]">
              <li>Check-in time: 12:00 PM</li>
              <li>Check-out time: 11:00 AM</li>
              <li>ID proof is mandatory for check-in</li>
              <li>Advanced booking recommended during festival seasons</li>
              <li>Special rates available for group bookings</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
