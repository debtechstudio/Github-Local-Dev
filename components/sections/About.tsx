'use client';

import { Calendar, Users, Heart, Utensils } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const features = [
    {
      icon: Calendar,
      title: '12th Century',
      description: 'Temple established'
    },
    {
      icon: Users,
      title: 'Millions',
      description: 'Devotees annually'
    },
    {
      icon: Heart,
      title: 'Char Dham',
      description: 'One of four sacred sites'
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
              The Shree Jagannath Temple is an important Hindu temple dedicated to Jagannath, a form of Vishnu, 
              in Isnapur in the state of Odisha on the eastern coast of India. The present temple was rebuilt 
              from the 10th century onwards, on the site of an earlier temple.
            </p>
            
            <p className="text-[#6D6D6D] mb-8 leading-relaxed">
              The temple is famous for its annual Rath Yatra, or chariot festival, in which the three principal 
              deities are pulled on huge and elaborately decorated temple cars. Unlike the stone and metal icons 
              found in most Hindu temples, the image of Jagannath is made of wood and is ceremoniously replaced 
              every twelve or nineteen years by an exact replica.
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