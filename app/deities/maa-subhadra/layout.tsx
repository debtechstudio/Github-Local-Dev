import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Maa Subhadra | Sri Jagannath Temple",
  description: "Learn about Maa Subhadra, the divine sister of Lord Jagannath and Lord Balabhadra.",
}

export default function SubhadraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 