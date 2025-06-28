import Image from 'next/image';

export default function MaaSubhadraPage() {
  return (
    <main className="min-h-screen">
      <div className="pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-8 text-center">
              Maa Subhadra
            </h1>

            {/* Main Image */}
            <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/deities/maa-subhadra.jpg"
                alt="Maa Subhadra"
                fill
                className="object-cover"
              />
            </div>

            {/* Introduction */}
            <div className="prose max-w-none">
              <p className="text-lg text-[#6D6D6D] leading-relaxed mb-12">
                Maa Subhadra is the younger sister of Lord Jagannath (Krishna) and Lord Balabhadra (Balarama). She holds a central place in the divine trio worshipped at the Jagannath Temple in Puri, Odisha. Her presence between her two brothers on the Ratna Singhasana (bejewelled altar) and during the Rath Yatra signifies love, balance, and harmony in the universe.
              </p>

              {/* Why Famous Section */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                Why is Maa Subhadra Famous?
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">Divine Feminine Power</h3>
                  <p className="text-[#6D6D6D]">
                    Maa Subhadra is a powerful form of Shakti, the feminine cosmic energy. She symbolizes balance between strength (Balabhadra) and compassion (Jagannath), making the Jagannath tradition spiritually complete.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">Rath Yatra's Central Figure</h3>
                  <p className="text-[#6D6D6D]">
                    During the Rath Yatra, She travels on Her own chariot, called Darpadalan (the destroyer of pride), showing Her independent spiritual power. She is placed in the middle chariot, symbolizing unity and grace.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">Unique Iconography</h3>
                  <p className="text-[#6D6D6D]">
                    Unlike traditional goddess idols, Maa Subhadra's form is square-shaped with large, round eyes, reflecting the timeless and universal motherly presence. She is often painted yellow, symbolizing auspiciousness and radiance.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">Symbol of Universal Sisterhood</h3>
                  <p className="text-[#6D6D6D]">
                    She is not only Krishna and Balarama's sister but is viewed as a universal divine sister, protecting and nurturing all devotees as Her own siblings.
                  </p>
                </div>
              </div>

              {/* History Section */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                History & Legends of Maa Subhadra
              </h2>
              
              <div className="bg-[#FFF9F0] rounded-xl p-8 mb-12">
                <p className="text-[#6D6D6D] mb-6">
                  In Puranic texts, Subhadra is said to be the daughter of Vasudeva and Devaki, and the incarnation of Yogmaya, the mystical power of the Divine.
                </p>

                <div className="mb-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">Marriage with Arjuna</h3>
                  <p className="text-[#6D6D6D] mb-4">
                    One of the most famous stories about Subhadra is her marriage to Arjuna, the Pandava prince. Krishna encouraged Arjuna to elope with Subhadra, as She was destined to marry him. Their son was Abhimanyu, the brave warrior of the Mahabharata.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">Presence in Jagannath Culture</h3>
                  <p className="text-[#6D6D6D]">
                    In the Jagannath tradition, it is believed that Subhadra desired to go out and see the world, and thus the Rath Yatra was first organized by Her brothers to fulfill Her wish.
                  </p>
                </div>
              </div>

              {/* Spiritual Significance */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                Spiritual Significance
              </h2>
              
              <p className="text-lg text-[#6D6D6D] mb-4">
                Maa Subhadra represents:
              </p>

              <ul className="list-disc list-inside text-[#6D6D6D] space-y-2 mb-8">
                <li>Divine balance and peace</li>
                <li>The gentle strength of the feminine</li>
                <li>Unity between masculine and feminine energy</li>
                <li>The role of a cosmic sister, mother, and guide</li>
              </ul>

              <p className="text-lg text-[#6D6D6D] mb-12">
                She teaches us the value of grace, dignity, and inner strength, and is worshipped with deep reverence in Odisha and beyond.
              </p>

              {/* In Jagannath Tradition */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                In the Jagannath Tradition
              </h2>

              <div className="bg-white rounded-xl shadow-md p-8 mb-12">
                <ul className="space-y-4 text-[#6D6D6D]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#E67A00] font-bold">•</span>
                    <span>Her chariot Darpadalan is black/yellow, symbolizing modesty and wisdom.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E67A00] font-bold">•</span>
                    <span>She is the only female deity in the grand Rath Yatra procession.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E67A00] font-bold">•</span>
                    <span>Unlike many Hindu goddesses, She is not depicted with many arms or weapons—Her power is subtle, calm, and inward.</span>
                  </li>
                </ul>
              </div>

              {/* Closing Section */}
              <div className="bg-[#FFF9F0] rounded-xl p-8">
                <h2 className="text-2xl font-prata text-[#1E1E24] mb-4">
                  Closing Devotion
                </h2>
                <p className="text-[#6D6D6D] italic">
                  In the divine trio, Maa Subhadra is the compassionate heart, standing between two great powers—Jagannath and Balabhadra. She is the soul of harmony, teaching that in the dance of life, grace and balance are as essential as strength and love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 