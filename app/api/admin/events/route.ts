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
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    const where = search
      ? {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } }
          ]
        }
      : {}

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { eventDate: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          bannerImage: {
            select: {
              id: true,
              url: true,
              altText: true
            }
          }
        }
      }),
      prisma.event.count({ where })
    ])

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    const event = await prisma.event.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description || '',
        eventDate: new Date(data.eventDate),
        bannerImageId: data.bannerImageId,
        showOnHomepage: data.showOnHomepage ?? false,
        published: data.published ?? true,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription
      },
      include: {
        bannerImage: true
      }
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}