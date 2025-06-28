import { encryptEas, decryptEas } from './encryption';

export interface GetepayConfig {
  GetepayMid: number;
  GetepayTerminalId: string;  // Using GetepayTerminalId consistently
  GetepayKey: string;
  GetepayIV: string;
  GetepayUrl: string;
  GetepayRu?: string;  // Optional return URL override
}

export interface DonationData {
  mid: string;
  amount: string | number;  // Allow both string and number
  merchantTransactionId: string;
  transactionDate: string;
  terminalId: string;
  udf1: string;  // phone
  udf2: string;  // email
  udf3: string;  // name
  udf4: string;  // address
  udf5: string;  // purpose
  udf6: string;
  udf7: string;
  udf8: string;
  udf9: string;
  udf10: string;
  ru: string;
  callbackUrl: string;
  currency: string;
  paymentMode: string;
  bankId: string;
  txnType: string;
  productType: string;
  txnNote: string;
  vpa: string;
}

export const GETEPAY_CONFIG: GetepayConfig = {  GetepayMid: 108,
  GetepayTerminalId: "Getepay.merchant61062@icici", // Terminal ID property name fixed
  GetepayKey: "JoYPd+qso9s7T+Ebj8pi4Wl8i+AHLv+5UNJxA3JkDgY=",
  GetepayIV: "hlnuyA9b4YxDq6oJSZFl8g==",
  GetepayUrl: "https://pay1.getepay.in:8443/getepayPortal/pg/generateInvoice"
};

export const getepayConfig = GETEPAY_CONFIG;

export async function initiateGetepayPayment(
  donationData: DonationData, 
  config: GetepayConfig = GETEPAY_CONFIG
): Promise<string> {
  try {
    // Format transaction date in IST as required by Getepay
    const istDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      year: 'numeric'
    }) + ' IST';

    // Prepare payment data exactly as per Getepay example
    const paymentData = {
      mid: config.GetepayMid.toString(),
      amount: typeof donationData.amount === 'string' ? donationData.amount : donationData.amount.toFixed(2),
      merchantTransactionId: donationData.merchantTransactionId,
      transactionDate: istDate,
      terminalId: config.GetepayTerminalId,
      udf1: donationData.udf1 || '',
      udf2: donationData.udf2 || '',
      udf3: donationData.udf3 || '',
      udf4: donationData.udf4 || '',
      udf5: donationData.udf5 || '',
      udf6: donationData.udf6 || '',
      udf7: donationData.udf7 || '',
      udf8: donationData.udf8 || '',
      udf9: donationData.udf9 || '',
      udf10: donationData.udf10 || '',
      ru: donationData.ru || '',
      callbackUrl: donationData.callbackUrl || '',
      currency: 'INR',
      paymentMode: donationData.paymentMode || 'ALL',
      bankId: donationData.bankId || '',
      txnType: 'single',
      productType: 'IPG',
      txnNote: donationData.txnNote || 'Temple Donation',
      vpa: config.GetepayTerminalId
    };

    console.log('Payment request data:', paymentData);

    // Encrypt request data
    const encrypted = encryptEas(
      JSON.stringify(paymentData),
      config.GetepayKey,
      config.GetepayIV
    );

    console.log('Request encryption successful');

    // Prepare request as per Getepay specification
    const requestBody = {
      mid: config.GetepayMid.toString(),  // Convert to string
      terminalId: config.GetepayTerminalId,
      req: encrypted
    };

    console.log('Sending request to:', config.GetepayUrl);

    // Call Getepay API
    const response = await fetch(config.GetepayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const responseText = await response.text();
    console.log('Raw gateway response:', responseText);

    try {
      const result = JSON.parse(responseText);
      
      if (!result?.response) {
        console.error('Invalid gateway response:', result);
        throw new Error(`Invalid gateway response: ${JSON.stringify(result)}`);
      }

      // Decrypt response
      const decrypted = decryptEas(
        result.response,
        config.GetepayKey,
        config.GetepayIV
      );

      console.log('Decrypted response:', decrypted);

      const paymentResponse = JSON.parse(decrypted);

      if (!paymentResponse?.paymentUrl) {
        throw new Error('Payment URL not found in response');
      }

      return paymentResponse.paymentUrl;

    } catch (parseError) {
      console.error('Failed to parse or decrypt response:', parseError);
      throw new Error('Invalid response from payment gateway');
    }

  } catch (error) {
    console.error('Payment initiation error:', error);
    throw error;
  }
}
