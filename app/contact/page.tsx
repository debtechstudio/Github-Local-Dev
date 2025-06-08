'use client';

import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <div className="pt-28 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-8 text-center">
            Contact Us
          </h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">Send us a Message</h2>
              
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter message subject" />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here" rows={4} />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFF9F0] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-[#E67A00]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1E1E24] mb-1">Phone</h3>
                      <p className="text-[#6D6D6D]">+91 6752 222002</p>
                      <p className="text-[#6D6D6D]">+91 6752 222003</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFF9F0] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-[#E67A00]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1E1E24] mb-1">Email</h3>
                      <p className="text-[#6D6D6D]">info@jagannathtemple.com</p>
                      <p className="text-[#6D6D6D]">support@jagannathtemple.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFF9F0] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-[#E67A00]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1E1E24] mb-1">Address</h3>
                      <p className="text-[#6D6D6D]">
                        Shri Jagannath Temple
                        <br />
                        Grand Road, Puri
                        <br />
                        Odisha - 752001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-prata text-[#1E1E24] mb-6">Location</h2>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.953404773016!2d85.81814731491406!3d19.8050570865584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19c4180256e495%3A0x496a9d8b30c1fad7!2sJagannath%20Temple%2C%20Puri!5e0!3m2!1sen!2sin!4v1625647892345!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                  ></iframe>
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
