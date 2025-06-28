import { prisma } from '@/lib/prisma'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import DailyDarshan from '@/components/sections/DailyDarshan'
import Deities from '@/components/sections/Deities'
import Donation from '@/components/sections/Donation'
import Events from '@/components/sections/Events'
import Gallery from '@/components/sections/Gallery'

async function getHomePage() {
  try {
    const page = await prisma.page.findUnique({
      where: { 
        slug: '/',
        published: true
      }
    })
    return page
  } catch (error) {
    console.error('Error fetching home page:', error)
    return null
  }
}

export default async function Home() {
  const page = await getHomePage()

  // If we have custom content from the database, use it
  if (page && page.content && page.content.trim()) {
    return (
      <main className="min-h-screen">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </main>
    )
  }

  // Otherwise, use the default component-based layout
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <DailyDarshan />
      <Deities />
      <Donation />
      <Events />
      <Gallery />
    </main>
  )
}