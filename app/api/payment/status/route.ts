import { NextRequest, NextResponse } from 'next/server';

import { PaymentStatus } from '@/lib/types/payment';

function validatePaymentStatus(searchParams: URLSearchParams): PaymentStatus | null {
  const status: PaymentStatus = {
    status: searchParams.get('status')?.toUpperCase() || '',
    amount: searchParams.get('amount') || '',
    txnId: searchParams.get('txnId') || '',
    orderId: searchParams.get('orderId') || '',
    date: searchParams.get('date') || '',
    donorName: searchParams.get('donorName') || '',
    donorEmail: searchParams.get('donorEmail') || '',
    donorPhone: searchParams.get('donorPhone') || '',
    purpose: searchParams.get('purpose') || '',
    surcharge: searchParams.get('surcharge') || '0',
    totalAmount: searchParams.get('totalAmount') || '',
    paymentMode: searchParams.get('paymentMode') || '',
  };

  const isValid =
    status.status &&
    status.txnId &&
    !isNaN(Number(status.amount));

  return isValid ? status : null;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const paymentStatus = validatePaymentStatus(searchParams);

    if (!paymentStatus) {
      return NextResponse.json(
        { error: 'Invalid payment data' },
        { status: 400 }
      );
    }

    return NextResponse.json(paymentStatus);
  } catch (error) {
    console.error('Payment status validation failed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
