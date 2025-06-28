import { seedDatabase } from '../lib/seed-data'

async function main() {
  try {
    await seedDatabase()
    console.log('✅ Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

main()