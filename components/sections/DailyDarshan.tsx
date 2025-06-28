'use client';

import { Sun, Droplets, Coffee, Utensils, Moon, Bed, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DailyDarshan() {
  const darshanSchedule = [
    {
      icon: Sun,
      name: "MANGALA ALATI",
      subtitle: "Morning worship ceremony",
      time: "5:00 AM"
    },
    {
      icon: Droplets,
      name: "MAILAM & ABAKASH",
      subtitle: "Bathing and morning rituals",
      time: "6:00 AM - 6:30 AM"
    },
    {
      icon: Coffee,
      name: "GOPAL BALLABH BHOG",
      subtitle: "Morning food offering",
      time: "8:30 AM"
    },
    {
      icon: Utensils,
      name: "MADHYAHNA DHUPA",
      subtitle: "Midday food offering",
      time: "12:30 PM"
    },
    {
      icon: Moon,
      name: "SANDHYA ALATI",
      subtitle: "Evening worship ceremony",
      time: "7:00 PM"
    },
    {
      icon: Bed,
      name: "BADA SHRINGAR & PAHUDA",
      subtitle: "Night adornment and rest",
      time: "9:30 PM"
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
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-[#E67A00]" />
              <h3 className="text-xl md:text-2xl font-prata text-[#1E1E24]">
                Today's Rituals
              </h3>
            </div>
            <Button asChild variant="outline" className="btn-outline">
              <Link href="/darshan">View Complete Schedule</Link>
            </Button>
          </div>

          {/* Schedule List */}
          <div className="grid md:grid-cols-2 gap-4">
            {darshanSchedule.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-[#FFF9F0] rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#E67A00]" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-prata text-[#E67A00]">{item.name}</h4>
                        <p className="text-sm text-[#6D6D6D]">{item.subtitle}</p>
                      </div>
                      <span className="text-sm font-medium text-[#1E1E24]">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}