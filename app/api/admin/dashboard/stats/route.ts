import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get current month start and end dates
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    const [
      totalPages,
      totalEvents,
      totalDonations,
      totalMessages,
      totalMedia,
      totalSubscribers,
      recentDonation,
      monthlyDonations
    ] = await Promise.all([
      prisma.page.count({ where: { published: true } }),
      prisma.event.count({ where: { published: true } }),
      prisma.donation.count(),
      prisma.contactMessage.count({ where: { isArchived: false } }),
      prisma.media.count(),
      prisma.subscriber.count({ where: { isActive: true } }),
      prisma.donation.findFirst({
        where: { paymentStatus: 'SUCCESS' },
        orderBy: { createdAt: 'desc' },
        select: { amount: true }
      }),
      prisma.donation.aggregate({
        where: {
          paymentStatus: 'SUCCESS',
          createdAt: {
            gte: monthStart,
            lte: monthEnd
          }
        },
        _sum: { amount: true }
      })
    ])

    return NextResponse.json({
      totalPages,
      totalEvents,
      totalDonations,
      totalMessages,
      totalMedia,
      totalSubscribers,
      recentDonationAmount: recentDonation?.amount || 0,
      monthlyDonations: monthlyDonations._sum.amount || 0
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}