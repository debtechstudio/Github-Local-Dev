'use client';

import { 
  Sun, 
  Moon, 
  Coffee, 
  Utensils, 
  Clock, 
  DoorOpen, 
  Flame, 
  Shirt, 
  Droplets, 
  FlowerIcon,
  Soup,
  Sunrise,
  Shield,
  Sandwich,
  Bath,
  Bed
} from 'lucide-react';

export default function TimingsPage() {
  const rituals = [
    {
      name: "DWARAPHITA",
      subtitle: "Opening of the Temple Doors",
      time: "4:30 AM",
      icon: DoorOpen,
      description: "Opening of temple doors and inner sanctum"
    },
    {
      name: "MANGALA ALATI",
      subtitle: "Auspicious Lamp Offering",
      time: "5:30 AM",
      icon: Flame,
      description: "Morning lamp offering ceremony"
    },
    {
      name: "MAILAM",
      subtitle: "Morning Preparation",
      time: "6:00 AM",
      icon: Shirt,
      description: "Removal of night dress and preparations"
    },
    {
      name: "ABAKASHA",
      subtitle: "Morning Ablutions",
      time: "6:30 AM",
      icon: Droplets,
      description: "Morning cleansing rituals"
    },
    {
      name: "MAILAM & BESHALAGI",
      subtitle: "Morning Dress",
      time: "7:00 AM",
      icon: FlowerIcon,
      description: "Fresh dress and flower decoration"
    },
    {
      name: "ROSHA HOMA",
      subtitle: "Kitchen Ritual",
      time: "7:30 AM",
      icon: Flame,
      description: "Sacred kitchen fire ritual"
    },
    {
      name: "SURYA PUJA",
      subtitle: "Sun Worship",
      time: "7:45 AM",
      icon: Sunrise,
      description: "Worship of Sun God"
    },
    {
      name: "DWARAPALA PUJA",
      subtitle: "Guardian Worship",
      time: "8:00 AM",
      icon: Shield,
      description: "Worship of temple guardians"
    },
    {
      name: "GOPAL BALLAV BHOGA",
      subtitle: "Breakfast Offering",
      time: "8:30 AM",
      icon: Coffee,
      description: "Morning food offering"
    },
    {
      name: "SAKALA DHUPA",
      subtitle: "Morning Feast",
      time: "9:00 AM - 10:00 AM",
      icon: Utensils,
      description: "Main morning meal offering"
    },
    {
      name: "BHOGA MANDAP",
      subtitle: "Community Offering",
      time: "11:30 AM",
      icon: Soup,
      description: "Special community food offering"
    },
    {
      name: "MADHYAHNA DHUPA",
      subtitle: "Midday Offering",
      time: "12:30 PM",
      icon: Sandwich,
      description: "Midday food offering"
    },
    {
      name: "SANDHYA ALATI",
      subtitle: "Evening Arati",
      time: "6:00 PM",
      icon: Sun,
      description: "Evening lamp offering"
    },
    {
      name: "SANDHYA DHUPA",
      subtitle: "Evening Offering",
      time: "6:30 PM - 8:00 PM",
      icon: Utensils,
      description: "Evening food offering"
    },
    {
      name: "MAILAM & CHANDANALAGI",
      subtitle: "Evening Dress",
      time: "8:30 PM",
      icon: Bath,
      description: "Evening dress and sandalwood offering"
    },
    {
      name: "BADASINGHARA BESHA",
      subtitle: "Night Decoration",
      time: "9:00 PM - 10:00 PM",
      icon: FlowerIcon,
      description: "Special night dress and decoration"
    },
    {
      name: "BADASINGHARA DHUPA",
      subtitle: "Night Offering",
      time: "10:30 PM - 11:00 PM",
      icon: Moon,
      description: "Final food offering of the day"
    },
    {
      name: "KHATASEJA LAGI & PAHUDA",
      subtitle: "Night Rest",
      time: "11:30 PM",
      icon: Bed,
      description: "Final ritual and temple closing"
    }
  ];

  return (
    <main className="min-h-screen">
      <div className="pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-6">
                Temple Timings
              </h1>
              <p className="text-xl text-[#1E1E24] font-prata">
                Daily Schedule of Rituals at Sri Jagannath Temple, Isnapur
              </p>
            </div>

            {/* Quick Reference Note */}
            <div className="bg-[#FFF9F0] rounded-xl p-6 mb-12">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-[#E67A00] flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-prata text-[#1E1E24] mb-2">Temple Opening Hours</h2>
                  <p className="text-[#6D6D6D]">
                    The temple is open from <span className="font-semibold">4:30 AM</span> to <span className="font-semibold">11:30 PM</span> daily. 
                    Devotees are advised to plan their visits according to the ritual timings below.
                  </p>
                </div>
              </div>
            </div>

            {/* Morning Rituals */}
            <div className="mb-12">
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6 flex items-center gap-3">
                <Sun className="w-6 h-6 text-[#E67A00]" />
                Morning Rituals
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {rituals.slice(0, 10).map((ritual, index) => {
                  const Icon = ritual.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#FFF9F0] rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#E67A00]" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-prata text-[#E67A00]">{ritual.name}</h3>
                            <p className="text-sm text-[#6D6D6D]">{ritual.subtitle}</p>
                          </div>
                          <span className="text-sm font-medium text-[#1E1E24]">{ritual.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Afternoon Rituals */}
            <div className="mb-12">
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6 flex items-center gap-3">
                <Sun className="w-6 h-6 text-[#E67A00]" />
                Afternoon Rituals
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {rituals.slice(10, 12).map((ritual, index) => {
                  const Icon = ritual.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#FFF9F0] rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#E67A00]" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-prata text-[#E67A00]">{ritual.name}</h3>
                            <p className="text-sm text-[#6D6D6D]">{ritual.subtitle}</p>
                          </div>
                          <span className="text-sm font-medium text-[#1E1E24]">{ritual.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Evening Rituals */}
            <div className="mb-12">
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6 flex items-center gap-3">
                <Moon className="w-6 h-6 text-[#E67A00]" />
                Evening Rituals
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {rituals.slice(12).map((ritual, index) => {
                  const Icon = ritual.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#FFF9F0] rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#E67A00]" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-prata text-[#E67A00]">{ritual.name}</h3>
                            <p className="text-sm text-[#6D6D6D]">{ritual.subtitle}</p>
                          </div>
                          <span className="text-sm font-medium text-[#1E1E24]">{ritual.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Note */}
            <div className="bg-[#FFF9F0] rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#E67A00] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-prata text-[#1E1E24] mb-2">Important Note</h3>
                  <p className="text-[#6D6D6D]">
                    Timings may vary during special festivals and occasions. It is recommended to confirm the timings 
                    before planning your visit during major festivals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
