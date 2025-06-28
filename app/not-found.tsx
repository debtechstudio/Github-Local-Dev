import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
  title: "Page Not Found | Sri Jagannath Temple",
  description: "The page you're looking for doesn't exist.",
}

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <div className="container-custom flex items-center justify-center py-32">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-[#E67A00]">404</h1>
          <p className="mt-4 text-xl text-gray-600">Page not found</p>
          <p className="mt-2 text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
          <Button asChild className="mt-8">
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
} 