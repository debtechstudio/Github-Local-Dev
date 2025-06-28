import { AES, enc, mode, pad, format } from 'crypto-js'
import Base64 from 'crypto-js/enc-base64'

export function encryptEas(data: string | object, key: string, iv: string): string {
  try {
    let jsonData = typeof data === 'string' ? data : JSON.stringify(data)
    
    const keyBytes = Base64.parse(key)
    const ivBytes = Base64.parse(iv)

    const encrypted = AES.encrypt(jsonData, keyBytes, {
      iv: ivBytes,
      mode: mode.CBC,
      padding: pad.Pkcs7,
      format: format.Hex
    })

    return encrypted.toString()
  } catch (error) {
    console.error('Encryption error:', error)
    throw new Error('Encryption failed')
  }
}

export function decryptEas(data: string, key: string, iv: string): string {
  try {
    const keyBytes = Base64.parse(key)
    const ivBytes = Base64.parse(iv)

    const decrypted = AES.decrypt(data, keyBytes, {
      iv: ivBytes,
      mode: mode.CBC,
      padding: pad.Pkcs7,
      format: format.Hex
    })

    return decrypted.toString(enc.Utf8)
  } catch (error) {
    console.error('Decryption error:', error)
    throw new Error('Decryption failed')
  }
}