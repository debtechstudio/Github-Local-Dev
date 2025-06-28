import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getPage(slug: string) {
  try {
    const page = await prisma.page.findUnique({
      where: { 
        slug: slug,
        published: true
      }
    })
    return page
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = '/' + params.slug.join('/')
  const page = await getPage(slug)

  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    }
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || undefined,
    keywords: page.keywords || undefined,
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || undefined,
      images: page.ogImage ? [page.ogImage] : undefined,
    },
    alternates: {
      canonical: page.canonicalUrl || undefined
    }
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const slug = '/' + params.slug.join('/')
  const page = await getPage(slug)

  if (!page) {
    notFound()
  }

  const getLayoutClasses = () => {
    switch (page.layoutType) {
      case 'BOXED':
        return 'max-w-4xl mx-auto'
      case 'SIDEBAR':
        return 'grid lg:grid-cols-4 gap-8'
      default:
        return 'w-full'
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container-custom py-8">
        <div className={getLayoutClasses()}>
          {page.layoutType === 'SIDEBAR' ? (
            <>
              <div className="lg:col-span-3">
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              </div>
              <div className="lg:col-span-1">
                <div className="bg-[#FFF9F0] p-6 rounded-xl">
                  <h3 className="font-prata text-[#E67A00] mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="/darshan" className="text-[#6D6D6D] hover:text-[#E67A00]">Daily Darshan</a></li>
                    <li><a href="/events" className="text-[#6D6D6D] hover:text-[#E67A00]">Events</a></li>
                    <li><a href="/donations" className="text-[#6D6D6D] hover:text-[#E67A00]">Donate</a></li>
                    <li><a href="/contact" className="text-[#6D6D6D] hover:text-[#E67A00]">Contact</a></li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const pages = await prisma.page.findMany({
      where: { published: true },
      select: { slug: true }
    })

    return pages
      .filter(page => page.slug !== '/')
      .map(page => ({
        slug: page.slug.split('/').filter(Boolean)
      }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}