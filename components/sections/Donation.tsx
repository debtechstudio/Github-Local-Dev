'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DonationForm } from '@/components/ui/donation-form';

export default function Donation() {
  return (
    <section id="donate" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-4 relative inline-block">
            Support the Temple
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#D4A017]" />
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="animate-fade-in-left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/temple.jpg"
                alt="Donate to Jagannath Temple"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Donation Form */}
          <div className="animate-fade-in-right">
            <div className="bg-[#FFF9F0] p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-prata text-[#E67A00] mb-4">
                Make a Donation
              </h3>
              <p className="text-[#6D6D6D] mb-6">
                Your generous contributions help maintain the temple and support various charitable activities
              </p>

              <DonationForm 
                isCompact={true}
                onSuccess={() => {
                  // Optional success callback if needed
                }}
              />

              <div className="text-center mt-6">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/donations">
                    View All Donation Options
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}