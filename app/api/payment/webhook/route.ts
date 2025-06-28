import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { decryptEas } from '@/lib/encryption';
import { getepayConfig } from '@/lib/getepay';
import { RowDataPacket, OkPacket } from 'mysql2';
import { sendPaymentFailureNotification } from '@/lib/email';

interface DonationRecord extends RowDataPacket {
  id: number;
  merchant_transaction_id: string;
  getepay_transaction_id: string | null;
  amount: number;
  payment_status: string;
  donor_name: string | null;
  donor_email: string | null;
  donor_phone: string | null;
  donor_address: string | null;
  purpose: string;
  payment_mode: string | null;
  transaction_date: string | null;
  response_data: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const { res: encryptedResponse } = await req.json();
    
    if (!encryptedResponse) {
      return NextResponse.json({ 
        error: 'Missing payment response data' 
      }, { 
        status: 400 
      });
    }

    // Decrypt the response
    const decrypted = decryptEas(
      encryptedResponse,
      getepayConfig.GetepayKey,
      getepayConfig.GetepayIV
    );
    const paymentData = JSON.parse(decrypted);

    // Validate required fields
    const requiredFields = ['merchantOrderNo', 'txnStatus', 'txnAmount', 'getepayTxnId'];
    const missingFields = requiredFields.filter(field => 
      !paymentData.hasOwnProperty(field) || 
      paymentData[field] === undefined || 
      paymentData[field] === null || 
      paymentData[field] === ''
    );
    
    if (missingFields.length > 0) {
      console.error('Webhook validation failed:', {
        paymentData,
        missingFields
      });
      return NextResponse.json({
        error: `Missing required fields: ${missingFields.join(', ')}`
      }, {
        status: 400
      });
    }

    // Format transaction date
    const txnDate = paymentData.txnDate ? 
      new Date(paymentData.txnDate).toISOString().slice(0, 19).replace('T', ' ') :
      new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
      // Start transaction
      await query('START TRANSACTION');

      // Find the donation record with row lock
      const [donations] = await query<DonationRecord[]>(
        'SELECT * FROM donations WHERE merchant_transaction_id = ? FOR UPDATE',
        [paymentData.merchantOrderNo]
      );
      const donation = donations[0];

      if (!donation) {
        await query('ROLLBACK');
        return NextResponse.json({
          error: 'Donation record not found'
        }, {
          status: 404
        });
      }

      // Validate amount
      const donationAmount = parseFloat(donation.amount.toString());
      const txnAmount = parseFloat(paymentData.txnAmount);
      
      if (txnAmount <= 0) {
        await query('ROLLBACK');
        return NextResponse.json({
          error: 'Invalid transaction amount: Amount must be positive'
        }, {
          status: 400
        });
      }

      if (Math.abs(donationAmount - txnAmount) > 0.01) {
        await query('ROLLBACK');
        return NextResponse.json({
          error: 'Transaction amount mismatch'
        }, {
          status: 400
        });
      }

      // Update donation record if not already successful
      if (donation.payment_status !== 'SUCCESS') {
        // Update donation status
        await query<OkPacket>(
          `UPDATE donations SET 
           payment_status = ?,
           getepay_transaction_id = ?,
           payment_mode = ?,
           transaction_date = ?,
           response_data = ?
           WHERE id = ? AND payment_status != 'SUCCESS'`,
          [
            paymentData.txnStatus,
            paymentData.getepayTxnId,
            paymentData.paymentMode || null,
            txnDate,
            JSON.stringify(paymentData),
            donation.id
          ]
        );

        // Send failure notification if payment failed
        if (paymentData.txnStatus === 'FAILED' || paymentData.paymentStatus === 'FAILED') {
          try {
            await sendPaymentFailureNotification({
              name: donation.donor_name || '',
              email: donation.donor_email || '',
              amount: paymentData.txnAmount,
              transactionId: paymentData.getepayTxnId,
              date: txnDate
            });
            console.log('Payment failure notification sent');
          } catch (emailError) {
            console.error('Failed to send payment failure notification:', emailError);
          }
        }
      }

      // Log the webhook
      await query<OkPacket>(
        `INSERT INTO payment_logs (donation_id, log_type, status, message, raw_data)
         VALUES (?, 'WEBHOOK', ?, ?, ?)`,
        [
          donation.id,
          paymentData.txnStatus,
          `Payment ${paymentData.txnStatus.toLowerCase()}`,
          JSON.stringify(paymentData)
        ]
      );

      await query('COMMIT');

      return NextResponse.json({ 
        success: true,
        status: paymentData.txnStatus
      });

    } catch (dbError) {
      await query('ROLLBACK');
      throw dbError; // Let the outer catch handler deal with it
    }

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({
      error: error.message || 'Failed to process payment notification'
    }, {
      status: 500
    });
  }
}
