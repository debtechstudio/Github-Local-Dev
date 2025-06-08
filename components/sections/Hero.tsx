'use client';

import { Calendar, Heart, Phone, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="min-h-screen bg-fixed bg-cover bg-center relative isolate flex items-center text-center pt-32" style={{ backgroundImage: 'url(/images/hero-slide-1.jpg)' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      <div className="container-custom">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-prata mb-6 leading-tight text-white drop-shadow-lg">
          Experience the Divine Presence of Lord Jagannath
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white opacity-90 max-w-3xl mx-auto font-medium">
          Visit the sacred abode of Lord Jagannath, Balabhadra, and Subhadra in the holy city of Isnapur
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button 
            asChild
            className="bg-[#E67A00] hover:bg-[#D4A017] text-white px-8 py-3 text-base font-semibold rounded-full"
          >
            <Link href="#events" className="flex items-center gap-2">
              <Calendar size={20} />
              Upcoming Events
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline"
            className="btn-outline px-8 py-3 text-base font-semibold rounded-full border-2 border-white text-white hover:bg-white hover:text-[#E67A00] transition-colors duration-300"
          >
            <Link href="/donations" className="flex items-center gap-2">
              <Heart size={20} />
              Donate Now
            </Link>
          </Button>
        </div>

        {/* Contact and Social Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <Phone size={20} className="text-white" />
            <span className="text-white">+91 (040) 2222 4422</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-white hover:text-[#E67A00] transition-colors duration-300">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="text-white hover:text-[#E67A00] transition-colors duration-300">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-white hover:text-[#E67A00] transition-colors duration-300">
              <Youtube size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}