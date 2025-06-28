'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Heart,
  Mail,
  Image as ImageIcon,
  Users,
  Settings,
  Palette,
  Globe,
  Camera,
  Send
} from 'lucide-react'
import Image from 'next/image'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'Gallery', href: '/admin/gallery', icon: Camera },
  { name: 'Donations', href: '/admin/donations', icon: Heart },
  { name: 'Messages', href: '/admin/messages', icon: Mail },
  { name: 'Newsletter', href: '/admin/newsletter', icon: Send },
  { name: 'Subscribers', href: '/admin/subscribers', icon: Users },
  { name: 'Theme Settings', href: '/admin/theme', icon: Palette },
  { name: 'Site Settings', href: '/admin/settings', icon: Globe },
  { name: 'Account', href: '/admin/account', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Temple Logo"
              width={40}
              height={40}
            />
            <div>
              <div className="font-prata text-[#E67A00] text-lg">Temple Admin</div>
              <div className="text-xs text-gray-600">Content Management</div>
            </div>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? 'bg-[#FFF9F0] text-[#E67A00]'
                          : 'text-gray-700 hover:text-[#E67A00] hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      )}
                    >
                      <item.icon
                        className={cn(
                          pathname === item.href ? 'text-[#E67A00]' : 'text-gray-400 group-hover:text-[#E67A00]',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}