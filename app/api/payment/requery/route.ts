import { NextRequest, NextResponse } from 'next/server';
import { encryptEas, decryptEas } from '@/lib/encryption';
import { GETEPAY_CONFIG } from '@/lib/getepay';
import { query } from '@/lib/mysql';

const REQUERY_URL = 'https://pay1.getepay.in:8443/getepayPortal/pg/invoiceStatus';

// Standardized error responses to avoid exposing internal details
const ErrorResponses = {
  INVALID_REQUEST: { error: 'Invalid request parameters', code: 'INVALID_REQUEST' },
  PAYMENT_NOT_FOUND: { error: 'Payment information not found', code: 'PAYMENT_NOT_FOUND' },
  GATEWAY_ERROR: { error: 'Unable to process payment check', code: 'GATEWAY_ERROR' },
  TIMEOUT: { error: 'Request timed out', code: 'TIMEOUT' },
  SERVER_ERROR: { error: 'Service temporarily unavailable', code: 'SERVER_ERROR' }
} as const;

interface GetepayResponse {
  getepayTxnId: string;
  mid: string;
  txnAmount: string;
  txnStatus: string;
  merchantOrderNo: string;
  paymentStatus: string;
  txnDate?: string;
  paymentMode?: string;
  [key: string]: string | undefined;
}

export async function POST(request: NextRequest) {
  try {
    const { paymentId } = await request.json();

    if (!paymentId) {
      return NextResponse.json(ErrorResponses.INVALID_REQUEST, { status: 400 });
    }

    // Get payment record
    const [donations]: any = await query(
      'SELECT * FROM donations WHERE getepay_transaction_id = ?',
      [paymentId]
    );

    if (!donations || !donations.length) {
      return NextResponse.json(ErrorResponses.PAYMENT_NOT_FOUND, { status: 404 });
    }

    const donation = donations[0];

    // Prepare requery request
    const requeryData = {
      mid: GETEPAY_CONFIG.GetepayMid.toString(),
      terminalId: GETEPAY_CONFIG.GetepayTerminalId,
      getepayTxnId: paymentId
    };

    // Encrypt request
    const encrypted = encryptEas(
      JSON.stringify(requeryData),
      GETEPAY_CONFIG.GetepayKey,
      GETEPAY_CONFIG.GetepayIV
    );

    // Make request to GetePay
    const response = await fetch(REQUERY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        mid: GETEPAY_CONFIG.GetepayMid.toString(),
        terminalId: GETEPAY_CONFIG.GetepayTerminalId,
        req: encrypted
      })
    });

    if (!response.ok) {
      console.error('Gateway returned error:', await response.text());
      return NextResponse.json(ErrorResponses.GATEWAY_ERROR, { status: 502 });
    }

    const responseText = await response.text();
    let parsedResponse: GetepayResponse;

    try {
      const result = JSON.parse(responseText);
      
      if (!result?.response) {
        console.error('Invalid gateway response:', result);
        return NextResponse.json(ErrorResponses.GATEWAY_ERROR, { status: 502 });
      }

      // Decrypt the response
      const decryptedResponse = decryptEas(
        result.response,
        GETEPAY_CONFIG.GetepayKey,
        GETEPAY_CONFIG.GetepayIV
      );
      parsedResponse = JSON.parse(decryptedResponse);
    } catch (error) {
      console.error('Decryption/parsing error:', error);
      return NextResponse.json(ErrorResponses.GATEWAY_ERROR, { status: 502 });
    }

    // Validate required fields
    const requiredFields = [
      'getepayTxnId',
      'mid',
      'txnAmount',
      'txnStatus',
      'merchantOrderNo',
      'paymentStatus'
    ];

    const missingFields = requiredFields.filter(field => !parsedResponse[field]);
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return NextResponse.json(ErrorResponses.GATEWAY_ERROR, { status: 502 });
    }

    // Update donation record if status changed
    if (parsedResponse.txnStatus === 'SUCCESS' || parsedResponse.paymentStatus === 'SUCCESS') {
      await query(
        `UPDATE donations SET 
         payment_status = ?, 
         payment_mode = ?,
         transaction_date = ?,
         response_data = ?
         WHERE id = ? AND payment_status != 'SUCCESS'`,
        [
          parsedResponse.txnStatus,
          parsedResponse.paymentMode || '',
          parsedResponse.txnDate || new Date().toISOString().slice(0, 19).replace('T', ' '),
          JSON.stringify(parsedResponse),
          donation.id
        ]
      );
    }

    // Log the requery response
    await query(
      `INSERT INTO payment_logs (donation_id, log_type, status, message, raw_data)
       VALUES (?, 'REQUERY', ?, ?, ?)`,
      [
        donation.id,
        parsedResponse.txnStatus,
        `Status check - ${parsedResponse.txnStatus}`,
        JSON.stringify(parsedResponse)
      ]
    );

    return NextResponse.json({
      success: true,
      data: parsedResponse
    });

  } catch (error) {
    console.error('Payment requery failed:', error);
    return NextResponse.json(ErrorResponses.SERVER_ERROR, { status: 500 });
  }
}
