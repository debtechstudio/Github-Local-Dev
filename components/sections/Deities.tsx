'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Deities() {
  const deities = [
    {
      name: 'Lord Balabhadra',
      title: 'The Elder Brother',
      description: 'The elder brother of Lord Jagannath, representing strength and agriculture',
      image: '/images/deities/balabhadra.jpg'
    },
    {
      name: 'Maa Subhadra',
      title: 'The Divine Sister',
      description: 'The divine sister, representing the motherly aspect of the universe',
      image: '/images/deities/maa-subhadra.jpg'
    },
    {
      name: 'Lord Jagannath',
      title: 'The Lord of the Universe',
      description: 'The supreme deity and lord of the universe, an incarnation of Lord Vishnu',
      image: '/images/deities/jagannath.jpg'
    }
  ];

  return (
    <section className="section-padding bg-[#FFF9F0] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#1A5F1E] opacity-10 rounded-full" />
      
      <div className="container-custom relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-4 relative inline-block">
            The Holy Trinity
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#D4A017]" />
          </h2>
        </div>

        {/* Deities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deities.map((deity, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={deity.image}
                  alt={deity.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-prata mb-2">{deity.name}</h3>
                    <p className="text-sm opacity-90">{deity.title}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-prata text-[#E67A00] mb-3">
                  {deity.name}
                </h3>
                <p className="text-[#6D6D6D] mb-4 text-sm leading-relaxed">
                  {deity.description}
                </p>
                <Button asChild variant="outline" className="btn-outline">
                  <Link href={`/deities/${deity.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    Know More
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}