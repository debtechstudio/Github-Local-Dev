import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const isExport = searchParams.get('export') === 'true'

    let where: any = {}

    if (search) {
      where.OR = [
        { donorName: { contains: search } },
        { donorEmail: { contains: search } },
        { donorPhone: { contains: search } },
        { merchantTransactionId: { contains: search } },
        { getepayTransactionId: { contains: search } }
      ]
    }

    if (status) {
      where.paymentStatus = status
    }

    if (isExport) {
      // Export all matching records as CSV
      const donations = await prisma.donation.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      })

      const csvHeaders = [
        'Date',
        'Donor Name',
        'Email',
        'Phone',
        'Amount',
        'Purpose',
        'Status',
        'Payment Mode',
        'Transaction ID',
        'Merchant Transaction ID'
      ].join(',')

      const csvRows = donations.map(donation => [
        donation.transactionDate || donation.createdAt,
        donation.donorName,
        donation.donorEmail,
        donation.donorPhone,
        donation.amount,
        donation.purpose || 'General Donation',
        donation.paymentStatus,
        donation.paymentMode || '',
        donation.getepayTransactionId || '',
        donation.merchantTransactionId
      ].map(field => `"${field}"`).join(','))

      const csv = [csvHeaders, ...csvRows].join('\n')

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="donations.csv"'
        }
      })
    }

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.donation.count({ where })
    ])

    return NextResponse.json({
      donations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching donations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    )
  }
}