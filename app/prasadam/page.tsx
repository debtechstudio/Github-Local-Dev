'use client';

import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrasadamPage() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <div className="pt-28 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-8 text-center">
            Temple Prasadam
          </h1>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <Image
                src="/prasadam.jpg"
                alt="Temple Prasadam"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-4">Sacred Offerings</h2>
              <p className="text-[#6D6D6D] mb-6 leading-relaxed">
                Prasadam is the sacred food offering made to Lord Jagannath, which is later distributed 
                to devotees. It is believed to be spiritually purifying and carries the Lord's blessings.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">
                  Book Prasadam
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Daily Prasadam */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-prata text-[#1E1E24] mb-4">Daily Prasadam</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Khichdi</span>
                  <span className="font-medium">₹51</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sweet Rice</span>
                  <span className="font-medium">₹31</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Dry Prasad</span>
                  <span className="font-medium">₹21</span>
                </div>
              </div>
            </div>

            {/* Special Prasadam */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-prata text-[#1E1E24] mb-4">Special Prasadam</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Festival Special</span>
                  <span className="font-medium">₹251</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Panjiri</span>
                  <span className="font-medium">₹151</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Laddu Box</span>
                  <span className="font-medium">₹101</span>
                </div>
              </div>
            </div>

            {/* Bulk Orders */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-prata text-[#1E1E24] mb-4">Bulk Orders</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Group Pack (10)</span>
                  <span className="font-medium">₹501</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Family Pack</span>
                  <span className="font-medium">₹1,001</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Event Pack</span>
                  <span className="font-medium">₹2,501</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF9F0] p-8 rounded-2xl">
            <h2 className="text-xl font-prata text-[#1E1E24] mb-4">Ordering Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3 text-[#6D6D6D]">
                <h3 className="font-medium text-[#1E1E24]">How to Order</h3>
                <p>1. Visit the temple counter</p>
                <p>2. Call temple office</p>
                <p>3. Book online (for bulk orders)</p>
                <p>4. Advance booking required for special occasions</p>
              </div>
              <div className="space-y-3 text-[#6D6D6D]">
                <h3 className="font-medium text-[#1E1E24]">Important Notes</h3>
                <p>• Collection timing: 10 AM - 7 PM</p>
                <p>• Bulk orders need 24hrs notice</p>
                <p>• Festival orders need advance booking</p>
                <p>• Special packaging available on request</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
