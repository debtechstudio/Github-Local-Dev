'use client';

import { Calendar, Clock, Moon, Sun, Droplet, Brush, Star, AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';

interface RitualContent {
  icon: typeof Calendar;
  title: string;
  content: ReactNode;
}

export default function SamayikaNitiPage() {
  const rituals: RitualContent[] = [
    {
      icon: Droplet,
      title: "Majana (Purification Ritual)",
      content: (
        <>
          <p className="mb-4">The Majana and Ekanta rites are typically performed every Thursday after the morning Dhupa (food offering). On this day:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Deities Shree Devi, Bhu Devi, and Madana Mohana are respectfully brought to the Majana Mandap.</li>
            <li>Rituals like Majana, Chandanalagi (sandalwood application), Bhoga (food offering), Alati (lamp offering), and Bandapana (ceremonial adoration) are performed.</li>
            <li>Specific temple sevakas carry out these duties under the direction of temple priests and administrative coordinators.</li>
          </ul>
        </>
      )
    },
    {
      icon: Moon,
      title: "Ekanta (Nighttime Seclusion Ritual)",
      content: (
        <>
          <p className="mb-4">Performed every Thursday night:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>After Sandhya Dhupa (evening food offering), Madana Mohana is ceremonially taken from the sanctum to Ratnasinghashana (main altar).</li>
            <li>A sacred Ajnamala (garland of divine permission) is offered by Shree Jagannath, and another to Shree Devi (Lakshmi).</li>
            <li>The deities are then escorted to the Jagamohana (assembly hall) of the Lakshmi Temple, where they rest on a special cot.</li>
            <li>Rituals like Prasadlagi, Alati, Kora Bhoga, and Bandapana are carried out with solemn devotion.</li>
          </ul>
          <p className="text-sm italic">These rituals are not observed when Ekanta coincides with Ekadashi.</p>
        </>
      )
    },
    {
      icon: Star,
      title: "Nakshatra Bandapana (Stellar Day Worship)",
      content: (
        <>
          <p className="mb-4">This ritual is performed after Madhyahna Dhupa (midday meal offering) on the birth star day of each deity:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Lord Balabhadra: Sravana (Star) / Makara (Zodiac)</li>
            <li>Lord Jagannath: Rohini / Vrishabha</li>
            <li>Devi Subhadra: Jyeshtha / Vrischika</li>
          </ul>
          <p className="mb-2">On such days:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Madana Mohana is brought in after the midday Dhupa.</li>
            <li>Special Alati, Bhoga, and Bandapana are performed for each deity by respective designated sevakas.</li>
            <li>Afterward, Madana Mohana returns to the sanctum.</li>
          </ul>
        </>
      )
    },
    {
      icon: Calendar,
      title: "Ekadashi Rituals",
      content: (
        <>
          <p className="mb-4">On every Ekadashi (11th lunar day):</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Deities are anointed with Sarbanga Chandan (full-body sandalwood paste).</li>
            <li>Madana Mohana receives Ajnamala, and is paraded around the temple in a palanquin.</li>
            <li>Rituals include Alati, Bandapana, and Bhoga near the Jaya Vijaya Dwara.</li>
          </ul>
          <p className="mb-2">At night, the sacred Mahadeepa Alati is performed:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A large lamp inside an earthen pot (Kalasha) is taken in procession to the Neelachakra (temple crown) and offered with Tulasi and Chandan.</li>
            <li>Sevakas perform a circumambulation praying for the well-being of the faithful and the prosperity of the realm.</li>
          </ul>
        </>
      )
    },
    {
      icon: Moon,
      title: "Amavasya Rite (Sagar Bije Ritual)",
      content: (
        <>
          <p className="mb-4">If Amavasya (new moon) extends to the next day (Pratipada):</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The image of Shree Narayana is brought from the sanctum to Ratnasinghashana and receives an Ajnamala from Lord Jagannath.</li>
            <li>He is then carried ceremonially (symbolically to the sea; at Isnapur, a sacred water body or symbolic ritual is conducted).</li>
            <li>Water fetched by temple sevakas is sanctified and offered to the deity.</li>
            <li>Rituals such as Pana Bhoga, Alati, and Bandapana follow.</li>
            <li>The deity is then taken to a designated shrine (Yameshwar Mahadev equivalent) before returning.</li>
          </ul>
        </>
      )
    },
    {
      icon: Sun,
      title: "Eclipse Rites (Grahanakala Niti)",
      content: (
        <>
          <p className="mb-4">During solar and lunar eclipses:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All regular activities are suspended (Paka Tyaga – cooking is stopped).</li>
            <li>After the eclipse, a Maha Snana (ritual bath) is performed.</li>
            <li>The deities are offered Sheetala Bhoga (cool foods like Khai, Kora) and purified.</li>
          </ul>
        </>
      )
    },
    {
      icon: AlertTriangle,
      title: "Rites During Defilement or Temple Pollution",
      content: (
        <>
          <p className="mb-4">If any incident of defilement (e.g., entry of impure elements like animals, bodily fluids, etc.) occurs:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All rituals are temporarily suspended.</li>
            <li>Maha Snana and purification rites are performed.</li>
            <li>The sanctum and affected areas are cleaned, sprinkled with lime water, and sanctified.</li>
          </ul>
        </>
      )
    },
    {
      icon: Brush,
      title: "Banakalagi or Shreemukha Sringara (Facial Painting Ritual)",
      content: (
        <>
          <p className="mb-4">Performed every Wednesday or Thursday:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Banaka paste (made from sacred materials) is prepared and applied to the deities' faces.</li>
            <li>Dattamahapatra sevakas perform the painting on the altar under lamplight.</li>
            <li>After the ritual, they descend from the throne and regular worship resumes.</li>
          </ul>
        </>
      )
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
                Samayika Niti (Periodical Rituals)
              </h1>
              <p className="text-lg text-[#6D6D6D] max-w-3xl mx-auto">
                In addition to the daily rituals (Nitis), a number of special rites are observed at Jagannath Temple, Isnapur, 
                on particular days and occasions. These rituals uphold the sacred traditions followed in Jagannath temples and 
                are adapted with reverence for the spiritual atmosphere of Isnapur.
              </p>
            </div>

            {/* Rituals List */}
            <div className="space-y-8">
              {rituals.map((ritual, index) => {
                const IconComponent = ritual.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#FFF9F0] rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-[#E67A00]" />
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-xl font-prata text-[#E67A00] mb-4">{ritual.title}</h2>
                        <div className="text-[#6D6D6D]">{ritual.content}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 