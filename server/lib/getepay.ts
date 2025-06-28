export interface GetepayConfig {
  GetepayMid: number
  GetepayTerminalId: string
  GetepayKey: string
  GetepayIV: string
  GetepayUrl: string
}

export const GETEPAY_CONFIG: GetepayConfig = {
  GetepayMid: 108,
  GetepayTerminalId: "Getepay.merchant61062@icici",
  GetepayKey: "JoYPd+qso9s7T+Ebj8pi4Wl8i+AHLv+5UNJxA3JkDgY=",
  GetepayIV: "hlnuyA9b4YxDq6oJSZFl8g==",
  GetepayUrl: "https://pay1.getepay.in:8443/getepayPortal/pg/generateInvoice"
}