import Image from 'next/image';

export default function LordJagannathPage() {
  return (
    <main className="min-h-screen">
      <div className="pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-8 text-center">
              Lord Jagannath
            </h1>

            {/* Main Image */}
            <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/deities/jagannath.jpg"
                alt="Lord Jagannath"
                fill
                className="object-cover"
              />
            </div>

            {/* Introduction */}
            <div className="prose max-w-none">
              <p className="text-lg text-[#6D6D6D] leading-relaxed mb-8">
                Lord Jagannath is considered a form of Lord Krishna, who is the eighth avatar of Lord Vishnu. In some traditions, He is seen as a combined representation of Krishna, Vishnu, and Narayana. He is always worshipped with His elder brother Balabhadra (Balarama) and His sister Subhadra.
              </p>
              
              <p className="text-lg text-[#6D6D6D] leading-relaxed mb-12">
                Unlike typical Hindu idols, Lord Jagannath is uniquely carved from wood (Neem logs called Daru) and painted with large round eyes and stumpy arms—symbolizing a universal and formless divinity that embraces all.
              </p>

              {/* Why Famous Section */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                Why is Lord Jagannath Famous?
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">Rath Yatra (Chariot Festival)</h3>
                  <p className="text-[#6D6D6D]">
                    This is the most famous and unique festival where the deities come out of the temple and ride giant chariots through the streets of Puri. Millions of devotees gather to pull the chariots—believing it brings salvation. It is a symbol of God's love and accessibility to all.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">Unique Iconography</h3>
                  <p className="text-[#6D6D6D]">
                    Jagannath's form defies classical norms—He has no fully formed limbs and His appearance is considered mysterious and sacred.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">Inclusiveness</h3>
                  <p className="text-[#6D6D6D]">
                    Unlike many temples, the Jagannath tradition welcomes people from all backgrounds, symbolizing that the Lord belongs to everyone.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">Spiritual Symbolism</h3>
                  <p className="text-[#6D6D6D]">
                    His round eyes are said to be ever-watchful and filled with unconditional love. His wooden form is ritually replaced every 12–19 years in a sacred ceremony called Nabakalebara.
                  </p>
                </div>
              </div>

              {/* History Section */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                Brief History & Legend
              </h2>
              
              <div className="bg-[#FFF9F0] rounded-xl p-8 mb-12">
                <p className="text-[#6D6D6D] mb-4">
                  According to Skanda Purana and Brahma Purana, King Indradyumna, a pious devotee of Vishnu, had a divine vision and sought to establish the deity in his kingdom. Vishnu instructed him to find a divine log (Daru Brahma) that would float on the sea.
                </p>
                
                <p className="text-[#6D6D6D] mb-4">
                  Vishwakarma, the divine architect, agreed to carve the deity on one condition: no one should disturb him. But after 21 days of silence, the queen grew anxious and opened the door, stopping the carving process midway. The half-formed deities were then installed and worshipped as Jagannath, Balabhadra, and Subhadra.
                </p>
                
                <p className="text-[#6D6D6D]">
                  The Puri Jagannath Temple was later expanded and gained prominence under King Anantavarman Chodaganga Deva of the Eastern Ganga dynasty in the 12th century.
                </p>
              </div>

              {/* Spiritual Significance */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                Spiritual Significance
              </h2>
              
              <p className="text-lg text-[#6D6D6D] mb-4">
                Lord Jagannath represents:
              </p>

              <ul className="list-disc list-inside text-[#6D6D6D] space-y-2 mb-8">
                <li>Universal compassion and love</li>
                <li>The belief that God resides beyond form</li>
                <li>A divine assurance that God comes to the people, especially during the Rath Yatra</li>
              </ul>

              <p className="text-lg text-[#6D6D6D] italic">
                Jagannath is not just a deity—He is an emotion, a cultural heritage, and a symbol of India's spiritual diversity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 