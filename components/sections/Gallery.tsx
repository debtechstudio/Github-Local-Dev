'use client';

import { useState } from 'react';
import { Expand } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filters = ['All', 'Temple', 'Deities', 'Festivals', 'Rituals'];

  const galleryItems = [
    {
      id: 1,
      category: 'Temple',
      image: '/images/temple.jpg',
      alt: 'Temple Architecture'
    },
    {
      id: 2,
      category: 'Deities',
      image: '/images/deities/jagannath.jpg',
      alt: 'Lord Jagannath'
    },
    {
      id: 3,
      category: 'Festivals',
      image: '/images/events/chandan-yatra.jpg',
      alt: 'Rath Yatra Festival'
    },
    {
      id: 4,
      category: 'Rituals',
      image: '/images/gallery/DSC02878.jpeg',
      alt: 'Daily Rituals'
    },
    {
      id: 5,
      category: 'Temple',
      image: '/images/jagannath-puri-temple.jpg',
      alt: 'Temple Complex'
    },
    {
      id: 6,
      category: 'Festivals',
      image: '/images/events/snana-purnima.jpeg',
      alt: 'Festival Celebration'
    },
    {
      id: 7,
      category: 'Deities',
      image: '/images/deities/maa-subhadra.jpg',
      alt: 'Maa Subhadra'
    },
    {
      id: 8,
      category: 'Rituals',
      image: '/images/gallery/DSC02810.jpeg',
      alt: 'Evening Aarati'
    },
    {
      id: 9,
      category: 'Temple',
      image: '/images/gallery/DSC02824.jpeg',
      alt: 'Temple Interior'
    }
  ];

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-4 relative inline-block">
            Temple Gallery
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#D4A017]" />
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-[#E67A00] text-white shadow-lg'
                  : 'bg-[#FFF9F0] text-[#1E1E24] hover:bg-[#E67A00] hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <div className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                  <div className="relative h-64">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Expand className="text-white w-8 h-8" />
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-6xl">
                <div className="relative h-[80vh] w-full">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    quality={100}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}