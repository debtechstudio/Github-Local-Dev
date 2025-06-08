import { z } from 'zod';

export const donationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  address: z.string().optional(),
  purpose: z.string().optional(),
  message: z.string().optional(),
  amount: z.number().min(1, 'Minimum donation amount is ₹1'),
});

export const paymentWebhookSchema = z.object({
  response: z.string(),
  mid: z.number(),
  terminalId: z.string(),
});

export const paymentResponseSchema = z.object({
  getepayTxnId: z.string(),
  mid: z.string(),
  txnAmount: z.string(),
  txnStatus: z.string(),
  merchantOrderNo: z.string(),
  udf1: z.string(), // donor name
  udf2: z.string(), // donor email
  udf3: z.string(), // phone
  udf4: z.string().optional(), // address
  udf5: z.string().optional(), // purpose
  udf6: z.string().optional(), // message
  paymentMode: z.string(),
  paymentStatus: z.string(),
  txnDate: z.string(),
  totalAmount: z.string(),
});

export type DonationFormData = z.infer<typeof donationSchema>;
export type PaymentWebhookData = z.infer<typeof paymentWebhookSchema>;
export type PaymentResponseData = z.infer<typeof paymentResponseSchema>;

export function validateDonationData(data: any) {
  try {
    const parsedAmount = Number(data.amount);
    if (isNaN(parsedAmount)) {
      return 'Invalid donation amount';
    }

    const validationData = {
      name: data.udf1,
      email: data.udf2,
      phone: data.udf3,
      address: data.udf4,
      purpose: data.udf5,
      message: data.udf6,
      amount: parsedAmount,
    };

    donationSchema.parse(validationData);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0].message;
    }
    return 'Invalid donation data';
  }
}
