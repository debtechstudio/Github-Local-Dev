import { NextResponse } from 'next/server';
import { decryptEas } from '@/lib/encryption';
import { GETEPAY_CONFIG } from '@/lib/getepay';

export async function POST(request: Request) {
  try {
    // Get encrypted data from request body
    const body = await request.json();
    const { encryptedData } = body;

    if (!encryptedData) {
      return NextResponse.json(
        { error: 'No encrypted data provided' },
        { status: 400 }
      );
    }

    // Decrypt the response using Getepay configuration
    const decryptedData = decryptEas(
      encryptedData,
      GETEPAY_CONFIG.GetepayKey,
      GETEPAY_CONFIG.GetepayIV
    );

    // Parse and validate the decrypted data
    const parsedData = JSON.parse(decryptedData);

    // Required fields as per Getepay documentation
    const requiredFields = [
      'getepayTxnId',
      'mid',
      'txnAmount',
      'txnStatus',
      'merchantOrderNo',
      'paymentStatus'
    ];

    // Check for required fields
    const missingFields = requiredFields.filter(field => !parsedData[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Return successful response
    return NextResponse.json({
      data: parsedData
    });

  } catch (error) {
    console.error('Payment response decryption error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to decrypt payment response' },
      { status: 500 }
    );
  }
}
