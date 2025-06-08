'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-[1000] transition-all duration-300 ${
        isScrolled 
          ? 'top-0 bg-white/95 backdrop-blur-md shadow-lg' 
          : 'top-10 bg-white'
      } shadow-xl`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <Image
                src="images/logo.png"
                alt="Shri Jagannath Temple Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-prata text-[#E67A00] mb-1">
                श्री जगन्नाथ मंदिर
              </h1>
              <p className="text-xs md:text-sm text-[#1A5F1E] font-medium">
                Isnapur
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              href="/" 
              className="font-semibold text-[#1E1E24] hover:text-[#E67A00] transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E67A00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <div className="relative group">
              <button className="font-semibold text-[#1E1E24] hover:text-[#E67A00] transition-colors duration-300 flex items-center gap-1">
                About
                <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-3">
                  <Link href="/about" className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#FFF9F0] hover:text-[#E67A00] transition-colors duration-300">
                    About Temple
                  </Link>
                  <Link href="/deities" className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#FFF9F0] hover:text-[#E67A00] transition-colors duration-300">
                    Deities
                  </Link>
                  <Link href="/timings" className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#FFF9F0] hover:text-[#E67A00] transition-colors duration-300">
                    Temple Timings
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              href="/darshan" 
              className="font-semibold text-[#1E1E24] hover:text-[#E67A00] transition-colors duration-300 relative group"
            >
              Daily Darshan
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E67A00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <div className="relative group">
              <button className="font-semibold text-[#1E1E24] hover:text-[#E67A00] transition-colors duration-300 flex items-center gap-1">
                Services
                <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-3">
                  <Link href="/accommodation" className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#FFF9F0] hover:text-[#E67A00] transition-colors duration-300">
                    Accommodation
                  </Link>
                  <Link href="/annadanam" className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#FFF9F0] hover:text-[#E67A00] transition-colors duration-300">
                    Annadanam
                  </Link>
                  <Link href="/prasadam" className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#FFF9F0] hover:text-[#E67A00] transition-colors duration-300">
                    Prasadam
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              href="/events" 
              className="font-semibold text-[#1E1E24] hover:text-[#E67A00] transition-colors duration-300 relative group"
            >
              Events
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E67A00] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link 
              href="/gallery" 
              className="font-semibold text-[#1E1E24] hover:text-[#E67A00] transition-colors duration-300 relative group"
            >
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E67A00] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Button asChild className="bg-[#E67A00] hover:bg-[#D4A017] text-white">
              <Link href="/donations">Donate Now</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-[#1E1E24] hover:text-[#E67A00] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="px-4 py-2 text-[#1E1E24] hover:bg-[#FFF9F0] hover:text-[#E67A00] rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="px-4 py-2 text-[#1E1E24] hover:bg-[#FFF9F0] hover:text-[#E67A00] rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                About Temple
              </Link>
              <Link 
                href="/deities" 
                className="px-4 py-2 text-[#1E1E24] hover:bg-[#FFF9F0] hover:text-[#E67A00] rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Deities
              </Link>
              <Link 
                href="/darshan" 
                className="px-4 py-2 text-[#1E1E24] hover:bg-[#FFF9F0] hover:text-[#E67A00] rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Daily Darshan
              </Link>
              <Link 
                href="/events" 
                className="px-4 py-2 text-[#1E1E24] hover:bg-[#FFF9F0] hover:text-[#E67A00] rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Events
              </Link>
              <Link 
                href="/gallery" 
                className="px-4 py-2 text-[#1E1E24] hover:bg-[#FFF9F0] hover:text-[#E67A00] rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Gallery
              </Link>
              <Link
                href="/donations"
                className="px-4 py-2 bg-[#E67A00] text-white hover:bg-[#D4A017] rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Donate Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
