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
            { slug: { contains: search } }
          ]
        }
      : {}

    const [pages, total] = await Promise.all([
      prisma.page.findMany({
        where,
        orderBy: [
          { navOrder: 'asc' },
          { createdAt: 'desc' }
        ],
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          layoutType: true,
          showInNav: true,
          navOrder: true,
          published: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.page.count({ where })
    ])

    return NextResponse.json({
      pages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
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

    // Ensure slug starts with /
    if (!data.slug.startsWith('/')) {
      data.slug = '/' + data.slug
    }

    const page = await prisma.page.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content || '',
        layoutType: data.layoutType || 'FULL',
        showInNav: data.showInNav ?? true,
        navOrder: data.navOrder || 0,
        published: data.published ?? true,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
        ogImage: data.ogImage,
        canonicalUrl: data.canonicalUrl
      }
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}