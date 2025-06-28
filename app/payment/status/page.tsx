'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentStatus {
  txnStatus: string;
  paymentStatus: string;
  txnAmount: string;
  getepayTxnId: string;
  merchantOrderNo: string;
  [key: string]: string;
}

// Separate the status checker into its own client component
function StatusChecker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checking, setChecking] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 10;
  const checkInterval = 5000; // 5 seconds

  useEffect(() => {
    const txnId = searchParams.get('txnId');
    const orderId = searchParams.get('orderId');

    if (!txnId || !orderId) {
      toast.error('Invalid payment information');
      router.push('/payment/failed?error=invalid_params');
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch('/api/payment/requery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentId: txnId }),
        });

        if (!response.ok) {
          throw new Error('Failed to check payment status');
        }

        const data = await response.json();
        const status: PaymentStatus = data.data;

        if (status.txnStatus === 'SUCCESS' || status.paymentStatus === 'SUCCESS') {
          // Payment successful, redirect to success page with all parameters
          const successParams = new URLSearchParams({
            status: status.txnStatus,
            amount: status.txnAmount,
            txnId: status.getepayTxnId,
            orderId: status.merchantOrderNo,
            date: status.txnDate || new Date().toISOString(),
            donorName: status.udf3 || '',
            donorEmail: status.udf2 || '',
            donorPhone: status.udf1 || '',
            purpose: status.udf5 || '',
            surcharge: status.surcharge || '0',
            totalAmount: status.totalAmount || status.txnAmount,
            paymentMode: status.paymentMode || 'UPI'
          });
          
          router.push('/payment/success?' + successParams.toString());
          return;
        }

        if (status.txnStatus === 'FAILED' || status.paymentStatus === 'FAILED') {
          router.push('/payment/failed?error=payment_failed&message=Payment was declined');
          return;
        }

        // If still pending and not reached max attempts, continue checking
        if (attempts < maxAttempts) {
          setAttempts(prev => prev + 1);
          setTimeout(checkPaymentStatus, checkInterval);
        } else {
          // Max attempts reached, show final status
          setChecking(false);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        if (attempts < maxAttempts) {
          setAttempts(prev => prev + 1);
          setTimeout(checkPaymentStatus, checkInterval);
        } else {
          setChecking(false);
        }
      }
    };

    checkPaymentStatus();
  }, [searchParams, router, attempts]);

  const handleReturnHome = () => {
    router.push('/');
  };

  return (
    <div className='text-center space-y-6'>
      {checking ? (
        <>
          <Loader2 className='h-12 w-12 animate-spin mx-auto text-primary' />
          <div>
            <h2 className='text-xl font-semibold mb-2'>Checking Payment Status</h2>
            <p className='text-gray-600'>
              Please wait while we verify your payment...
              <br />
              Do not close this window.
            </p>
          </div>
        </>
      ) : (
        <>
          <h2 className='text-xl font-semibold'>Payment Status Unknown</h2>
          <p className='text-gray-600'>
            We could not confirm your payment status. If you completed the payment,
            please check your email for confirmation or contact support.
          </p>
          <div className='flex justify-center gap-4'>
            <Button onClick={handleReturnHome}>Return Home</Button>
          </div>
        </>
      )}
    </div>
  );
}

// Main page component with Suspense boundary
export default function PaymentStatusPage() {
  return (
    <div className='container mx-auto px-4 py-8 max-w-2xl'>
      <Card className='p-6'>
        <Suspense fallback={
          <div className='text-center space-y-6'>
            <Loader2 className='h-12 w-12 animate-spin mx-auto text-primary' />
            <div>
              <h2 className='text-xl font-semibold mb-2'>Loading...</h2>
            </div>
          </div>
        }>
          <StatusChecker />
        </Suspense>
      </Card>
    </div>
  );
}
