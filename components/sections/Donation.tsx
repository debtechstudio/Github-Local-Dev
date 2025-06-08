'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { DonationData, initiateGetepayPayment, GETEPAY_CONFIG } from '@/lib/getepay';
import Link from 'next/link';

export default function Donation() {
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = ['101', '501', '1001', '5000', '10000'];

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    if (value && (!Number(value) || Number(value) <= 0)) {
      toast.error('Please enter a valid amount');
      return;
    }
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

    if (Number(amount) < 1) {
      toast.error('Please enter an amount greater than ₹1');
      return;
    }

    const currentUrl = window.location.origin;
    const donationData: DonationData = {
      mid: GETEPAY_CONFIG.GetepayMid,
      amount: parseFloat(amount).toFixed(2),
      merchantTransactionId: `TEMPLE_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      transactionDate: new Date().toISOString(),
      terminalId: GETEPAY_CONFIG.GeepayTerminalId,
      udf1: formData.name,
      udf2: formData.email,
      udf3: formData.phone,
      udf4: '',
      udf5: formData.purpose || 'Temple Donation',
      udf6: '',
      udf7: '',
      udf8: '',
      udf9: '',
      udf10: '',
      ru: `${currentUrl}/payment/success`,
      callbackUrl: `${currentUrl}/api/payment/webhook`,
      currency: 'INR',
      paymentMode: 'ALL',
      bankId: '',
      txnType: 'single',
      productType: 'IPG',
      txnNote: `Temple Donation - ${formData.purpose || 'General'}`,
      vpa: GETEPAY_CONFIG.GeepayTerminalId,
    };

    try {
      setIsProcessing(true);
      const paymentUrl = await initiateGetepayPayment(donationData, GETEPAY_CONFIG);
      window.location.href = paymentUrl;
      toast.success('Redirecting to payment gateway...');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment initialization failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="donate" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-prata text-[#E67A00] mb-4 relative inline-block">
            Support the Temple
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#D4A017]" />
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="animate-fade-in-left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/jagannath-puri-temple.jpg"
                alt="Donate to Jagannath Temple"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Donation Form */}
          <div className="animate-fade-in-right">
            <div className="bg-[#FFF9F0] p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-prata text-[#E67A00] mb-4">
                Make a Donation
              </h3>
              <p className="text-[#6D6D6D] mb-6">
                Your generous contributions help maintain the temple and support various charitable activities
              </p>

              <div className="space-y-6">
                {/* Name Field */}
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
                  />
                </div>

                {/* Email Field */}
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
                  />
                </div>

                {/* Phone Field */}
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
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Donate Button */}
                <Button 
                  onClick={handleDonation}
                  disabled={isProcessing}
                  className="w-full btn-primary py-3 text-base font-semibold"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="spinner" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Heart className="mr-2" size={20} />
                      {`Donate ₹${selectedAmount || customAmount || '0'}`}
                    </>
                  )}
                </Button>

                <div className="text-center space-y-4">
                  <p className="text-xs text-[#6D6D6D]">
                    Your donation is secure and processed through GetePay payment gateway
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/donations">
                      View All Donation Options
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}