'use client';

import { Phone, Mail, Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';
import Link from 'next/link';

export default function TopBar() {
  return (
    <div className="fixed top-0 w-full z-[1100] bg-gradient-to-r from-[#E67A00] to-[#D4A017] text-white py-2.5 text-sm animate-pulse-bg">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          <div className="flex items-center gap-4 md:gap-6">
            <Link 
              href="tel:+916752222002" 
              className="flex items-center gap-2 hover:text-[#FFF9F0] transition-all duration-300 hover:-translate-y-0.5"
            >
              <Phone size={14} />
              <span>+91 6752 222002</span>
            </Link>
            <Link 
              href="mailto:info@jagannathtemple.com" 
              className="flex items-center gap-2 hover:text-[#FFF9F0] transition-all duration-300 hover:-translate-y-0.5"
            >
              <Mail size={14} />
              <span className="hidden sm:inline">info@jagannathtemple.com</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <Link 
                href="#" 
                className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              >
                <Facebook size={14} />
              </Link>
              <Link 
                href="#" 
                className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              >
                <Instagram size={14} />
              </Link>
              <Link 
                href="#" 
                className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              >
                <Twitter size={14} />
              </Link>
              <Link 
                href="#" 
                className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              >
                <Youtube size={14} />
              </Link>
            </div>
            
            <Link 
              href="/donations" 
              className="bg-white/20 px-3 py-1.5 rounded-full font-semibold flex items-center gap-2 hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 text-xs md:text-sm"
            >
              <Heart size={14} />
              <span>Donate Now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}