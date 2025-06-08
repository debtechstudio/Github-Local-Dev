import { AES, enc, format, mode, pad } from "crypto-js";
import Base64 from "crypto-js/enc-base64";

export function encryptEas(data: string, key: string, iv: string): string {
  const keys = Base64.parse(key);
  const ivs = Base64.parse(iv);
  const encrypted = AES.encrypt(data, keys, {
    iv: ivs,
    mode: mode.CBC,
    padding: pad.Pkcs7,
    format: format.Hex,
  });
  return encrypted.toString();
}

export function decryptEas(data: string, key: string, iv: string): string {
  const keys = Base64.parse(key);
  const ivs = Base64.parse(iv);
  return AES.decrypt(data, keys, {
    iv: ivs,
    mode: mode.CBC,
    padding: pad.Pkcs7,
    format: format.Hex,
  }).toString(enc.Utf8);
}
