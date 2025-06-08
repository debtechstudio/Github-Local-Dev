'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Download, Home, Heart, XCircle, Printer } from 'lucide-react';
import Link from 'next/link';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { DonationReceipt } from '@/components/receipts/DonationReceipt';
import { decryptEas } from '@/lib/encryption';
import { GETEPAY_CONFIG } from '@/lib/getepay';
import './styles.css';

interface PaymentResponse {
  getepayTxnId: string;
  mid: string;
  txnAmount: string;
  txnStatus: string;
  merchantOrderNo: string;
  udf1: string; // Name
  udf2: string; // Email
  udf3: string; // Phone
  udf4: string; // Address
  udf5: string; // Purpose
  paymentMode: string;
  message: string;
  paymentStatus: string;
  txnDate: string;
  surcharge: string;
  totalAmount: string;
  responseCode?: string;
}

interface ReceiptData {
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

export default function PaymentSuccessPage() {
  const [transactionDetails, setTransactionDetails] = useState<PaymentResponse | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const validatePaymentSuccess = (response: PaymentResponse): boolean => {
      const mainSuccess = response.txnStatus === 'SUCCESS' && response.paymentStatus === 'SUCCESS';
      const validResponseCode = ['0', '00'].includes(response.responseCode || '');
      const hasValidAmount = parseFloat(response.txnAmount) > 0;
      return mainSuccess && validResponseCode && hasValidAmount;
    };

    const processPaymentResponse = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const encryptedResponse = params.get('response');
        const sessionExpiry = 30 * 60 * 1000; // 30 minutes

        if (!encryptedResponse) {
          // Check for recovery data in session storage
          const lastDonation = sessionStorage.getItem('lastDonationData');
          if (lastDonation) {
            const donationData = JSON.parse(lastDonation);
            const timestamp = donationData.timestamp || 0;
            
            if (Date.now() - timestamp > sessionExpiry) {
              sessionStorage.removeItem('lastDonationData');
              throw new Error('Payment session has expired');
            }
            
            if (mounted) {
              setError(`Payment status could not be determined. Reference ID: ${donationData.merchantTransactionId}`);
              setIsLoading(false);
            }
          } else {
            throw new Error('No payment response found');
          }
          return;
        }

        // Decrypt the response client-side
        try {
          const decryptedData = decryptEas(
            encryptedResponse,
            GETEPAY_CONFIG.GetepayKey,
            GETEPAY_CONFIG.GetepayIV
          );
          
          const data = JSON.parse(decryptedData);

          // Validate required fields
          const requiredFields: (keyof PaymentResponse)[] = [
            'getepayTxnId',
            'mid',
            'txnAmount',
            'txnStatus',
            'merchantOrderNo'
          ];

          for (const field of requiredFields) {
            if (!data[field]) {
              throw new Error(`Missing required field: ${field}`);
            }
          }

          if (mounted) {
            const success = validatePaymentSuccess(data);
            setTransactionDetails(data);
            setIsSuccess(success);
            sessionStorage.removeItem('lastDonationData');

            if (success) {
              toast.success('Payment completed successfully!');
            } else {
              const errorMsg = data.message || 'Payment was not successful. Please try again.';
              toast.error(errorMsg);
              setError(errorMsg);
            }
          }
        } catch (decryptError) {
          console.error('Decryption error:', decryptError);
          throw new Error('Failed to process payment response');
        }

      } catch (error) {
        if (mounted) {
          const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
          console.error('Payment processing error:', error);
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    processPaymentResponse();

    return () => {
      mounted = false;
    };
  }, []);

  const TransactionRow = ({ label, value, className = '' }: { label: string; value: string; className?: string }) => (
    <div className="flex justify-between items-center py-2 border-b border-[#E67A00]/10 last:border-b-0">
      <span className="text-[#6D6D6D]">{label}:</span>
      <span className={`font-semibold ${className}`}>{value}</span>
    </div>
  );

