import { Router } from 'express'
import { query } from '../lib/mysql'

const router = Router()

// Dashboard stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    // Get current month start and end dates
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    const [
      pagesResult,
      eventsResult,
      donationsResult,
      messagesResult,
      mediaResult,
      subscribersResult,
      recentDonationResult,
      monthlyDonationsResult
    ] = await Promise.all([
      query('SELECT COUNT(*) as count FROM pages WHERE published = 1'),
      query('SELECT COUNT(*) as count FROM events WHERE published = 1'),
      query('SELECT COUNT(*) as count FROM donations'),
      query('SELECT COUNT(*) as count FROM contact_messages WHERE is_archived = 0'),
      query('SELECT COUNT(*) as count FROM media'),
      query('SELECT COUNT(*) as count FROM subscribers WHERE is_active = 1'),
      query('SELECT amount FROM donations WHERE payment_status = "SUCCESS" ORDER BY created_at DESC LIMIT 1'),
      query('SELECT SUM(amount) as total FROM donations WHERE payment_status = "SUCCESS" AND created_at >= ? AND created_at <= ?', [monthStart, monthEnd])
    ])

    res.json({
      totalPages: (pagesResult as any)[0]?.count || 0,
      totalEvents: (eventsResult as any)[0]?.count || 0,
      totalDonations: (donationsResult as any)[0]?.count || 0,
      totalMessages: (messagesResult as any)[0]?.count || 0,
      totalMedia: (mediaResult as any)[0]?.count || 0,
      totalSubscribers: (subscribersResult as any)[0]?.count || 0,
      recentDonationAmount: (recentDonationResult as any)[0]?.amount || 0,
      monthlyDonations: (monthlyDonationsResult as any)[0]?.total || 0
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    res.status(500).json({ error: 'Failed to fetch dashboard stats' })
  }
})

export { router as adminRoutes }