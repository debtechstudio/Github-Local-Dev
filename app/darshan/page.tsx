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
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DarshanPage() {
  const rituals = [
    {
      name: "DWARAPHITA",
      subtitle: "Opening of the Temple Doors",
      time: "4:30 AM",
      icon: DoorOpen,
      description: "Performed by a team of sevakas who inspect the seals placed the previous night, break them, and open the temple doors, including the inner sanctum."
    },
    {
      name: "MANGALA ALATI",
      subtitle: "Auspicious Lamp Offering",
      time: "5:30 AM",
      icon: Flame,
      description: "Sevakas perform three types of Alatis—Karpura (camphor), Bati (ghee lamp), and Pithau (wicks dipped in sandalwood)—in front of the Lord."
    },
    {
      name: "MAILAM",
      subtitle: "Removal of Previous Night's Dress & Flowers",
      time: "6:00 AM",
      icon: Shirt,
      description: "Deities are prepared for the day by removing the floral decorations and night clothing. Cotton garments (Tadap and Uttariya) are offered."
    },
    {
      name: "ABAKASHA",
      subtitle: "Morning Ablutions",
      time: "6:30 AM",
      icon: Droplets,
      description: "Involves cleaning of the deities' teeth and bathing, done symbolically using brass mirrors. Water mixed with camphor, curd, amla, sandalwood, and flowers is used."
    },
    {
      name: "MAILAM & BESHALAGI",
      subtitle: "Change of Dress and Flower Decoration",
      time: "7:00 AM",
      icon: FlowerIcon,
      description: "After bathing, new clothes and fresh garlands are adorned by the sevakas."
    },
    {
      name: "ROSHA HOMA",
      subtitle: "Kitchen Fire Ritual",
      time: "7:30 AM",
      icon: Flame,
      description: "Before cooking begins, a fire sacrifice is performed in the temple kitchen by a Puja Panda sevaka."
    },
    {
      name: "SURYA PUJA",
      subtitle: "Sun Worship",
      time: "7:45 AM",
      icon: Sunrise,
      description: "Worship of Surya Deva (Sun God) is done near the temple's designated Surya Sthala."
    },
    {
      name: "DWARAPALA PUJA",
      subtitle: "Guardian Deities Worship",
      time: "8:00 AM",
      icon: Shield,
      description: "Worship of the temple's guardian deities Jaya and Vijaya is performed at the main entrance."
    },
    {
      name: "GOPAL BALLAV BHOGA",
      subtitle: "Breakfast Offering",
      time: "8:30 AM",
      icon: Coffee,
      description: "The first food offering of the day includes sweets, fruits, curd, and tender coconut. Offered with Pancha Upacharas."
    },
    {
      name: "SAKALA DHUPA",
      subtitle: "Royal Morning Food Offering",
      time: "9:00 AM - 10:00 AM",
      icon: Utensils,
      description: "Main meal of the morning: varieties of rice, dal, curries, and traditional Odisha dishes are offered using 16 Upacharas."
    },
    {
      name: "BHOGA MANDAP",
      subtitle: "Community Food Offering",
      time: "11:30 AM",
      icon: Soup,
      description: "A special offering is made for the community and pilgrims. Annabhoga (cooked rice and side dishes) is offered in large quantities."
    },
    {
      name: "MADHYAHNA DHUPA",
      subtitle: "Midday Food Offering",
      time: "12:30 PM",
      icon: Sandwich,
      description: "Similar to the Sakala Dhupa, with more emphasis on sweets and cooked dishes."
    },
    {
      name: "SANDHYA ALATI",
      subtitle: "Evening Lamp Offering",
      time: "6:00 PM",
      icon: Sun,
      description: "Evening lamp offerings are made after the deities are freshly dressed."
    },
    {
      name: "SANDHYA DHUPA",
      subtitle: "Evening Bhoga Offering",
      time: "6:30 PM - 8:00 PM",
      icon: Utensils,
      description: "Watered rice and evening snacks like Puli, Amalu are offered."
    },
    {
      name: "MAILAM & CHANDANALAGI",
      subtitle: "Change of Dress and Sandalwood Anointing",
      time: "8:30 PM",
      icon: Bath,
      description: "Post-dhupa change of dress followed by application of sandalwood, camphor, and saffron paste."
    },
    {
      name: "BADASINGHARA BESHA",
      subtitle: "Night Decoration",
      time: "9:00 PM - 10:00 PM",
      icon: FlowerIcon,
      description: "Deities are dressed in silken robes (Baralagi Patta) embedded with verses from Geeta Govinda and adorned with tulsi, flowers, and holy basil."
    },
    {
      name: "BADASINGHARA DHUPA",
      subtitle: "Final Food Offering",
      time: "10:30 PM - 11:00 PM",
      icon: Moon,
      description: "Pakhala (watered rice), Khiri, Kadalibada, and other dishes are offered with Pancha Upacharas."
    },
    {
      name: "KHATASEJA LAGI & PAHUDA",
      subtitle: "Retiring for the Night",
      time: "11:30 PM",
      icon: Bed,
      description: "The Lord is laid to rest. Green coconut, betel leaves, and camphor are offered. The sanctum doors are sealed until the next morning."
    }
  ];

  return (
    <main className="min-h-screen">
      <div className="pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-6">
                Lord Jagannath Daily Rituals
              </h1>
              <p className="text-xl text-[#1E1E24] font-prata">
                Followed at Isnapur Temple, Hyderabad
              </p>
            </div>

            {/* Introduction */}
            <div className="prose max-w-none mb-12">
              <p className="text-lg text-[#6D6D6D] leading-relaxed mb-8">
                At Isnapur's Lord Jagannath Temple, the daily and periodical rituals are performed with utmost devotion and discipline, reflecting the eternal dignity and grandeur that the Supreme Being rightfully deserves.
              </p>

              <p className="text-lg text-[#6D6D6D] leading-relaxed mb-8">
                The ritual system is rich and complex, involving a number of dedicated sevakas (servitors). The rituals of Lord Jagannath here are broadly categorized into:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-[#FFF9F0] rounded-xl p-6 text-center">
                  <p className="text-[#E67A00] font-semibold">Daily rituals (Nitis)</p>
                </div>
                <div className="bg-[#FFF9F0] rounded-xl p-6 text-center">
                  <p className="text-[#E67A00] font-semibold">Occasional (periodical) rituals</p>
                </div>
                <div className="bg-[#FFF9F0] rounded-xl p-6 text-center">
                  <p className="text-[#E67A00] font-semibold">Festive rituals</p>
                </div>
              </div>

              <p className="text-lg text-[#6D6D6D] leading-relaxed mb-12">
                The daily rituals (nitis) follow a precise and sacred schedule from early morning to midnight. Each sevaka has a defined role and time, in alignment with the traditions of Jagannath worship. Below is a brief overview of these daily rituals as practiced at Isnapur Jagannath Temple, Hyderabad:
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-8">
              {rituals.map((ritual, index) => {
                const Icon = ritual.icon;
                return (
                  <div key={index} className="flex gap-6 items-start bg-white rounded-xl shadow-md p-6 relative">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FFF9F0] rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#E67A00]" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-prata text-[#E67A00]">{ritual.name}</h3>
                          <p className="text-[#1E1E24] font-medium">{ritual.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2 md:mt-0">
                          <Clock className="w-4 h-4 text-[#6D6D6D]" />
                          <span className="text-[#6D6D6D]">{ritual.time}</span>
                        </div>
                      </div>
                      <p className="text-[#6D6D6D]">{ritual.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note */}
            <div className="mt-12 bg-[#FFF9F0] rounded-xl p-6">
              <h3 className="text-xl font-prata text-[#1E1E24] mb-4">Sevakas and Timing</h3>
              <p className="text-[#6D6D6D]">
                Timings may occasionally vary depending on special festivals or temple logistics.
              </p>
            </div>

            {/* Link to Samayika Niti */}
            <div className="mt-12 bg-[#FFF9F0] rounded-xl p-8 text-center">
              <h3 className="text-xl font-prata text-[#1E1E24] mb-4">Periodical Rituals</h3>
              <p className="text-[#6D6D6D] mb-6">
                In addition to daily rituals, there are special periodical rituals (Samayika Niti) 
                performed on specific days and occasions. Learn more about these sacred traditions.
              </p>
              <Button asChild>
                <Link href="/darshan/samayika-niti">
                  View Periodical Rituals
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
