'use client';

import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const quickLinks = [
    { name: 'About Temple', href: '/about' },
    { name: 'Daily Darshan', href: '/darshan' },
    { name: 'Samayika Niti', href: '/darshan/samayika-niti' },
    { name: 'Temple Timings', href: '/timings' },
    { name: 'Deities', href: '/deities' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' }
  ];

  const services = [
    { name: 'Health Services', href: '/health-services' },
    { name: 'Annadanam', href: '/annadanam' },
    { name: 'Prasadam', href: '/prasadam' },
    { name: 'Online Donation', href: '/donations' }
  ];

  return (
    <footer className="bg-[#1E1E24] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225l-2.29-3.298c.061.067.123.133.185.2 1.181-1.284 2.371-2.566 3.571-3.846l-.715.937c2.686-3.482 5.382-6.961 8.09-10.436L90 0l-2.144 2.638c-2.571 3.159-5.142 6.318-7.713 9.477l.667-.874c-1.246 1.631-2.482 3.267-3.708 4.907l.861-1.126c-2.947 3.853-5.893 7.705-8.84 11.558-.355.463-.71.927-1.065 1.39-.408-.535-.814-1.07-1.219-1.606-2.95-3.853-5.899-7.705-8.847-11.558l.861 1.126c-1.226-1.64-2.462-3.276-3.708-4.907l.667.874C52.298 8.956 49.727 5.797 47.156 2.638 45.849 0.99 44.544-.665 43.24-2.32L41 1l-2.25-3c-2.736 3.488-5.472 6.975-8.208 10.463 1.179 1.275 2.358 2.55 3.537 3.824l-.704-.922c2.646 3.457 5.303 6.902 7.959 10.347-1.325-1.905-2.649-3.81-3.974-5.715l.001.004c-.065.068-.13.137-.195.205L35 20h3c.159-.046.318-.092.478-.138 1.233-.38 2.469-.757 3.706-1.133" fill='%23E67A00' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Main Footer Content */}
      <div className="container-custom relative z-10">
        {/* Top Section with Logo and Description */}
        <div className="pt-16 pb-12 text-center border-b border-gray-800">
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo.png"
              alt="Shri Jagannath Temple Logo"
              width={80}
              height={80}
              className="mx-auto mb-6"
            />
          </Link>
          <h2 className="text-2xl font-prata text-[#E67A00] mb-4">श्री जगन्नाथ मंदिर</h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The Shree Jagannath Temple is an important Hindu temple dedicated to Jagannath, 
            located in Isnapur. Experience divine blessings and spiritual tranquility.
          </p>
        </div>

        {/* Links and Contact Section */}
        <div className="py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-prata text-[#E67A00] mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-[#E67A00] to-transparent" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-[#E67A00] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E67A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-prata text-[#E67A00] mb-6 relative inline-block">
              Services
              <span className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-[#E67A00] to-transparent" />
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link 
                    href={service.href}
                    className="text-gray-400 hover:text-[#E67A00] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E67A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-prata text-[#E67A00] mb-6 relative inline-block">
                  Contact Us
                  <span className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-[#E67A00] to-transparent" />
                </h3>
                <div className="space-y-4">
                  <Link 
                    href="tel:+914022224422" 
                    className="flex items-center gap-4 text-gray-400 hover:text-[#E67A00] transition-colors duration-300 group"
                  >
                    <span className="w-10 h-10 rounded-full bg-[#E67A00]/10 flex items-center justify-center group-hover:bg-[#E67A00]/20 transition-colors duration-300">
                      <Phone className="w-4 h-4 text-[#E67A00]" />
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">Call Us</p>
                      <p className="text-sm">+91 (040) 2222 4422</p>
                    </div>
                  </Link>
                  <Link 
                    href="mailto:info@isanpurjagannath.in" 
                    className="flex items-center gap-4 text-gray-400 hover:text-[#E67A00] transition-colors duration-300 group"
                  >
                    <span className="w-10 h-10 rounded-full bg-[#E67A00]/10 flex items-center justify-center group-hover:bg-[#E67A00]/20 transition-colors duration-300">
                      <Mail className="w-4 h-4 text-[#E67A00]" />
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">Email Us</p>
                      <p className="text-sm">info@isanpurjagannath.in</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-prata text-[#E67A00] mb-6 relative inline-block">
                  Connect With Us
                  <span className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-[#E67A00] to-transparent" />
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Facebook, label: 'Facebook', href: '#' },
                    { icon: Instagram, label: 'Instagram', href: '#' },
                    { icon: Twitter, label: 'Twitter', href: '#' },
                    { icon: Youtube, label: 'Youtube', href: '#' }
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="flex items-center gap-3 text-gray-400 hover:text-[#E67A00] transition-colors duration-300 group"
                    >
                      <span className="w-8 h-8 rounded-full bg-[#E67A00]/10 flex items-center justify-center group-hover:bg-[#E67A00]/20 transition-colors duration-300">
                        <social.icon size={16} />
                      </span>
                      <span className="text-sm">{social.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
            <p className="text-sm">
              © {new Date().getFullYear()} Shri Jagannath Temple. All rights reserved.
            </p>
            <p className="text-sm flex items-center gap-1">
              Designed & Developed with{' '}
              <span className="text-[#E67A00] text-base leading-none">♥</span> by{' '}
              <Link 
                href="https://createagile.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#E67A00] hover:text-[#D4A017] transition-colors duration-300"
              >
                CreateAgile
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}