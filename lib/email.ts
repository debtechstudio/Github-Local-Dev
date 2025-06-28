// Removed nodemailer dependency - using modern fetch-based email service
import { PaymentStatus } from '@/lib/types/payment'

interface EmailData {
  name: string
  email: string
  amount: string
  transactionId: string
  date: string
}

// Function to format currency
const formatCurrency = (amount: string) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(Number(amount))
}

// Function to format date
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('en-IN', {
    dateStyle: 'long',
    timeStyle: 'medium'
  })
}

// Modern email service using fetch API
async function sendEmail(to: string, subject: string, content: string) {
  try {
    // Using a modern email service API (replace with your preferred service)
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        content
      })
    })

    return response.ok
  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}

export async function sendDonationConfirmation(receiptData: PaymentStatus) {
  const {
    donorName: name,
    donorEmail: email,
    amount,
    totalAmount,
    txnId: transactionId,
    date,
    purpose,
    status,
    orderId: merchantTransactionId,
  } = receiptData

  const formattedAmount = formatCurrency(amount)
  const formattedTotal = formatCurrency(totalAmount || amount)
  const formattedDate = formatDate(date)

  const emailContent = `
    Dear ${name},

    Thank you for your generous donation to Shri Jagannath Temple. Your support helps us maintain and improve our temple services.

    Donation Details:
    - Amount: ${formattedAmount}
    - Total Amount (inc. charges): ${formattedTotal}
    - Transaction ID: ${transactionId}
    - Date: ${formattedDate}
    - Purpose: ${purpose || 'General Donation'}
    - Status: ${status}
    - Reference Number: ${merchantTransactionId}

    You can download your receipt by visiting our website.

    May Lord Jagannath bless you and your family.

    Best regards,
    Temple Administration Team
  `

  try {
    return await sendEmail(email, 'Thank You for Your Donation to Shri Jagannath Temple', emailContent)
  } catch (error) {
    console.error('Failed to send donor email:', error)
    return false
  }
}

export async function sendAdminNotification(receiptData: PaymentStatus) {
  const {
    donorName: name,
    donorEmail: email,
    donorPhone: phone,
    amount,
    totalAmount,
    txnId: transactionId,
    date,
    purpose,
    status,
    orderId: merchantTransactionId,
    paymentMode
  } = receiptData

  const formattedAmount = formatCurrency(amount)
  const formattedTotal = formatCurrency(totalAmount || amount)
  const formattedDate = formatDate(date)

  const emailContent = `
    New Donation Received

    Donor Information:
    - Name: ${name}
    - Email: ${email}
    - Phone: ${phone}

    Transaction Details:
    - Amount: ${formattedAmount}
    - Total Amount (inc. charges): ${formattedTotal}
    - Transaction ID: ${transactionId}
    - Date: ${formattedDate}
    - Purpose: ${purpose || 'General Donation'}
    - Status: ${status}
    - Payment Mode: ${paymentMode || 'Online'}
    - Reference Number: ${merchantTransactionId}

    This is an automated notification. Please check the admin dashboard for more details.
  `

  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@temple.com'
    return await sendEmail(adminEmail, `New Donation Received - ${formattedAmount}`, emailContent)
  } catch (error) {
    console.error('Failed to send admin notification:', error)
    return false
  }
}

export async function sendPaymentFailureNotification(emailData: EmailData) {
  const { name, email, amount, transactionId, date } = emailData

  const formattedAmount = formatCurrency(amount)
  const formattedDate = formatDate(date)

  const emailContent = `
    Dear ${name},

    We noticed that there was an issue with your recent donation attempt to Shri Jagannath Temple.

    Transaction Details:
    - Amount: ${formattedAmount}
    - Transaction ID: ${transactionId}
    - Date: ${formattedDate}

    If you experienced any issues or need assistance, please don't hesitate to contact us:
    - Phone: +91 (040) 2222 4422
    - Email: info@isanpurjagannath.in

    You can try making the donation again by visiting our website.

    Best regards,
    Temple Administration Team
  `

  try {
    return await sendEmail(email, 'Donation Payment Status - Action Required', emailContent)
  } catch (error) {
    console.error('Failed to send failure notification:', error)
    return false
  }
}