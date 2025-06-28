import nodemailer from 'nodemailer';
import { PaymentStatus } from '@/lib/types/payment';

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

const transporter = nodemailer.createTransport(emailConfig);

interface EmailData {
  name: string;
  email: string;
  amount: string;
  transactionId: string;
  date: string;
}

// Function to format currency
const formatCurrency = (amount: string) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(Number(amount));
};

// Function to format date
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('en-IN', {
    dateStyle: 'long',
    timeStyle: 'medium'
  });
};

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
  } = receiptData;

  const formattedAmount = formatCurrency(amount);
  const formattedTotal = formatCurrency(totalAmount || amount);
  const formattedDate = formatDate(date);

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

    You can download your receipt by visiting our website and logging into your account.

    May Lord Jagannath bless you and your family.

    Best regards,
    Temple Administration Team
  `;

  const mailOptions = {
    from: process.env.SMTP_FROM || 'temple@example.com',
    to: email,
    subject: 'Thank You for Your Donation to Shri Jagannath Temple',
    text: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Failed to send donor email:', error);
    return false;
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
  } = receiptData;

  const formattedAmount = formatCurrency(amount);
  const formattedTotal = formatCurrency(totalAmount || amount);
  const formattedDate = formatDate(date);

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
  `;

  const mailOptions = {
    from: process.env.SMTP_FROM || 'temple@example.com',
    to: process.env.ADMIN_EMAIL,
    subject: `New Donation Received - ${formattedAmount}`,
    text: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return false;
  }
}

export async function sendPaymentFailureNotification(emailData: EmailData) {
  const { name, email, amount, transactionId, date } = emailData;

  const formattedAmount = formatCurrency(amount);
  const formattedDate = formatDate(date);

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
  `;

  const mailOptions = {
    from: process.env.SMTP_FROM || 'temple@example.com',
    to: email,
    subject: 'Donation Payment Status - Action Required',
    text: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Failed to send failure notification:', error);
    return false;
  }
}
