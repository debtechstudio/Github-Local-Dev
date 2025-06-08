'use client';

import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TimingsPage() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <div className="pt-28 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-8 text-center">
            Temple Timings
          </h1>
          
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-prata text-[#1E1E24] mb-4">Daily Schedule</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-[#6D6D6D]">Mangal Arati</span>
                      <span className="font-medium">5:00 AM - 6:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-[#6D6D6D]">Temple Opening</span>
                      <span className="font-medium">6:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-[#6D6D6D]">Morning Darshan</span>
                      <span className="font-medium">6:30 AM - 11:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-[#6D6D6D]">Bhoga Mandap</span>
                      <span className="font-medium">11:30 AM - 12:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-[#6D6D6D]">Afternoon Darshan</span>
                      <span className="font-medium">3:30 PM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[#6D6D6D]">Temple Closing</span>
                      <span className="font-medium">10:00 PM</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-prata text-[#1E1E24] mb-4">Special Timings</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-[#6D6D6D]">Festival Days</span>
                      <span className="font-medium">4:30 AM - 11:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[#6D6D6D]">Rath Yatra Period</span>
                      <span className="font-medium">Special Schedule</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFF9F0] p-4 rounded-lg">
                  <p className="text-sm text-[#6D6D6D]">
                    Note: Timings may vary during special occasions and festivals. 
                    Please check temple notices for any changes in the schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
