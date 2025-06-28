import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export async function seedDatabase() {
  try {
    // Create super admin user
    const hashedPassword = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD || 'admin@123', 12)
    
    await prisma.user.upsert({
      where: { email: process.env.SUPERADMIN_EMAIL || 'admin@temple.com' },
      update: {},
      create: {
        email: process.env.SUPERADMIN_EMAIL || 'admin@temple.com',
        name: process.env.SUPERADMIN_NAME || 'Temple Super Admin',
        password: hashedPassword,
        role: 'SUPERADMIN'
      }
    })

    // Seed existing pages
    const pages = [
      {
        title: 'Home',
        slug: '/',
        content: `<div class="min-h-screen">
          <section class="min-h-screen bg-fixed bg-cover bg-center relative isolate flex items-center text-center pt-32" style="background-image: url(/images/hero-slide-1.jpg)">
            <div class="absolute inset-0 bg-black/50 -z-10"></div>
            <div class="container-custom">
              <h1 class="text-3xl md:text-5xl lg:text-6xl font-prata mb-6 leading-tight text-white drop-shadow-lg">
                Experience the Divine Presence of Lord Jagannath
              </h1>
              <p class="text-lg md:text-xl mb-8 text-white opacity-90 max-w-3xl mx-auto font-medium">
                Visit the sacred abode of Lord Jagannath, Balabhadra, and Subhadra in the holy city of Isnapur
              </p>
            </div>
          </section>
        </div>`,
        layoutType: 'FULL',
        showInNav: true,
        navOrder: 1,
        metaTitle: 'Shri Jagannath Temple - Isnapur | Sacred Abode of Lord Jagannath',
        metaDescription: 'Visit the sacred Shri Jagannath Temple in Isnapur, Odisha. Experience divine darshan, participate in festivals, and contribute to temple activities.'
      },
      {
        title: 'About Temple',
        slug: '/about',
        content: `<div class="pt-20 pb-16">
          <div class="container-custom">
            <div class="max-w-4xl mx-auto">
              <div class="text-center mb-12">
                <h1 class="text-3xl md:text-4xl font-prata text-[#E67A00] mb-6">
                  Lord Jagannatha of Isnapur
                </h1>
                <p class="text-xl text-[#1E1E24] font-prata">
                  The Supreme Divine Manifestation in the Heart of Telangana
                </p>
              </div>
              <p class="text-lg text-[#6D6D6D] leading-relaxed mb-8">
                Lord Jagannatha, as His very name signifies, is the Lord of the Universe (Jagat = Universe; Natha = Lord). He is lovingly revered by devotees as Mahaprabhu (Maha = Great; Prabhu = Lord). In the sacred scriptures of Sanatana Vaidika Dharma (popularly known as Hinduism), He is worshipped as Purushottama, the Supreme Divine Being (Purusha = Divine Being; Uttama = Supreme).
              </p>
            </div>
          </div>
        </div>`,
        layoutType: 'FULL',
        showInNav: true,
        navOrder: 2,
        metaTitle: 'About Lord Jagannath Temple Isnapur | Divine History',
        metaDescription: 'Learn about the sacred history and significance of Lord Jagannath Temple in Isnapur, Telangana.'
      },
      {
        title: 'Daily Darshan',
        slug: '/darshan',
        content: `<div class="pt-20 pb-16">
          <div class="container-custom">
            <div class="max-w-4xl mx-auto">
              <div class="text-center mb-12">
                <h1 class="text-3xl md:text-4xl font-prata text-[#E67A00] mb-6">
                  Lord Jagannath Daily Rituals
                </h1>
                <p class="text-xl text-[#1E1E24] font-prata">
                  Followed at Isnapur Temple, Hyderabad
                </p>
              </div>
              <p class="text-lg text-[#6D6D6D] leading-relaxed mb-8">
                At Isnapur's Lord Jagannath Temple, the daily and periodical rituals are performed with utmost devotion and discipline, reflecting the eternal dignity and grandeur that the Supreme Being rightfully deserves.
              </p>
            </div>
          </div>
        </div>`,
        layoutType: 'FULL',
        showInNav: true,
        navOrder: 3,
        metaTitle: 'Daily Darshan Schedule | Jagannath Temple Isnapur',
        metaDescription: 'View the daily ritual schedule and darshan timings at Sri Jagannath Temple, Isnapur.'
      },
      {
        title: 'Deities',
        slug: '/deities',
        content: `<div class="pt-20 pb-16">
          <div class="container-custom">
            <div class="text-center mb-12">
              <h1 class="text-3xl md:text-4xl font-prata text-[#E67A00] mb-4">
                The Holy Trinity
              </h1>
            </div>
          </div>
        </div>`,
        layoutType: 'FULL',
        showInNav: true,
        navOrder: 4,
        metaTitle: 'The Holy Trinity | Lord Jagannath, Balabhadra, Subhadra',
        metaDescription: 'Learn about the divine trinity of Lord Jagannath, Lord Balabhadra, and Maa Subhadra.'
      },
      {
        title: 'Events',
        slug: '/events',
        content: `<div class="pt-20 pb-16">
          <div class="container-custom">
            <div class="text-center mb-12">
              <h1 class="text-3xl md:text-4xl font-prata text-[#E67A00] mb-6">
                Temple Events & Festivals
              </h1>
            </div>
          </div>
        </div>`,
        layoutType: 'FULL',
        showInNav: true,
        navOrder: 5,
        metaTitle: 'Temple Events & Festivals | Jagannath Temple Isnapur',
        metaDescription: 'Stay updated with upcoming events and festivals at Sri Jagannath Temple, Isnapur.'
      },
      {
        title: 'Gallery',
        slug: '/gallery',
        content: `<div class="pt-20 pb-16">
          <div class="container-custom">
            <div class="text-center mb-12">
              <h1 class="text-3xl md:text-4xl font-prata text-[#E67A00] mb-6">
                Temple Gallery
              </h1>
            </div>
          </div>
        </div>`,
        layoutType: 'FULL',
        showInNav: true,
        navOrder: 6,
        metaTitle: 'Temple Gallery | Photos & Memories',
        metaDescription: 'View beautiful photos and memories from Sri Jagannath Temple, Isnapur.'
      },
      {
        title: 'Annadanam',
        slug: '/annadanam',
        content: `<div class="pt-20 pb-16">
          <div class="container-custom">
            <div class="text-center mb-12">
              <h1 class="text-3xl md:text-4xl font-prata text-[#E67A00] mb-6">
                Annadanam Seva
              </h1>
              <p class="text-xl text-[#1E1E24] font-prata mb-4">
                Serving Food is Serving the Divine
              </p>
            </div>
          </div>
        </div>`,
        layoutType: 'FULL',
        showInNav: false,
        navOrder: 7,
        metaTitle: 'Annadanam Seva | Free Food Service',
        metaDescription: 'Learn about our Annadanam seva - free food service for all devotees at the temple.'
      },
      {
        title: 'Health Services',
        slug: '/health-services',
        content: `<div class="pt-20 pb-16">
          <div class="container-custom">
            <h1 class="text-3xl md:text-4xl font-prata text-[#E67A00] mb-8 text-center">
              Health Services
            </h1>
            <p class="text-lg text-center mb-12 text-muted-foreground">
              Serving the community through free medical care and health camps
            </p>
          </div>
        </div>`,
        layoutType: 'FULL',
        showInNav: false,
        navOrder: 8,
        metaTitle: 'Free Health Services | Medical Camps',
        metaDescription: 'Free health services and medical camps provided by Sri Jagannath Temple for the community.'
      },
      {
        title: 'Contact Us',
        slug: '/contact',
        content: `<div class="pt-20 pb-16">
          <div class="container-custom">
            <h1 class="text-3xl md:text-4xl font-prata text-[#E67A00] mb-8 text-center">
              Contact Us
            </h1>
          </div>
        </div>`,
        layoutType: 'FULL',
        showInNav: true,
        navOrder: 9,
        metaTitle: 'Contact Us | Get in Touch',
        metaDescription: 'Contact Sri Jagannath Temple, Isnapur for any queries or information.'
      }
    ]

    for (const page of pages) {
      await prisma.page.upsert({
        where: { slug: page.slug },
        update: {},
        create: page
      })
    }

    // Seed theme settings
    await prisma.themeSettings.upsert({
      where: { id: 'default' },
      update: {},
      create: {
        id: 'default',
        primaryColor: '#E67A00',
        secondaryColor: '#1A5F1E',
        accentColor: '#D4A017',
        bodyFont: 'Montserrat',
        headingFont: 'Prata',
        logoUrl: '/images/logo.png',
        buttonRadius: '8px',
        containerWidth: '1400px'
      }
    })

    // Seed site settings
    const siteSettings = [
      { key: 'site_name', value: 'Shri Jagannath Temple', type: 'TEXT' },
      { key: 'site_tagline', value: 'Sacred Abode of Lord Jagannath', type: 'TEXT' },
      { key: 'temple_address', value: 'H.No.6-66/9, Isnapur Village, Patancheru (M), Sangareddy (D), Telangana State-502 307', type: 'TEXT' },
      { key: 'temple_phone', value: '+91 6752 222002', type: 'TEXT' },
      { key: 'temple_email', value: 'info@isanpurjagannath.in', type: 'TEXT' },
      { key: 'facebook_url', value: '#', type: 'TEXT' },
      { key: 'instagram_url', value: '#', type: 'TEXT' },
      { key: 'twitter_url', value: '#', type: 'TEXT' },
      { key: 'youtube_url', value: '#', type: 'TEXT' },
      { key: 'google_maps_embed', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.045584353358!2d78.31673571491127!3d17.40180588807039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9428a2a07ae7%3A0x9c2a5a8c6f5e5f5e!2sShri%20Jagannath%20Temple%20Isnapur!5e0!3m2!1sen!2sin!4v1625647892345!5m2!1sen!2sin', type: 'TEXT' }
    ]

    for (const setting of siteSettings) {
      await prisma.siteSettings.upsert({
        where: { key: setting.key },
        update: {},
        create: setting
      })
    }

    // Seed sample events
    const events = [
      {
        title: 'Rath Yatra 2025',
        slug: 'rath-yatra-2025',
        description: 'The grand chariot festival where the deities travel to Gundicha Temple',
        eventDate: new Date('2025-07-07'),
        showOnHomepage: true,
        metaTitle: 'Rath Yatra 2025 | Grand Chariot Festival',
        metaDescription: 'Join us for the grand Rath Yatra festival at Sri Jagannath Temple, Isnapur.'
      },
      {
        title: 'Snana Purnima',
        slug: 'snana-purnima-2025',
        description: 'Annual bathing ceremony of the deities with 108 pots of sacred water',
        eventDate: new Date('2025-06-12'),
        showOnHomepage: true,
        metaTitle: 'Snana Purnima 2025 | Sacred Bathing Ceremony',
        metaDescription: 'Witness the sacred Snana Purnima ceremony at Sri Jagannath Temple, Isnapur.'
      }
    ]

    for (const event of events) {
      await prisma.event.upsert({
        where: { slug: event.slug },
        update: {},
        create: event
      })
    }

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}