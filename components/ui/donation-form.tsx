'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Textarea } from './textarea';
import { DonationData, initiateGetepayPayment, GETEPAY_CONFIG } from '@/lib/getepay';
import { donationSchema } from '@/lib/validations/payment';
import { z } from 'zod';

interface DonationFormProps {
  isCompact?: boolean;
  onSuccess?: () => void;
}

export function DonationForm({ isCompact = false, onSuccess }: DonationFormProps) {
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = ['101', '501', '1001', '5000', '10000'];
  if (!isCompact) predefinedAmounts.push('25000');

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setErrors((prev) => ({ ...prev, amount: '' }));
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount('');
    setErrors((prev) => ({ ...prev, amount: '' }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const amount = selectedAmount || customAmount;
    const validationData = {
      ...formData,
      amount: Number(amount)
    };

    try {
      donationSchema.parse(validationData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleDonation = async () => {
    const amount = selectedAmount || customAmount;
    
    try {
      // Validate form
      if (!validateForm()) {
        // If there are validation errors, they will be shown in the form
        return;
      }

      setIsProcessing(true);

      // Send validation data to API
      const requestData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        purpose: formData.purpose || 'General Donation',
        message: formData.message,
        amount: amount, // API will parse this to number
      };

      // Call payment initiation API
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to initiate payment');
      }

      if (!result.paymentUrl) {
        throw new Error('Payment URL not found in response');
      }

      toast.success('Redirecting to payment gateway...', {
        duration: 2000
      });

      onSuccess?.();

      // Redirect to payment gateway
      setTimeout(() => {
        window.location.href = result.paymentUrl;
      }, 1000);

    } catch (error) {
      console.error('Payment initialization failed:', error);
      
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Payment initialization failed. Please try again later.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className={isCompact ? "space-y-4" : "grid md:grid-cols-2 gap-4"}>
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
            className={`mt-2 ${errors.name ? 'border-red-500' : ''}`}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        
        {!isCompact && (
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
              className={`mt-2 ${errors.phone ? 'border-red-500' : ''}`}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        )}
      </div>

      {isCompact && (
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
            className={`mt-2 ${errors.phone ? 'border-red-500' : ''}`}
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      )}

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
          className={`mt-2 ${errors.email ? 'border-red-500' : ''}`}
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {!isCompact && (
        <div>
          <Label htmlFor="address" className="text-[#1E1E24] font-medium">
            Address
          </Label>
          <Textarea
            id="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className={`mt-2 ${errors.address ? 'border-red-500' : ''}`}
            rows={3}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
      )}

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
          className={`w-full ${errors.amount ? 'border-red-500' : ''}`}
          min="1"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
        )}
      </div>

      {/* Purpose Selection */}
      <div>
        <Label className="text-[#1E1E24] font-medium">
          Purpose of Donation *
        </Label>
        <Select onValueChange={(value) => handleInputChange('purpose', value)}>
          <SelectTrigger className={`mt-2 ${errors.purpose ? 'border-red-500' : ''}`}>
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
        {errors.purpose && (
          <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message" className="text-[#1E1E24] font-medium">
          Message (Optional)
        </Label>
        <Textarea
          id="message"
          placeholder="Enter your message"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className="mt-2"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <Button
        className="w-full bg-[#E67A00] hover:bg-[#d16e00] text-white"
        onClick={handleDonation}
        disabled={isProcessing}
      >
        {isProcessing ? (
          'Processing...'
        ) : (
          <>
            <Heart className="w-4 h-4 mr-2" />
            Make Donation
          </>
        )}
      </Button>
    </div>
  );
}
