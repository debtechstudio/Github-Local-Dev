import { NextRequest, NextResponse } from 'next/server';
import { decryptEas } from '@/lib/encryption';
import { GETEPAY_CONFIG } from '@/lib/getepay';
import { transaction } from '@/lib/mysql';
import { RowDataPacket } from 'mysql2';
import { sendDonationConfirmation, sendAdminNotification } from '@/lib/email';

interface GetepayResponse {
  getepayTxnId: string;
  mid: string;
  txnAmount: string;
  txnStatus: string;
  merchantOrderNo: string;
  paymentStatus: string;
  txnDate: string;
  udf1?: string;  // Mobile
  udf2?: string;  // Email
  udf3?: string;  // Name
  udf4?: string;
  udf5?: string;  // Purpose
  paymentMode?: string;
  message?: string;
  surcharge?: string;
  totalAmount?: string;
  custRefNo?: string;
  discriminator?: string;
  [key: string]: string | undefined;
}

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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  // Define base URL once for all redirects
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  try {
    // 1. Get and validate request data
    const formData = await request.formData();
    const encryptedResponse = formData.get('response') as string;
    
    if (!encryptedResponse) {
      console.error('Missing response data');
      return NextResponse.redirect(`${baseUrl}/payment/failed?error=missing_response`);
    }

    // 2. Decrypt GetePay response
    const decryptedData = decryptEas(
      encryptedResponse,
      GETEPAY_CONFIG.GetepayKey,
      GETEPAY_CONFIG.GetepayIV
    );

    console.log('Processing payment response...');
    
    // Parse response (handle any potential JSON stringification)
    let parsedResponse: GetepayResponse;
    try {
      const parsed = JSON.parse(decryptedData);
      parsedResponse = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;

      // Validate required fields
      const requiredFields = [
        'getepayTxnId',
        'mid',
        'txnAmount',
        'txnStatus',
        'merchantOrderNo',
        'paymentStatus',
        'txnDate'
      ];

      const missingFields = requiredFields.filter(field => !parsedResponse[field]);
      if (missingFields.length > 0) {
        console.error('Missing required fields in response:', missingFields);
        throw new Error(`Invalid response: missing fields ${missingFields.join(', ')}`);
      }

      // Validate payment status
      if (parsedResponse.txnStatus !== 'SUCCESS' || parsedResponse.paymentStatus !== 'SUCCESS') {
        console.error('Payment was not successful:', parsedResponse);
        
        // Special handling for UPI payments that are in INITIATED state
        if (parsedResponse.paymentMode === 'UPI' && parsedResponse.txnStatus === 'INITIATED') {
          // For UPI payments, redirect to status page to check payment status
          const statusPath = `${baseUrl}/payment/status`;
          const params = new URLSearchParams();
          params.set('txnId', parsedResponse.getepayTxnId || '');
          params.set('orderId', parsedResponse.merchantOrderNo || '');
          
          return NextResponse.redirect(`${statusPath}?${params.toString()}`);
        }
        
        return NextResponse.redirect(`${baseUrl}/payment/failed?error=payment_failed&message=${encodeURIComponent(parsedResponse.message || 'Payment was not successful')}`);
      }

      // Validate merchant ID
      if (parsedResponse.mid !== GETEPAY_CONFIG.GetepayMid.toString()) {
        console.error('Invalid merchant ID in response:', parsedResponse.mid);
        return NextResponse.redirect(`${baseUrl}/payment/failed?error=invalid_merchant`);
      }

      console.log('Parsed payment response:', parsedResponse);
    } catch (err) {
      console.error('Failed to parse response:', err, 'Raw decrypted data:', decryptedData);
      return NextResponse.redirect(`${baseUrl}/payment/failed?error=invalid_response`);
    }

    // 3. Save to database using transaction
    const txnDate = parsedResponse.txnDate ? 
      new Date(parsedResponse.txnDate).toISOString().slice(0, 19).replace('T', ' ') :
      new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
      let donationId: number;

      await transaction(async (connection) => {
        // First try to select with row lock
        const [[donation]] = await connection.execute<DonationRecord[]>(
          'SELECT * FROM donations WHERE merchant_transaction_id = ? FOR UPDATE',
          [parsedResponse.merchantOrderNo]
        );
        
        if (!donation) {
          console.error('Donation record not found:', parsedResponse.merchantOrderNo);
          throw new Error('Donation record not found');
        }

        // Validate amount
        const donationAmount = parseFloat(donation.amount.toString());
        const txnAmount = parseFloat(parsedResponse.txnAmount);
        
        if (Math.abs(donationAmount - txnAmount) > 0.01) {
          console.error('Amount mismatch:', { donationAmount, txnAmount });
          throw new Error('Transaction amount mismatch');
        }

        // Skip update if payment is already successful
        if (donation.payment_status === 'SUCCESS') {
          console.log('Payment already marked as successful, skipping update');
          donationId = donation.id;
        } else {
          // Update existing donation with the response data
          const [result] = await connection.execute(
            `UPDATE donations SET
             getepay_transaction_id = ?,
             payment_status = ?,
             payment_mode = ?,
             transaction_date = ?,
             response_data = ?
             WHERE id = ? AND payment_status != 'SUCCESS'`,
            [
              parsedResponse.getepayTxnId,
              parsedResponse.txnStatus,
              parsedResponse.paymentMode || null,
              txnDate,
              JSON.stringify(parsedResponse),
              donation.id
            ]
          );
          donationId = donation.id;

          // Send email notifications only for newly successful payments
          if (parsedResponse.txnStatus === 'SUCCESS') {
            try {
              // Prepare payment status data for emails
              const emailData = {
                status: parsedResponse.txnStatus,
                amount: parsedResponse.txnAmount,
                txnId: parsedResponse.getepayTxnId,
                orderId: parsedResponse.merchantOrderNo,
                date: parsedResponse.txnDate || new Date().toISOString(),
                donorName: parsedResponse.udf3 || '',
                donorEmail: parsedResponse.udf2 || '',
                donorPhone: parsedResponse.udf1 || '',
                purpose: parsedResponse.udf5 || '',
                surcharge: parsedResponse.surcharge || '0',
                totalAmount: parsedResponse.totalAmount || parsedResponse.txnAmount,
                paymentMode: parsedResponse.paymentMode || ''
              };

              // Send confirmation to donor
              await sendDonationConfirmation(emailData);
              
              // Send notification to admin
              await sendAdminNotification(emailData);

              console.log('Email notifications sent successfully');
            } catch (emailError) {
              console.error('Failed to send email notifications:', emailError);
              // Don't throw error here, continue with the success flow
            }
          }
        }

        // Log payment response
        await connection.execute(
          `INSERT INTO payment_logs 
           (donation_id, log_type, status, message, raw_data)
           VALUES (?, ?, ?, ?, ?)`,
          [
            donationId,
            'PAYMENT_RESPONSE',
            parsedResponse.txnStatus,
            parsedResponse.message || `Payment ${parsedResponse.txnStatus.toLowerCase()}`,
            JSON.stringify(parsedResponse)
          ]
        );
      });

      // 4. Construct status page URL with parameters
      const statusPath = `${baseUrl}/payment/success`;
      const params = new URLSearchParams();
      
      // Safely add parameters with proper encoding
      params.set('status', parsedResponse.txnStatus || '');
      params.set('amount', parsedResponse.txnAmount || '0');
      params.set('txnId', parsedResponse.getepayTxnId || '');
      params.set('orderId', parsedResponse.merchantOrderNo || '');
      params.set('date', parsedResponse.txnDate || '');
      params.set('donorName', parsedResponse.udf3 || '');
      params.set('donorEmail', parsedResponse.udf2 || '');
      params.set('donorPhone', parsedResponse.udf1 || '');
      params.set('purpose', parsedResponse.udf5 || '');
      params.set('surcharge', parsedResponse.surcharge || '0');
      params.set('totalAmount', parsedResponse.totalAmount || parsedResponse.txnAmount || '0');
      params.set('paymentMode', parsedResponse.paymentMode || '');
      
      const redirectUrl = new URL(`${statusPath}?${params.toString()}`);
      console.log('Redirecting to:', redirectUrl.toString());
      
      return NextResponse.redirect(redirectUrl, {
        status: 303 // Using 303 See Other for POST-to-GET redirect
      });

    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      return NextResponse.redirect(`${baseUrl}/payment/failed?error=db_error`);
    }

  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.redirect(`${baseUrl}/payment/failed?error=general`);
  }
} 