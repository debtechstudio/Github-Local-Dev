import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { encryptEas } from '@/lib/encryption';
import { getepayConfig } from '@/lib/getepay';
import { validateDonationData } from '@/lib/validations/payment';

export async function POST(req: NextRequest) {
  try {
    const donationData = await req.json();
    
    // Validate the donation data
    const validationError = validateDonationData(donationData);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Insert initial donation record
    const [result]: any = await query(
      `INSERT INTO donations (
        merchant_transaction_id,
        amount,
        donor_name,
        donor_email,
        donor_phone,
        donor_address,
        purpose,
        message,
        payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        donationData.merchantTransactionId,
        donationData.amount,
        donationData.udf1, // name
        donationData.udf2, // email
        donationData.udf3, // phone
        donationData.udf4, // address
        donationData.udf5, // purpose
        donationData.udf6, // message
        'PENDING'
      ]
    );

    // Log the initiation
    await query(
      `INSERT INTO payment_logs (donation_id, log_type, status, message, raw_data)
       VALUES (?, 'INITIATE', 'PENDING', 'Payment initiation started', ?)`,
      [result.insertId, JSON.stringify(donationData)]
    );

    // Encrypt and prepare Getepay request
    const encrypted = encryptEas(
      JSON.stringify(donationData),
      getepayConfig.GetepayKey,
      getepayConfig.GetepayIV
    );

    const response = await fetch(getepayConfig.GetepayUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mid: donationData.mid,
        terminalId: donationData.terminalId,
        req: encrypted
      })
    });

    if (!response.ok) {
      throw new Error(`Payment gateway error: ${response.statusText}`);
    }

    const paymentResponse = await response.json();
    
    if (!paymentResponse.response) {
      throw new Error('Invalid response from payment gateway');
    }

    // Log the gateway response
    await query(
      `INSERT INTO payment_logs (donation_id, log_type, status, message, raw_data)
       VALUES (?, 'GATEWAY_RESPONSE', 'SUCCESS', 'Received payment URL', ?)`,
      [result.insertId, JSON.stringify(paymentResponse)]
    );

    return NextResponse.json({ response: paymentResponse.response });

  } catch (error: any) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment initialization failed' },
      { status: 500 }
    );
  }
}
