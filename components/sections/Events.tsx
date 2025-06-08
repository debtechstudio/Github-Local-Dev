'use client';

import { Calendar, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Events() {
  const events = [
    {
      title: 'Rath Yatra 2025',
      description: 'The grand chariot festival where the deities travel to Gundicha Temple',
      date: { day: '7', month: 'Jul' },
      location: 'Temple Street, Isnapur',
      time: '8:00 AM',
      image: '/images/events/rath-yatra.jpg'
    },
    {
      title: 'Snana Purnima',
      description: 'Annual bathing ceremony of the deities with 108 pots of sacred water',
      date: { day: '12', month: 'Jun' },
      location: 'Temple Complex',
      time: '6:00 AM',
      image: '/images/events/snana-purnima.jpeg'
    },
    {
      title: 'Bahuda Yatra',
      description: 'Return journey of the deities to the main temple after Rath Yatra',
      date: { day: '15', month: 'Jul' },
      location: 'Temple Street, Isnapur',
      time: '9:00 AM',
      image: '/images/events/chandan-yatra.jpg'
    }
  ];

  return (
    <section id="events" className="section-padding bg-[#FFF9F0]">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-4 relative inline-block">
            Upcoming Events
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#D4A017]" />
          </h2>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
            >
              {/* Image with Date Badge */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-[#E67A00] text-white w-14 h-14 rounded-xl flex flex-col items-center justify-center z-10">
                  <span className="text-lg font-bold leading-none">{event.date.day}</span>
                  <span className="text-xs uppercase">{event.date.month}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-prata text-[#1E1E24] mb-3">
                  {event.title}
                </h3>
                <p className="text-[#6D6D6D] mb-4 text-sm leading-relaxed">
                  {event.description}
                </p>
                
                {/* Event Meta */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#6D6D6D]">
                    <MapPin size={16} className="text-[#E67A00]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6D6D6D]">
                    <Clock size={16} className="text-[#E67A00]" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <Button asChild variant="outline" className="btn-outline w-full">
                  <Link href={`/events/${event.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    More Details
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events Button */}
        <div className="text-center">
          <Button asChild className="btn-primary px-8 py-3">
            <Link href="/events">
              <Calendar className="mr-2" size={20} />
              View All Events
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}