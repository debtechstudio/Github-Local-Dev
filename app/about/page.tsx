'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-6">
                Lord Jagannatha of Isnapur
              </h1>
              <p className="text-xl text-[#1E1E24] font-prata">
                The Supreme Divine Manifestation in the Heart of Telangana
              </p>
            </div>

            {/* Main Image */}
            <div className="relative w-full h-[400px] mb-12 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/temple.jpg"
                alt="Sri Jagannath Temple Isnapur"
                fill
                className="object-cover"
              />
            </div>

            {/* Introduction */}
            <div className="prose max-w-none">
              <p className="text-lg text-[#6D6D6D] leading-relaxed mb-8">
                Lord Jagannatha, as His very name signifies, is the Lord of the Universe (Jagat = Universe; Natha = Lord). He is lovingly revered by devotees as Mahaprabhu (Maha = Great; Prabhu = Lord). In the sacred scriptures of Sanatana Vaidika Dharma (popularly known as Hinduism), He is worshipped as Purushottama, the Supreme Divine Being (Purusha = Divine Being; Uttama = Supreme).
              </p>

              <p className="text-lg text-[#6D6D6D] leading-relaxed mb-12">
                Though His original manifestation in Daru (wooden) form took place in Shree Purushottama-kshetra (Puri, Odisha) in the Satya-yuga, His eternal presence transcends time and geography. Today, this same Supreme Lord Jagannatha is worshipped in Isnapur, Hyderabad, where a magnificent temple stands as a beacon of devotion, unity, and spiritual tradition.
              </p>

              {/* Divine Presence Section */}
              <div className="bg-[#FFF9F0] rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                  Divine Presence in Isnapur
                </h2>
                <p className="text-[#6D6D6D] mb-6">
                  The Shree Jagannatha Temple at Isnapur, near Patancheru in Hyderabad, though built in recent times, carries forward the ancient tradition, rituals, and spirit of Puri. The Daru forms of Lord Jagannatha, Lord Balabhadra, Devi Subhadra, and Sudarshana Chakra are enshrined here with divine sanctity, offering devotees an opportunity to experience the grace of the Lord without traveling far.
                </p>
                <p className="text-[#6D6D6D] mb-6">
                  This temple, modeled after the grand tradition of Puri, emphasizes the same philosophical foundation:
                </p>
                <ul className="list-none space-y-4">
                  <li className="italic text-[#E67A00]">Ekam Sat Viprah Bahudha Vadanti</li>
                  <li className="text-[#6D6D6D]">"Truth is One, the wise express it in many ways."</li>
                  <li className="italic text-[#E67A00]">Vasudhaiva Kutumbakam</li>
                  <li className="text-[#6D6D6D]">"The entire world is one family."</li>
                </ul>
              </div>

              {/* Inclusive Worship Section */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                Inclusive Worship Across Faiths
              </h2>
              <p className="text-[#6D6D6D] mb-6">
                At Isnapur, as in Puri, Lord Jagannatha is invoked through a diverse spectrum of traditions:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-[#6D6D6D]">For Krishna Bhaktas, He is Shree Krishna.</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-[#6D6D6D]">For Rama Bhaktas, He is Maryada Purushottama Rama.</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-[#6D6D6D]">Shaiva followers see Him as a form of Shiva-Bhairava.</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-[#6D6D6D]">Shakta, Tantra, Pancharatra, and Vedantic traditions worship Him through their unique lenses.</p>
                </div>
              </div>

              {/* Festivals Section */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                Festivals and Rituals in Isnapur
              </h2>
              <p className="text-[#6D6D6D] mb-6">
                The Jagannatha Ratha-yatra (chariot festival) held annually in Isnapur has become one of the most vibrant spiritual events in Telangana, attracting thousands of devotees. Like in Puri, the Lord leaves His sanctum and rides the magnificent Rathas (chariots) to give darshan to all—transcending barriers of caste, creed, gender, or nationality.
              </p>
              <p className="text-[#6D6D6D] mb-12">
                The Snana-yatra, Nabakalebara, Chandan Yatra, and other rituals are performed in sync with the Jagannatha Panjika (calendar) followed in Puri, maintaining continuity with the ancient spiritual tradition.
              </p>

              {/* Spiritual Symbolism Section */}
              <div className="bg-[#FFF9F0] rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                  Spiritual Symbolism
                </h2>
                <p className="text-[#6D6D6D] mb-4">The Chaturdha Murti (four divine forms) in Isnapur symbolize:</p>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-[#E67A00] mb-2">The four Vedas:</h3>
                    <ul className="list-disc list-inside text-[#6D6D6D] space-y-1">
                      <li>Balabhadra (Rig)</li>
                      <li>Subhadra (Yajur)</li>
                      <li>Jagannatha (Sama)</li>
                      <li>Sudarshana (Atharva)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#E67A00] mb-2">The cosmic energies:</h3>
                    <p className="text-[#6D6D6D]">Creation, preservation, destruction, and transcendence.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#E67A00] mb-2">The spiritual unity of diverse paths:</h3>
                    <p className="text-[#6D6D6D]">Advaita, Dvaita, Vishishtadvaita, and others.</p>
                  </div>
                </div>
              </div>

              {/* Living Embodiment Section */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                A Living Embodiment of Sanatana Dharma in Telangana
              </h2>
              <p className="text-[#6D6D6D] mb-6">
                Though the temple in Isnapur is relatively new, it has quickly emerged as a sanctuary of devotion, seva (service), and unity. It draws devotees from all walks of life and continues to uphold the eternal values of compassion, universality, and divine love—values that Lord Jagannatha Himself embodies.
              </p>
              <p className="text-[#6D6D6D] mb-12">
                Even today, Mahaprasada—the sacred food offered to the Lord—is distributed freely and equally among all, just as in Puri. It symbolizes the Lord Himself, reminding us that in His eyes, all beings are equal.
              </p>

              {/* Conclusion Section */}
              <div className="bg-[#FFF9F0] rounded-xl p-8">
                <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                  Conclusion
                </h2>
                <p className="text-[#6D6D6D] mb-6">
                  The presence of Lord Jagannatha in Isnapur is not merely a replica of an ancient tradition—it is a living flame of eternal Sanatana Dharma kindled in the heart of Telangana. It invites us to see the One Divine in all, and to approach Him not just through rituals but with sincere devotion, humility, and love.
                </p>
                <div className="border-l-4 border-[#E67A00] pl-6 italic">
                  <p className="text-[#6D6D6D] mb-2">
                    "In whatever way He is worshipped by anyone, accordingly does He confer fruits on him... with such glory the Lord has become manifest here."
                  </p>
                  <p className="text-sm text-[#E67A00]">- Lord Brahma</p>
                </div>
                <p className="text-[#6D6D6D] mt-6">
                  In Isnapur, as in Puri, the Supreme Lord Jagannatha smiles eternally, offering darshan, protection, and bliss to all beings—reminding us that the Divine is near, now, and forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
