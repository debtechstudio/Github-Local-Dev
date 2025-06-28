'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function getErrorMessage(code: string | null): string {
  switch (code) {
    case 'missing_response':
      return 'Payment gateway did not return a response. Please try again.';
    case 'invalid_response':
      return 'Invalid response received from payment gateway.';
    case 'db_error':
      return 'Unable to process your payment due to a technical issue.';
    default:
      return 'Your payment could not be processed. Please try again.';
  }
}

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchParams) {
      setLoading(false);
      return;
    }

    const errorCode = searchParams.get('error');
    setErrorMessage(getErrorMessage(errorCode));
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="container max-w-2xl py-24 space-y-8">
        <Alert>
          <AlertTitle>Loading...</AlertTitle>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-24 space-y-8">
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Payment Failed</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>

      <div className="flex justify-center gap-4">
        <Button asChild variant="secondary">
          <Link href="/donate">Try Again</Link>
        </Button>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="container max-w-2xl py-24 space-y-8">
        <Alert>
          <AlertTitle>Loading...</AlertTitle>
        </Alert>
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  );
}
