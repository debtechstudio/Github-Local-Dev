import { AES, enc, mode, pad, format } from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js';

export function encryptEas(data: string | object, key: string, iv: string): string {
  try {
    // If data is an object, stringify it
    let jsonData = typeof data === 'string' ? data : JSON.stringify(data);
    
    // Log input data for debugging
    console.log('Encrypting data:', jsonData);

    // Convert Base64 key and IV to WordArray
    const keyBytes = Base64.parse(key);
    const ivBytes = Base64.parse(iv);

    // Encrypt using AES-CBC with PKCS7 padding and Hex format
    const encrypted = AES.encrypt(jsonData, keyBytes, {
      iv: ivBytes,
      mode: mode.CBC,
      padding: pad.Pkcs7,
      format: format.Hex // Explicitly set format to Hex as required by GetePay
    });

    // No need to convert to uppercase as Hex format already handles this
    return encrypted.toString();
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Encryption failed');
  }
}

export function decryptEas(data: string, key: string, iv: string): string {
  try {
    // Convert Base64 key and IV to WordArray
    const keyBytes = Base64.parse(key);
    const ivBytes = Base64.parse(iv);

    // Decrypt using AES-CBC with PKCS7 padding and Hex format
    const decrypted = AES.decrypt(data, keyBytes, {
      iv: ivBytes,
      mode: mode.CBC,
      padding: pad.Pkcs7,
      format: format.Hex
    });

    // Convert result to UTF8 string
    return decrypted.toString(enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Decryption failed');
  }
}