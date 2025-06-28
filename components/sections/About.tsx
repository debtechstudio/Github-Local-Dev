'use client';

import { Calendar, Users, Heart, Utensils } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const features = [
    {
      icon: Calendar,
      title: 'Recently Built',
      description: 'Modern temple'
    },
    {
      icon: Users,
      title: 'Thousands',
      description: 'Devotees annually'
    },
    {
      icon: Heart,
      title: 'Sacred Site',
      description: 'Divine blessings'
    },
    {
      icon: Utensils,
      title: 'Mahaprasad',
      description: 'Sacred food offering'
    }
  ];

  return (
    <section className="section-padding bg-[#FFF9F0] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#E67A00] opacity-10 rounded-full" />
      
      <div className="container-custom relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-4 relative inline-block">
            About The Temple
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#D4A017]" />
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-fade-in-left">
            <h3 className="text-2xl md:text-3xl font-prata text-[#1A5F1E] mb-6">
              The Sacred Abode of Lord Jagannath
            </h3>
            
            <p className="text-[#6D6D6D] mb-6 leading-relaxed">
              The Sri Jagannath Temple in Isnapur is a recently established temple that brings the divine presence 
              of Lord Jagannath to the heart of Telangana. Built with devotion and architectural excellence, 
              it serves as a spiritual beacon for devotees in and around Hyderabad.
            </p>
            
            <p className="text-[#6D6D6D] mb-8 leading-relaxed">
              The temple follows all the sacred traditions and rituals of the ancient Jagannath Temple of Puri. 
              The temple is famous for its annual Rath Yatra and other festivals that are celebrated with great 
              devotion and grandeur. The wooden deities of Lord Jagannath, Lord Balabhadra, and Devi Subhadra 
              are crafted and consecrated according to ancient scriptures.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#E67A00] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1E1E24] mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-[#6D6D6D]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="animate-fade-in-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform perspective-1000 hover:scale-105 transition-transform duration-500">
              <Image
                src="/images/temple.jpg"
                alt="Jagannath Temple"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}