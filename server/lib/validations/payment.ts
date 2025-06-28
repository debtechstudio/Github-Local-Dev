import { z } from 'zod'

export const donationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  address: z.string().optional(),
  purpose: z.string().optional(),
  message: z.string().optional(),
  amount: z.number().min(1, 'Minimum donation amount is ₹1'),
})

export type DonationFormData = z.infer<typeof donationSchema>