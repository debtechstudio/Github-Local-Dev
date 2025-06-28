'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-[1000] bg-white ${
        isScrolled ? 'top-0' : 'top-[50px]'
      } shadow-md`}
    >
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 flex-shrink min-w-0">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Shri Jagannath Temple Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex-shrink-0">
              <div className="text-sm font-prata text-[#E67A00] whitespace-nowrap">
                श्री जगन्नाथ मंदिर
              </div>
              <div className="text-[10px] text-[#1A5F1E] font-medium whitespace-nowrap">
                Isnapur
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="font-semibold text-[#1E1E24] hover:text-[#E67A00] transition-colors duration-300">
              Home
            </Link>
            <Link href="/about" className="font-semibold text-[#1E1E24] hover:text-[#E67A00] transition-colors duration-300">
              About
            </Link>
            <Link href="/darshan" className="font-semibold text-[#1E1E24] hover:text-[#E67A00] transition-colors duration-300">
              Daily Darshan
            </Link>
            <Link href="/events" className="font-semibold text-[#1E1E24] hover:text-[#E67A00] transition-colors duration-300">
              Events
            </Link>
            <Link href="/gallery" className="font-semibold text-[#1E1E24] hover:text-[#E67A00] transition-colors duration-300">
              Gallery
            </Link>
            <Button asChild className="bg-[#E67A00] hover:bg-[#D4A017] text-white">
              <Link href="/donations">Donate Now</Link>
            </Button>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block lg:hidden"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden border-t border-gray-100 py-4 space-y-2 bg-white">
            <Link 
              href="/" 
              className="block px-4 py-2 text-[#1E1E24] hover:bg-[#FFF9F0] hover:text-[#E67A00]"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-2 text-[#1E1E24] hover:bg-[#FFF9F0] hover:text-[#E67A00]"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/darshan" 
              className="block px-4 py-2 text-[#1E1E24] hover:bg-[#FFF9F0] hover:text-[#E67A00]"
              onClick={() => setIsMenuOpen(false)}
            >
              Daily Darshan
            </Link>
            <Link 
              href="/events" 
              className="block px-4 py-2 text-[#1E1E24] hover:bg-[#FFF9F0] hover:text-[#E67A00]"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              href="/gallery" 
              className="block px-4 py-2 text-[#1E1E24] hover:bg-[#FFF9F0] hover:text-[#E67A00]"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <div className="px-4 pt-2">
              <Button asChild className="w-full bg-[#E67A00] hover:bg-[#D4A017] text-white">
                <Link href="/donations">Donate Now</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
