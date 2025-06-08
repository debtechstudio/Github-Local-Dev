'use client';

import { Sun, Droplets, Coffee, Utensils, Moon, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DailyDarshan() {
  const darshanSchedule = [
    {
      icon: Sun,
      title: 'Mangal Aarati',
      description: 'Morning worship ceremony',
      time: '5:00 AM'
    },
    {
      icon: Droplets,
      title: 'Mailam & Abakash Puja',
      description: 'Bathing and morning rituals',
      time: '6:00 AM - 6:30 AM'
    },
    {
      icon: Coffee,
      title: 'Gopal Ballabh Bhog',
      description: 'Morning food offering',
      time: '8:30 AM'
    },
    {
      icon: Utensils,
      title: 'Madhyahna Dhupa',
      description: 'Midday food offering',
      time: '12:30 PM'
    },
    {
      icon: Moon,
      title: 'Sandhya Aarati',
      description: 'Evening worship ceremony',
      time: '7:00 PM'
    },
    {
      icon: Bed,
      title: 'Bada Shringar & Pahuda',
      description: 'Night adornment and rest',
      time: '9:30 PM'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-4 relative inline-block">
            Daily Darshan Schedule
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#D4A017]" />
          </h2>
        </div>

        {/* Darshan Container */}
        <div className="max-w-4xl mx-auto bg-[#FFF9F0] rounded-2xl p-8 md:p-10 shadow-lg">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h3 className="text-xl md:text-2xl font-prata text-[#E67A00]">
              Today's Rituals
            </h3>
            <Button asChild variant="outline" className="btn-outline">
              <Link href="/darshan">View Complete Schedule</Link>
            </Button>
          </div>

          {/* Schedule List */}
          <div className="space-y-4">
            {darshanSchedule.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 flex items-center justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFF9F0] text-[#E67A00] rounded-full flex items-center justify-center group-hover:bg-[#E67A00] group-hover:text-white transition-colors duration-300">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1E1E24] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#6D6D6D]">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                <div className="bg-[#FFF9F0] text-[#E67A00] px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap">
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}