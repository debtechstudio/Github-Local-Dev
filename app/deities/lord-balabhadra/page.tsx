import Image from 'next/image';

export default function LordBalabhadraPage() {
  return (
    <main className="min-h-screen">
      <div className="pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-8 text-center">
              Lord Balabhadra
            </h1>

            {/* Main Image */}
            <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/deities/balabhadra.jpg"
                alt="Lord Balabhadra"
                fill
                className="object-cover"
              />
            </div>

            {/* Introduction */}
            <div className="prose max-w-none">
              <p className="text-lg text-[#6D6D6D] leading-relaxed mb-8">
                Lord Balabhadra, also known as Baladeva, Balarama, or simply Balabhadra, is the elder brother of Lord Krishna. He is worshipped as one of the key deities in the Jagannath Trinity, alongside Lord Jagannath (Krishna) and Goddess Subhadra.
              </p>
              
              <p className="text-lg text-[#6D6D6D] leading-relaxed mb-12">
                In the Jagannath Temple of Puri, Lord Balabhadra is placed on the right side of Subhadra, and He is a deeply revered figure representing strength, duty, and moral uprightness.
              </p>

              {/* Why Famous Section */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                Why is Lord Balabhadra Famous?
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">Divine Strength and Protector</h3>
                  <p className="text-[#6D6D6D]">
                    He is the embodiment of power and physical strength, known for His protective nature. In scriptures, He is often seen as the guardian of dharma (cosmic order).
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">Symbol of Simplicity and Honesty</h3>
                  <p className="text-[#6D6D6D]">
                    While Lord Krishna is known for diplomacy and leelas (divine plays), Balabhadra symbolizes straightforwardness and simplicity.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">Rath Yatra Participation</h3>
                  <p className="text-[#6D6D6D]">
                    During the Rath Yatra, Lord Balabhadra rides His own chariot named Taladhwaja, pulled by thousands of devotees. He leads the procession and reaches the Gundicha temple before Jagannath and Subhadra.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-prata text-[#E67A00] mb-4">White Complexion and Plough Weapon</h3>
                  <p className="text-[#6D6D6D]">
                    He is depicted as fair-skinned, with a plough (hala) and mace (gada) in His hands—symbolizing agriculture, stability, and strength.
                  </p>
                </div>
              </div>

              {/* History Section */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                History & Legends of Lord Balabhadra
              </h2>
              
              <div className="bg-[#FFF9F0] rounded-xl p-8 mb-12">
                <p className="text-[#6D6D6D] mb-4">
                  In Hindu mythology, Balabhadra is the incarnation of Ananta Shesha, the divine serpent bed of Lord Vishnu.
                </p>
                
                <p className="text-[#6D6D6D] mb-6">
                  He was born to Vasudeva and Devaki, but raised by Rohini, and spent much of His early life in Gokul and Vrindavan, alongside Krishna.
                </p>

                <div className="mb-6">
                  <p className="text-[#6D6D6D] mb-4">He played a crucial role in:</p>
                  <ul className="list-disc list-inside text-[#6D6D6D] space-y-2">
                    <li>Protecting Krishna during childhood adventures</li>
                    <li>Supporting the Pandavas in the Mahabharata (though He stayed neutral in the war)</li>
                    <li>Teaching Duryodhana and Bhima the art of mace-fighting (Gada-Yuddha)</li>
                  </ul>
                </div>

                <p className="text-[#6D6D6D]">
                  He is considered an agricultural deity in many rural traditions and is worshipped for rain, fertility, and harvest.
                </p>
              </div>

              {/* Spiritual Significance */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                Spiritual Significance
              </h2>
              
              <p className="text-lg text-[#6D6D6D] mb-4">
                Lord Balabhadra represents:
              </p>

              <ul className="list-disc list-inside text-[#6D6D6D] space-y-2 mb-8">
                <li>Power with purpose</li>
                <li>Honesty and righteousness</li>
                <li>The protective side of divinity</li>
                <li>Brotherly love and guidance</li>
              </ul>

              <p className="text-lg text-[#6D6D6D] mb-12">
                He balances the emotional, compassionate nature of Lord Jagannath with His own strength and clarity, making the Jagannath tradition beautifully complete.
              </p>

              {/* In Jagannath Culture */}
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">
                In Jagannath Culture
              </h2>

              <div className="bg-white rounded-xl shadow-md p-8">
                <ul className="space-y-4 text-[#6D6D6D]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#E67A00] font-bold">•</span>
                    <span>Lord Balabhadra's chariot is green-colored, symbolizing prosperity.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E67A00] font-bold">•</span>
                    <span>His mood is calmer, more grounded, and He is deeply associated with farmers and working-class people.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E67A00] font-bold">•</span>
                    <span>He is seen as a symbol of justice and the upholder of truth.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 