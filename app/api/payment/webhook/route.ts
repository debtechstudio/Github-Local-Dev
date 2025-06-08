import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { decryptEas } from '@/lib/encryption';
import { getepayConfig } from '@/lib/getepay';

export async function POST(req: NextRequest) {
  try {
    const { res: encryptedResponse } = await req.json();
    
    if (!encryptedResponse) {
      throw new Error('Missing payment response data');
    }

    // Decrypt the response
    const decrypted = decryptEas(
      encryptedResponse,
      getepayConfig.GetepayKey,
      getepayConfig.GetepayIV
    );
    const paymentData = JSON.parse(decrypted);

    // Find the donation record
    const [donations]: any = await query(
      'SELECT * FROM donations WHERE merchant_transaction_id = ?',
      [paymentData.merchantOrderNo]
    );

    if (!donations || donations.length === 0) {
      throw new Error('Donation record not found');
    }

    const donation = donations[0];

    // Update donation status
    await query(
      `UPDATE donations SET 
       payment_status = ?,
       getepay_transaction_id = ?,
       payment_mode = ?,
       transaction_date = ?,
       response_data = ?
       WHERE id = ?`,
      [
        paymentData.txnStatus,
        paymentData.getepayTxnId,
        paymentData.paymentMode,
        paymentData.txnDate,
        JSON.stringify(paymentData),
        donation.id
      ]
    );

    // Log the webhook
    await query(
      `INSERT INTO payment_logs (donation_id, log_type, status, message, raw_data)
       VALUES (?, 'WEBHOOK', ?, ?, ?)`,
      [
        donation.id,
        paymentData.txnStatus,
        `Payment ${paymentData.txnStatus.toLowerCase()}`,
        JSON.stringify(paymentData)
      ]
    );

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process payment notification' },
      { status: 500 }
    );
  }
}
