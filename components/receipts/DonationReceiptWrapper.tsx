import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import DonationReceipt to avoid SSR issues
const DonationReceiptPDF = dynamic(
  () => import('./DonationReceipt'),
  { ssr: false }
);

interface DonationReceiptWrapperProps {
  transactionId: string;
  amount: string;
  totalAmount: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  purpose: string;
  paymentMode: string;
  date: string;
  time: string;
  status: string;
  merchantTransactionId: string;
}

export function DonationReceiptWrapper(props: DonationReceiptWrapperProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={() => window.print()}
          className="print:hidden"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Receipt
        </Button>
      </div>
      <DonationReceiptPDF {...props} />
    </div>
  );
}

export default DonationReceiptWrapper;