  const DetailCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-[#FFF9F0] rounded-2xl p-8 shadow-lg mb-8">
      <h2 className="text-2xl font-prata text-[#E67A00] mb-6 text-center">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <TopBar />
        <Header />
        <section className="pt-32 pb-16">
          <div className="container-custom text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="spinner" />
              <p>Processing your payment...</p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!transactionDetails) {
    return (
      <main className="min-h-screen">
        <TopBar />
        <Header />
        <section className="pt-32 pb-16">
          <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto">
              <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h1 className="text-3xl font-prata mb-4">Payment Information Not Found</h1>
              <p className="text-gray-600 mb-8">
                We could not retrieve your payment details. This could be because:
              </p>
              <ul className="text-left text-gray-600 mb-8 space-y-2">
                <li>• The payment was cancelled</li>
                <li>• There was an error in the payment process</li>
                <li>• You accessed this page directly without making a payment</li>
                {error && <li>• Error details: {error}</li>}
              </ul>
              <Button asChild variant="outline" className="btn-outline px-8 py-3">
                <Link href="/donations">
                  <Heart className="mr-2" size={20} />
                  Try Making a Donation
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const { getepayTxnId, txnAmount, totalAmount, surcharge, paymentMode, txnDate, paymentStatus, udf1, udf2, udf3, udf4, udf5 } = transactionDetails;

  const receiptData: ReceiptData = {
    transactionId: transactionDetails.getepayTxnId,
    amount: transactionDetails.txnAmount,
    totalAmount: transactionDetails.totalAmount,
    name: transactionDetails.udf1,
    email: transactionDetails.udf2,
    phone: transactionDetails.udf3,
    address: transactionDetails.udf4 || '',
    purpose: transactionDetails.udf5 || 'Temple Donation',
    paymentMode: transactionDetails.paymentMode,
    date: new Date(transactionDetails.txnDate).toLocaleDateString(),
    time: new Date(transactionDetails.txnDate).toLocaleTimeString(),
    status: transactionDetails.paymentStatus,
    merchantTransactionId: transactionDetails.merchantOrderNo
  };

  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-to-r from-[#E67A00] to-[#D4A017] text-white">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="ghost" className="text-white hover:bg-white/20">
              <Link href="/" className="flex items-center gap-2">
                <Home size={20} />
                Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-prata mb-4">
              {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {isSuccess 
                ? 'Thank you for your generous contribution to Shri Jagannath Temple.'
                : 'We encountered an issue with your payment.'
              }
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              {isSuccess
                ? <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                : <XCircle className="w-16 h-16 text-red-600 mx-auto" />
              }
            </div>

            <DetailCard title="Transaction Details">
              <TransactionRow label="Transaction ID" value={getepayTxnId} />
              <TransactionRow label="Amount" value={`₹${txnAmount}`} className="text-[#E67A00] text-lg" />
              {surcharge && parseFloat(surcharge) > 0 && (
                <TransactionRow label="Surcharge" value={`₹${surcharge}`} />
              )}
              <TransactionRow label="Total Amount" value={`₹${totalAmount}`} className="text-[#E67A00] text-lg" />
              <TransactionRow 
                label="Date & Time" 
                value={new Date(txnDate).toLocaleString()} 
              />
              <TransactionRow label="Payment Mode" value={paymentMode} />
              <TransactionRow 
                label="Status" 
                value={paymentStatus}
                className={isSuccess ? 'text-green-600' : 'text-red-600'} 
              />
            </DetailCard>

            <DetailCard title="Donor Information">
              <TransactionRow label="Name" value={udf1} />
              <TransactionRow label="Email" value={udf2} />
              <TransactionRow label="Phone" value={udf3} />
              {udf4 && <TransactionRow label="Address" value={udf4} />}
              {udf5 && <TransactionRow label="Purpose" value={udf5} />}
            </DetailCard>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isSuccess && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <PDFDownloadLink
                    document={<DonationReceipt {...receiptData} />}
                    fileName={`donation-receipt-${getepayTxnId}.pdf`}
                  >
                    {({ loading }) => (
                      <Button className="btn-primary px-8 py-3 flex items-center justify-center" disabled={loading}>
                        <Download className="mr-2" size={20} />
                        {loading ? 'Preparing Receipt...' : 'Download Receipt'}
                      </Button>
                    )}
                  </PDFDownloadLink>

                  <Button
                    onClick={() => window.print()}
                    variant="outline"
                    className="btn-outline px-8 py-3 flex items-center justify-center"
                  >
                    <Printer className="mr-2" size={20} />
                    Print Receipt
                  </Button>
                </div>
              )}
              
              <Button 
                asChild 
                variant="outline" 
                className="btn-outline px-8 py-3 flex items-center justify-center"
              >
                <Link href="/donations">
                  <Heart className="mr-2" size={20} />
                  {isSuccess ? 'Donate Again' : 'Try Again'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}