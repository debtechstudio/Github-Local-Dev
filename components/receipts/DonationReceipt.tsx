import dynamic from 'next/dynamic';
import { useState } from 'react';
import { pdf, Document, Page } from '@react-pdf/renderer';
import { ReceiptContent } from './DynamicPDFDocument';

// Create a dynamic wrapper component with proper loading state
const DynamicPDFDocument = dynamic(
  () => import('./DynamicPDFDocument').then(mod => {
    console.log('PDF Document module loaded');
    return mod;
  }).catch(err => {
    console.error('Failed to load PDF Document module:', err);
    throw err;
  }),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">Loading PDF viewer...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    )
  }
);

export interface ReceiptProps {
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
  onDownload?: () => void;
}

export function DonationReceipt(props: ReceiptProps) {
  return (
    <div className="w-full">
      <DynamicPDFDocument {...props} />
    </div>
  );
}

export default DonationReceipt;
