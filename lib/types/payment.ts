export interface PaymentStatus {
  status: string;
  amount: string;
  txnId: string;
  orderId: string;
  date: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  purpose: string;
  surcharge?: string;
  totalAmount?: string;
  paymentMode?: string;
}
