'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

export default function HealthServicesPage() {
  return (
    <main className="min-h-screen">
      <div className="pt-20">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-8 text-center">
            Health Services
          </h1>
          <p className="text-lg text-center mb-12 text-muted-foreground">
            Serving the community through free medical care and health camps
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Regular Health Camps</CardTitle>
                <CardDescription>Monthly medical check-ups and consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>General health check-ups</li>
                  <li>Blood pressure monitoring</li>
                  <li>Diabetes screening</li>
                  <li>Basic eye check-up</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Register for Next Camp</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialist Consultations</CardTitle>
                <CardDescription>Expert medical advice from specialists</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Cardiology</li>
                  <li>Orthopedics</li>
                  <li>Pediatrics</li>
                  <li>Gynecology</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Book Consultation</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Services</CardTitle>
                <CardDescription>24/7 emergency medical assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>First aid</li>
                  <li>Emergency response</li>
                  <li>Ambulance service</li>
                  <li>Basic life support</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Emergency Contacts</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">About Our Health Services</h2>
            <p className="mb-6">
              Jai Jagannath Dham Committee, Isnapur is committed to serving the community through comprehensive healthcare initiatives. Our health camps and medical services are provided free of cost to ensure that quality healthcare reaches everyone in need.
            </p>

            <h3 className="text-xl font-semibold mb-3">Upcoming Health Camps</h3>
            <div className="bg-muted p-6 rounded-lg mb-8">
              <ul className="space-y-4">
                <li>
                  <strong>General Health Camp</strong>
                  <br />
                  Date: First Sunday of every month
                  <br />
                  Time: 9:00 AM to 2:00 PM
                </li>
                <li>
                  <strong>Special Eye Camp</strong>
                  <br />
                  Date: Second Saturday of every month
                  <br />
                  Time: 10:00 AM to 3:00 PM
                </li>
                <li>
                  <strong>Dental Check-up Camp</strong>
                  <br />
                  Date: Last Sunday of every month
                  <br />
                  Time: 9:00 AM to 1:00 PM
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-3">How to Register</h3>
            <p className="mb-6">
              You can register for our health camps in any of the following ways:
            </p>
            <ul className="list-disc pl-6 mb-8">
              <li>Visit the temple office during working hours</li>
              <li>Call our dedicated healthcare helpline</li>
              <li>Register online through our website</li>
            </ul>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
              <p className="mb-2">Healthcare Helpline: +91 (040) 2222 4422</p>
              <p className="mb-2">WhatsApp: +91 (040) 2222 4422</p>
              <p className="mb-2">Email: health@isanpurjagannath.in</p>
              <p>Working Hours: 9:00 AM to 6:00 PM (Monday to Saturday)</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 