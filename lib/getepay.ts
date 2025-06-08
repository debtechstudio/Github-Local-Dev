import CryptoJS from 'crypto-js';
import { encryptEas, decryptEas } from './encryption';

export interface GetepayConfig {
  GetepayMid: number;
  GeepayTerminalId: string;
  GetepayKey: string;
  GetepayIV: string;
  GetepayUrl: string;
}

export interface DonationData {
  mid: number;
  amount: string;
  merchantTransactionId: string;
  transactionDate: string;
  terminalId: string;
  udf1: string;
  udf2: string;
  udf3: string;
  udf4?: string;
  udf5?: string;
  udf6?: string;
  udf7?: string;
  udf8?: string;
  udf9?: string;
  udf10?: string;
  ru: string;
  callbackUrl?: string;
  currency: string;
  paymentMode: string;
  bankId?: string;
  txnType: string;
  productType: string;
  txnNote: string;
  vpa: string;
}

// Main configuration (UPPER_CASE version)
export const GETEPAY_CONFIG: GetepayConfig = {
  GetepayMid: 108,
  GeepayTerminalId: "Getepay.merchant61062@icici",
  GetepayKey: "JoYPd+qso9s7T+Ebj8pi4Wl8i+AHLv+5UNJxA3JkDgY=",
  GetepayIV: "hlnuyA9b4YxDq6oJSZFl8g==",
  GetepayUrl: "https://pay1.getepay.in:8443/getepayPortal/pg/generateInvoice",
};

// Alias export (camelCase version) for backward compatibility
export const getepayConfig = GETEPAY_CONFIG;

export async function initiateGetepayPayment(
  donationData: DonationData, 
  config: GetepayConfig = GETEPAY_CONFIG
): Promise<string> {
  try {
    // Validate required fields
    if (!donationData.mid || !donationData.amount || !donationData.merchantTransactionId) {
      throw new Error('Missing required fields: mid, amount, or merchantTransactionId');
    }

    // Validate amount format
    const amount = parseFloat(donationData.amount);
    if (isNaN(amount) || amount <= 0) {
      throw new Error('Invalid amount value');
    }

    // Format transaction date if not properly formatted
    if (!donationData.transactionDate) {
      donationData.transactionDate = new Date().toLocaleString('en-US', { 
        timeZone: 'Asia/Kolkata',
        hour12: false 
      });
    }

    // Clean merchantTransactionId to ensure it meets requirements
    donationData.merchantTransactionId = donationData.merchantTransactionId
      .replace(/[^a-zA-Z0-9_]/g, '')  // Remove special characters except underscore
      .substring(0, 30);  // Limit length to 30 characters

    console.log('Encrypting donation data:', {
      mid: donationData.mid,
      terminalId: donationData.terminalId,
      amount: donationData.amount,
      txnId: donationData.merchantTransactionId
    });

    // Encrypt the request data
    let encryptedData: string;
    try {
      encryptedData = encryptEas(
        JSON.stringify(donationData),
        config.GetepayKey,
        config.GetepayIV
      );
    } catch (encryptError) {
      console.error('Encryption failed:', encryptError);
      throw new Error('Failed to encrypt payment data');
    }

    // Prepare the request body
    const requestBody = {
      mid: donationData.mid,
      terminalId: donationData.terminalId,
      req: encryptedData,
    };

    console.log('Sending request to:', config.GetepayUrl);

    // Make the API request
    const response = await fetch(config.GetepayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!response.ok) {
      throw new Error(`Payment initiation failed with status: ${response.status}, message: ${responseText}`);
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      throw new Error('Invalid JSON response from payment gateway');
    }
    
    if (!result.response) {
      console.error('Invalid gateway response:', result);
      throw new Error('Invalid response from payment gateway: Missing response field');
    }

    // Decrypt the response
    let decryptedData: string;
    try {
      decryptedData = decryptEas(
        result.response,
        config.GetepayKey,
        config.GetepayIV
      );
    } catch (decryptError) {
      console.error('Decryption failed:', decryptError);
      throw new Error('Failed to decrypt payment gateway response');
    }

    let paymentData;
    try {
      paymentData = JSON.parse(decryptedData);
    } catch (parseError) {
      console.error('Failed to parse decrypted data:', parseError);
      throw new Error('Invalid decrypted response format');
    }
    
    if (!paymentData.paymentUrl) {
      console.error('Payment data missing URL:', paymentData);
      throw new Error('Payment URL not found in response');
    }

    return paymentData.paymentUrl;

  } catch (error) {
    console.error('Payment initiation error:', error);
    throw error;
  }
}

// Helper function for client-side redirection
export function redirectToPayment(paymentUrl: string): void {
  if (typeof window !== 'undefined') {
    window.location.href = paymentUrl;
  }
}