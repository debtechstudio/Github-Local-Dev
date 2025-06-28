import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Health Services | Sri Jagannath Temple",
  description: "Free health services and medical camps provided by Sri Jagannath Temple for the community.",
}

export default function HealthServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 