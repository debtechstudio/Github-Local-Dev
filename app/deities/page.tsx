import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Deities from '@/components/sections/Deities'

export const metadata: Metadata = {
  title: "The Holy Trinity | Sri Jagannath Temple",
  description: "Learn about Lord Jagannath, Maa Subhadra, and Lord Balabhadra - the divine trinity of the Jagannath Temple.",
}

export default function DeitiesPage() {
  return (
    <main className="min-h-screen">
      <div className="pt-20 pb-16">
        <div className="container-custom">
          <Deities />
        </div>
      </div>
    </main>
  )
}
