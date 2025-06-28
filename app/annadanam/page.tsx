'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Utensils, Users, Clock, CalendarDays, Heart, Phone } from 'lucide-react';
import Link from 'next/link';

export default function AnnadanamPage() {
  const features = [
    {
      icon: Utensils,
      title: "Daily Prasadam",
      description: "Free meals served to all devotees visiting the temple"
    },
    {
      icon: Users,
      title: "Community Service",
      description: "Serving hundreds of people daily with pure vegetarian food"
    },
    {
      icon: Clock,
      title: "Timings",
      description: "Lunch: 11:30 AM - 2:00 PM | Dinner: 7:00 PM - 8:30 PM"
    },
    {
      icon: CalendarDays,
      title: "Special Days",
      description: "Enhanced services during festivals and special occasions"
    }
  ];

  const sponsorshipOptions = [
    {
      title: "Daily Annadanam",
      amount: "₹5,100",
      description: "Sponsor meals for one day",
      benefits: [
        "Feeds approximately 100 people",
        "Special prayers performed",
        "Certificate of appreciation",
        "Tax exemption receipt"
      ]
    },
    {
      title: "Weekly Annadanam",
      amount: "₹31,000",
      description: "Sponsor meals for a week",
      benefits: [
        "Feeds approximately 700 people",
        "Special archana performed",
        "Name display in temple",
        "Tax exemption receipt"
      ]
    },
    {
      title: "Monthly Annadanam",
      amount: "₹1,11,000",
      description: "Sponsor meals for a month",
      benefits: [
        "Feeds approximately 3000 people",
        "Special puja performed",
        "Permanent name display",
        "Tax exemption receipt"
      ]
    }
  ];

  return (
    <main className="min-h-screen">
      <div className="pt-20 pb-16">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-6">
              Annadanam Seva
            </h1>
            <p className="text-xl text-[#1E1E24] font-prata mb-4">
              Serving Food is Serving the Divine
            </p>
            <p className="text-lg text-[#6D6D6D] max-w-3xl mx-auto">
              At Sri Jagannath Temple, Isnapur, we believe that serving food to the hungry is one of the noblest forms of service to the Divine. Our Annadanam program ensures that no devotee leaves the temple hungry.
            </p>
          </div>

          {/* Main Image */}
          <div className="relative w-full h-[400px] mb-12 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/annadanam.jpg"
              alt="Annadanam Service at Sri Jagannath Temple"
              fill
              className="object-cover"
            />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="w-12 h-12 bg-[#FFF9F0] rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#E67A00]" />
                  </div>
                  <h3 className="text-lg font-prata text-[#1E1E24] mb-2">{feature.title}</h3>
                  <p className="text-[#6D6D6D]">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* About Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-prata text-[#1E1E24] mb-6 text-center">
              About Our Annadanam Service
            </h2>
            <div className="bg-[#FFF9F0] rounded-xl p-8">
              <p className="text-[#6D6D6D] mb-6">
                The tradition of Annadanam at Sri Jagannath Temple, Isnapur follows the ancient practice of the Jagannath Temple, Puri. Every day, hundreds of devotees are served fresh, sanctified vegetarian meals prepared in our temple kitchen with the utmost devotion and cleanliness.
              </p>
              <p className="text-[#6D6D6D]">
                The food is first offered to Lord Jagannath and then served to all devotees, regardless of their social or economic status. This practice embodies the principle of equality before the Divine and helps sustain the spiritual atmosphere of the temple.
              </p>
            </div>
          </div>

          {/* Sponsorship Options */}
          <div className="mb-16">
            <h2 className="text-2xl font-prata text-[#1E1E24] mb-6 text-center">
              Sponsorship Opportunities
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {sponsorshipOptions.map((option, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-2">{option.title}</h3>
                  <p className="text-2xl font-bold text-[#1E1E24] mb-4">{option.amount}</p>
                  <p className="text-[#6D6D6D] mb-4">{option.description}</p>
                  <ul className="space-y-2 mb-6">
                    {option.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[#6D6D6D]">
                        <Heart className="w-4 h-4 text-[#E67A00]" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link href="/donate">Sponsor Now</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#FFF9F0] rounded-xl p-8">
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6 text-center">
                Contact for Annadanam Seva
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#E67A00]" />
                  <span className="text-[#6D6D6D]">+91 (040) 2222 4422</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#E67A00]" />
                  <span className="text-[#6D6D6D]">Office Hours: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
              <p className="text-center text-[#6D6D6D] mt-6">
                For group sponsorships or special arrangements, please contact the temple office.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
