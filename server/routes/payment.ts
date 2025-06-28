import { Router } from 'express'
import { query, transaction } from '../lib/mysql'
import { encryptEas, decryptEas } from '../lib/encryption'
import { GETEPAY_CONFIG } from '../lib/getepay'
import { donationSchema } from '../lib/validations/payment'
import { z } from 'zod'

const router = Router()

// Initiate payment
router.post('/initiate', async (req, res) => {
  try {
    const rawData = req.body
    
    // Transform and validate the data
    const validationData = {
      name: rawData.name,
      email: rawData.email,
      phone: rawData.phone,
      address: rawData.address || '',
      purpose: rawData.purpose || '',
      message: rawData.message || '',
      amount: typeof rawData.amount === 'string' ? parseFloat(rawData.amount) : rawData.amount
    }

    const validatedData = donationSchema.parse(validationData)

    // Generate merchant transaction ID
    const timestamp = new Date().getTime()
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
    const merchantTransactionId = `TEMPLE${timestamp}${randomPart}`

    // Use CC mode for UAT testing, ALL for production
    const paymentMode = process.env.NODE_ENV === 'development' ? 'CC' : 'ALL'

    // Insert initial donation record
    const result = await query(
      `INSERT INTO donations (
        merchant_transaction_id,
        amount,
        donor_name,
        donor_email,
        donor_phone,
        donor_address,
        purpose,
        message,
        payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')`,
      [
        merchantTransactionId,
        validatedData.amount,
        validatedData.name,
        validatedData.email,
        validatedData.phone,
        validatedData.address || '',
        validatedData.purpose || '',
        validatedData.message || ''
      ]
    )

    const insertId = (result as any).insertId
    if (!insertId) {
      throw new Error('Failed to insert donation record')
    }

    // Format transaction date in IST
    const istDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      year: 'numeric'
    }) + ' IST'

    // Prepare payment data
    const paymentData = {
      mid: GETEPAY_CONFIG.GetepayMid.toString(),
      terminalId: GETEPAY_CONFIG.GetepayTerminalId,
      amount: validatedData.amount.toFixed(2),
      merchantTransactionId,
      transactionDate: istDate,
      udf1: validatedData.phone,
      udf2: validatedData.email,
      udf3: validatedData.name,
      udf4: validatedData.address || '',
      udf5: validatedData.purpose || 'Temple Donation',
      udf6: '',
      udf7: '',
      udf8: '',
      udf9: '',
      udf10: '',
      ru: `${process.env.FRONTEND_URL}/api/payment/success`,
      callbackUrl: `${process.env.FRONTEND_URL}/api/payment/webhook`,
      currency: "INR",
      paymentMode,
      bankId: "",
      txnType: "single",
      productType: "IPG",
      txnNote: validatedData.message || 'Temple Donation',
      vpa: GETEPAY_CONFIG.GetepayTerminalId
    }

    // Log the initiation
    await query(
      `INSERT INTO payment_logs (donation_id, log_type, status, message, raw_data)
       VALUES (?, 'INITIATE', 'PENDING', 'Payment initiation started', ?)`,
      [insertId, JSON.stringify(paymentData)]
    )

    // Encrypt request data
    const encrypted = encryptEas(paymentData, GETEPAY_CONFIG.GetepayKey, GETEPAY_CONFIG.GetepayIV)

    // Prepare request body
    const requestBody = {
      mid: paymentData.mid,
      terminalId: paymentData.terminalId,
      req: encrypted
    }

    // Call Getepay API
    const response = await fetch(GETEPAY_CONFIG.GetepayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    const responseText = await response.text()
    console.log('Raw gateway response:', responseText)

    try {
      const gatewayResponse = JSON.parse(responseText)

      if (!gatewayResponse?.response || gatewayResponse.status !== 'SUCCESS') {
        console.error('Invalid or failed gateway response:', gatewayResponse)
        throw new Error(`Payment initiation failed: ${gatewayResponse.message || 'Unknown error'}`)
      }

      // Decrypt response
      const decrypted = decryptEas(
        gatewayResponse.response,
        GETEPAY_CONFIG.GetepayKey,
        GETEPAY_CONFIG.GetepayIV
      )

      const paymentResponse = JSON.parse(decrypted)

      if (!paymentResponse?.paymentUrl || !paymentResponse?.paymentId) {
        throw new Error('Invalid payment response: Missing required fields')
      }

      // Log the successful response
      await query(
        `INSERT INTO payment_logs (donation_id, log_type, status, message, raw_data)
         VALUES (?, 'GATEWAY_RESPONSE', 'SUCCESS', 'Received payment URL', ?)`,
        [insertId, JSON.stringify({ request: paymentData, response: paymentResponse })]
      )

      res.json({ 
        success: true,
        paymentUrl: paymentResponse.paymentUrl 
      })

    } catch (parseError) {
      console.error('Failed to parse or decrypt response:', parseError)

      // Log the error
      await query(
        `INSERT INTO payment_logs (donation_id, log_type, status, message, raw_data)
         VALUES (?, 'GATEWAY_RESPONSE', 'ERROR', ?, ?)`,
        [insertId, parseError instanceof Error ? parseError.message : 'Unknown error', responseText]
      )

      throw new Error('Invalid response from payment gateway')
    }

  } catch (error) {
    console.error('Payment initiation error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid donation data',
        details: error.errors
      })
    }

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Payment initiation failed'
    })
  }
})

export { router as paymentRoutes }