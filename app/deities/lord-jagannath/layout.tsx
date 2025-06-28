import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lord Jagannath | Sri Jagannath Temple",
  description: "Learn about Lord Jagannath, the Lord of the Universe and the presiding deity of the Jagannath Temple.",
}

export default function JagannathLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 