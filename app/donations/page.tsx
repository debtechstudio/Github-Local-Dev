// Creating donations page with the same content as donate page
'use client';

import { useState } from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { initiateGetepayPayment, getepayConfig, type DonationData } from '@/lib/getepay';

export default function DonationsPage() {
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    purpose: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const predefinedAmounts = ['101', '501', '1001', '5000', '10000', '25000'];

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount('');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDonation = async () => {
    const amount = selectedAmount || customAmount;
    
    if (!amount || !formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (parseFloat(amount) < 1) {
      toast.error('Minimum donation amount is ₹1');
      return;
    }

    setIsLoading(true);

    try {
      // Generate a clean merchant transaction ID
      const timestamp = Date.now();
      const merchantTxnId = `TEMPLE${timestamp}${Math.random().toString(36).substring(2, 6)}`.toUpperCase();
      
      // Get the current origin with validation
      let origin;
      try {
        if (typeof window !== 'undefined') {
          origin = window.location.origin;
        } else {
          origin = process.env.NEXT_PUBLIC_BASE_URL;
        }

        if (!origin) {
          throw new Error('Application URL configuration is missing');
        }

        // Validate the origin URL
        new URL(origin);
      } catch (urlError) {
        throw new Error('Invalid application URL configuration');
      }
      
      // Create donation data with validated URLs
      const donationData: DonationData = {
        mid: getepayConfig.GetepayMid,
        amount: parseFloat(amount).toFixed(2),
        merchantTransactionId: merchantTxnId,
        transactionDate: new Date().toLocaleString('en-US', { 
          timeZone: 'Asia/Kolkata',
          hour12: false 
        }),
        terminalId: getepayConfig.GeepayTerminalId,
        udf1: formData.name,
        udf2: formData.email,
        udf3: formData.phone,
        udf4: formData.address,
        udf5: formData.purpose || 'Temple Donation',
        udf6: formData.message,
        udf7: '',
        udf8: '',
        udf9: '',
        udf10: '',
        ru: new URL('/payment/success', origin).toString(),
        callbackUrl: new URL('/api/payment/webhook', origin).toString(),
        currency: 'INR',
        paymentMode: 'ALL',
        bankId: '',
        txnType: 'single',
        productType: 'IPG',
        txnNote: `Temple Donation - ${formData.purpose || 'General'}`,
        vpa: getepayConfig.GeepayTerminalId,
      };

      // Store transaction data in session storage with sanitized data
      const storageData = {
        ...donationData,
        timestamp: Date.now(),
        // Include absolute URLs for recovery
        ru: donationData.ru,
        callbackUrl: donationData.callbackUrl
      };

      sessionStorage.setItem('lastDonationData', JSON.stringify(storageData));

      const paymentUrl = await initiateGetepayPayment(donationData);
      
      if (!paymentUrl) {
        throw new Error('Payment URL not received from gateway');
      }

      // Validate payment URL
      try {
        const urlObj = new URL(paymentUrl);
        if (!urlObj.protocol.startsWith('http')) {
          throw new Error('Invalid payment gateway URL protocol');
        }
        
        toast.success('Redirecting to payment gateway...', {
          duration: 2000
        });

        // Use setTimeout to ensure the toast is visible before redirect
        setTimeout(() => {
          window.location.href = paymentUrl;
        }, 1000);

      } catch (urlError) {
        console.error('Payment URL validation failed:', urlError);
        throw new Error('Invalid payment gateway URL received');
      }

    } catch (error) {
      console.error('Payment initialization failed:', error);
      
      // Extract meaningful error message
      let errorMessage = 'Payment initialization failed';
      let errorDescription = 'Please try again later';
      
      if (error instanceof Error) {
        if (error.message.includes('Missing required fields')) {
          errorMessage = 'Missing required information';
          errorDescription = 'Please check all required fields and try again';
        } else if (error.message.includes('Invalid amount')) {
          errorMessage = 'Invalid donation amount';
          errorDescription = 'Please enter a valid amount and try again';
        } else if (error.message.includes('encryption') || error.message.includes('decrypt')) {
          errorMessage = 'Payment gateway error';
          errorDescription = 'There was a technical issue. Please try again later';
        } else if (error.message.includes('URL')) {
          errorMessage = 'Configuration error';
          errorDescription = 'Please contact support with error code: URL_CONFIG';
        } else {
          errorMessage = 'Payment system error';
          errorDescription = 'Please try again or contact support if the issue persists';
        }
      }
      
      toast.error(errorMessage, {
        description: errorDescription,
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-[#E67A00] to-[#D4A017] text-white">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="ghost" className="text-white hover:bg-white/20">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft size={20} />
                Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-prata mb-4">
              Support the Temple
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Your generous contributions help maintain the temple and support various charitable activities
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image and Info */}
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
                <Image
                  src="/images/jagannath-puri-temple.jpg"
                  alt="Donate to Jagannath Temple"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="bg-[#FFF9F0] p-6 rounded-xl">
                <h3 className="text-xl font-prata text-[#E67A00] mb-4">
                  Why Your Donation Matters
                </h3>
                <ul className="space-y-3 text-[#6D6D6D]">
                  <li className="flex items-start gap-3">
                    <Heart size={16} className="text-[#E67A00] mt-1 flex-shrink-0" />
                    <span>Maintain the sacred temple premises and infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart size={16} className="text-[#E67A00] mt-1 flex-shrink-0" />
                    <span>Support daily rituals and religious ceremonies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart size={16} className="text-[#E67A00] mt-1 flex-shrink-0" />
                    <span>Provide free meals (Annadanam) to devotees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart size={16} className="text-[#E67A00] mt-1 flex-shrink-0" />
                    <span>Fund educational and healthcare initiatives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart size={16} className="text-[#E67A00] mt-1 flex-shrink-0" />
                    <span>Organize festivals and cultural events</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Donation Form */}
            <div className="bg-[#FFF9F0] p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-prata text-[#E67A00] mb-6">
                Make a Donation
              </h2>

              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-[#1E1E24] font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-[#1E1E24] font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#1E1E24] font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-[#1E1E24] font-medium">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>

                {/* Donation Amount */}
                <div>
                  <Label className="text-[#1E1E24] font-medium mb-3 block">
                    Donation Amount (₹) *
                  </Label>
                  
                  {/* Predefined Amounts */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`p-3 text-center rounded-lg border-2 transition-all duration-300 ${
                          selectedAmount === amount
                            ? 'border-[#E67A00] bg-[#E67A00] text-white'
                            : 'border-gray-200 bg-white text-[#1E1E24] hover:border-[#E67A00]'
                        }`}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <Input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="w-full"
                    min="1"
                  />
                </div>

                {/* Purpose Selection */}
                <div>
                  <Label className="text-[#1E1E24] font-medium">
                    Purpose of Donation
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('purpose', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temple">Temple Maintenance</SelectItem>
                      <SelectItem value="annadanam">Annadanam (Food Offering)</SelectItem>
                      <SelectItem value="education">Education Programs</SelectItem>
                      <SelectItem value="healthcare">Healthcare Initiatives</SelectItem>
                      <SelectItem value="festivals">Festival Celebrations</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-[#1E1E24] font-medium">
                    Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Any special message or prayer request"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>

                {/* Donate Button */}
                <Button 
                  onClick={handleDonation}
                  disabled={isLoading}
                  className="w-full btn-primary py-3 text-base font-semibold"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="spinner" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Heart className="mr-2" size={20} />
                      Donate ₹{selectedAmount || customAmount || '0'}
                    </>
                  )}
                </Button>

                <p className="text-xs text-[#6D6D6D] text-center">
                  Your donation is secure and processed through GetePay payment gateway.
                  You will receive a receipt via email after successful payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
