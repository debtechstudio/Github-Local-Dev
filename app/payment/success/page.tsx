'use client';

import { useSearchParams } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Receipt, Home, Download } from "lucide-react";
import { useEffect, useState, Suspense } from 'react';
import { DonationReceipt } from '@/components/receipts/DonationReceipt';
import { Document, Page, pdf } from '@react-pdf/renderer';
import { ReceiptContent } from '@/components/receipts/DynamicPDFDocument';
import { toast } from 'sonner';

interface PaymentData {
  status: string;
  amount: string;
  txnId: string;
  orderId: string;
  date: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  purpose: string;
  surcharge: string;
  totalAmount: string;
  paymentMode: string;
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!searchParams) {
      setLoading(false);
      return;
    }

    try {
      const data: PaymentData = {
        status: searchParams.get('status') || '',
        amount: searchParams.get('amount') || '',
        txnId: searchParams.get('txnId') || '',
        orderId: searchParams.get('orderId') || '',
        date: searchParams.get('date') || '',
        donorName: searchParams.get('donorName') || '',
        donorEmail: searchParams.get('donorEmail') || '',
        donorPhone: searchParams.get('donorPhone') || '',
        purpose: searchParams.get('purpose') || '',
        surcharge: searchParams.get('surcharge') || '',
        totalAmount: searchParams.get('totalAmount') || '',
        paymentMode: searchParams.get('paymentMode') || ''
      };

      const isValid = data.status && data.txnId && !isNaN(Number(data.amount));
      setPaymentData(isValid ? data : null);
    } catch (error) {
      console.error('Failed to parse payment data:', error);
      setPaymentData(null);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const handleDownloadReceipt = async () => {
    if (!paymentData) return;
    
    try {
      setIsDownloading(true);
      
      const dateObj = new Date(paymentData.date);
      const formattedDate = dateObj.toLocaleDateString('en-IN');
      const formattedTime = dateObj.toLocaleTimeString('en-IN');

      // Create the PDF document
      const blob = await pdf(
        <Document>
          <Page size={[595.28, 841.89]}>
            <ReceiptContent
              transactionId={paymentData.txnId}
              amount={paymentData.amount}
              totalAmount={paymentData.totalAmount}
              name={paymentData.donorName}
              email={paymentData.donorEmail}
              phone={paymentData.donorPhone}
              address=""
              purpose={paymentData.purpose}
              paymentMode={paymentData.paymentMode}
              date={formattedDate}
              time={formattedTime}
              status={paymentData.status}
              merchantTransactionId={paymentData.orderId}
            />
          </Page>
        </Document>
      ).toBlob();
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `receipt-${paymentData.txnId}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download PDF:', error);
      toast.error('Failed to download receipt. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-6">
          <div className="text-center">Loading Payment Information...</div>
        </Card>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Payment Information Not Found</h1>
            <p className="mt-4 text-gray-600">
              Sorry, we couldn&apos;t find the payment information. Please contact support if you believe this is an error.
            </p>
            <div className="mt-6">
              <Link href="/">
                <Button variant="outline">Return Home</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const dateObj = new Date(paymentData.date);
  const formattedDate = dateObj.toLocaleDateString('en-IN');
  const formattedTime = dateObj.toLocaleTimeString('en-IN');

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="p-6 space-y-6 mb-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
          <p className="text-gray-600">
            Thank you for your donation. Your contribution has been received successfully.
          </p>
        </div>

        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold text-lg border-b pb-2">Transaction Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-600">Transaction ID:</div>
            <div>{paymentData.txnId}</div>
            <div className="text-gray-600">Order ID:</div>
            <div>{paymentData.orderId}</div>
            <div className="text-gray-600">Amount:</div>
            <div>₹{paymentData.amount}</div>
            <div className="text-gray-600">Date:</div>
            <div>{formattedDate} {formattedTime}</div>
            <div className="text-gray-600">Status:</div>
            <div className="text-green-600 font-semibold">{paymentData.status}</div>
            {paymentData.purpose && (
              <>
                <div className="text-gray-600">Purpose:</div>
                <div>{paymentData.purpose}</div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            className="flex-1 gap-2" 
            onClick={handleDownloadReceipt}
            disabled={isDownloading}
          >
            <Download className="h-4 w-4" />
            {isDownloading ? 'Downloading...' : 'Download Receipt'}
          </Button>
          <Link href="/" className="flex-1">
            <Button 
              variant="outline" 
              className="w-full gap-2"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Donation Receipt</h2>
        <DonationReceipt
          transactionId={paymentData.txnId}
          amount={paymentData.amount}
          totalAmount={paymentData.totalAmount}
          name={paymentData.donorName}
          email={paymentData.donorEmail}
          phone={paymentData.donorPhone}
          address=""
          purpose={paymentData.purpose}
          paymentMode={paymentData.paymentMode}
          date={formattedDate}
          time={formattedTime}
          status={paymentData.status}
          merchantTransactionId={paymentData.orderId}
        />
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-6">
          <div className="text-center">Loading Payment Information...</div>
        </Card>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}