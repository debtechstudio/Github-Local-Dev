'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <div className="pt-20">
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
                      <Mail className="text-[#E67A00]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1E1E24] mb-1">Email</h3>
                      <p className="text-[#6D6D6D]">info@isanpurjagannath.in</p>
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
                        121, Isnapur-Indira Karan Rd
                        <br />
                        Isnapur, Hyderabad
                        <br />
                        Telangana - 502307
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.045584353358!2d78.31673571491127!3d17.40180588807039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9428a2a07ae7%3A0x9c2a5a8c6f5e5f5e!2sShri%20Jagannath%20Temple%20Isnapur!5e0!3m2!1sen!2sin!4v1625647892345!5m2!1sen!2sin"
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
    </main>
  );
}
