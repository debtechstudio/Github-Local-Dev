import { NextRequest, NextResponse } from 'next/server';
import { encryptEas, decryptEas } from '@/lib/encryption';
import { GETEPAY_CONFIG } from '@/lib/getepay';

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields as per documentation
    const requiredFields = [
      'mid', 'amount', 'merchantTransactionId', 'transactionDate',
      'terminalId', 'udf1', 'udf2', 'udf3', 'ru', 'currency',
      'paymentMode', 'txnType', 'productType', 'vpa'
    ];
    
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Prepare request data as per documentation
    const requestData = {
      mid: body.mid,
      amount: body.amount,
      merchantTransactionId: body.merchantTransactionId,
      transactionDate: body.transactionDate,
      terminalId: body.terminalId,
      udf1: body.udf1, // Mobile
      udf2: body.udf2, // Email
      udf3: body.udf3, // Name
      udf4: body.udf4 || '',
      udf5: body.udf5 || '',
      udf6: body.udf6 || '',
      udf7: body.udf7 || '',
      udf8: body.udf8 || '',
      udf9: body.udf9 || '',
      udf10: body.udf10 || '',
      ru: body.ru,
      callbackUrl: body.callbackUrl || '',
      currency: body.currency || 'INR',
      paymentMode: body.paymentMode || 'ALL',
      bankId: body.bankId || '',
      txnType: body.txnType || 'single',
      productType: body.productType || 'IPG',
      txnNote: body.txnNote || '',
      vpa: body.vpa
    };

    // Encrypt the request data
    const encryptedRequest = encryptEas(
      JSON.stringify(requestData),
      GETEPAY_CONFIG.GetepayKey,
      GETEPAY_CONFIG.GetepayIV
    );

    // Prepare the request payload
    const payload = {
      mid: GETEPAY_CONFIG.GetepayMid,
      terminalId: GETEPAY_CONFIG.GeepayTerminalId,
      req: encryptedRequest
    };

    // Make the API call to Getepay
    const response = await fetch(GETEPAY_CONFIG.GetepayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();

    // Handle different response formats
    let parsedResponse: any;
    try {
      // First try to parse as JSON
      parsedResponse = JSON.parse(responseText);
      
      // If response contains encrypted data, decrypt it
      if (parsedResponse.res) {
        const decrypted = decryptEas(
          parsedResponse.res,
          GETEPAY_CONFIG.GetepayKey,
          GETEPAY_CONFIG.GetepayIV
        );
        parsedResponse = {
          ...parsedResponse,
          decryptedData: JSON.parse(decrypted)
        };
      }
    } catch (e) {
      // If JSON parsing fails, try URL encoded format
      try {
        const params = new URLSearchParams(responseText);
        parsedResponse = Object.fromEntries(params.entries());
        
        // If URL encoded response has encrypted data, decrypt it
        if (parsedResponse.res) {
          const decrypted = decryptEas(
            parsedResponse.res,
            GETEPAY_CONFIG.GetepayKey,
            GETEPAY_CONFIG.GetepayIV
          );
          parsedResponse.decryptedData = JSON.parse(decrypted);
        }
      } catch (err) {
        console.error('Failed to parse response:', err);
        throw new Error('Invalid response format from payment gateway');
      }
    }

    // Handle successful response
    if (parsedResponse.status === 'INI' || parsedResponse.decryptedData?.paymentUrl) {
      return NextResponse.json({
        success: true,
        data: parsedResponse.decryptedData || parsedResponse,
        paymentUrl: parsedResponse.decryptedData?.paymentUrl
      });
    }

    // Handle error response
    return NextResponse.json({
      error: parsedResponse.message || 'Payment initialization failed',
      details: parsedResponse
    }, { status: 400 });

  } catch (error: any) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process payment' },
      { status: 500 }
    );
  }
}