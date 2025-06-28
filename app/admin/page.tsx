'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  FileText, 
  Calendar, 
  Heart, 
  Mail, 
  Image as ImageIcon,
  TrendingUp,
  Eye
} from 'lucide-react'

interface DashboardStats {
  totalPages: number
  totalEvents: number
  totalDonations: number
  totalMessages: number
  totalMedia: number
  totalSubscribers: number
  recentDonationAmount: number
  monthlyDonations: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-prata text-[#E67A00]">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Pages',
      value: stats?.totalPages || 0,
      icon: FileText,
      description: 'Published pages',
      color: 'text-blue-600'
    },
    {
      title: 'Events',
      value: stats?.totalEvents || 0,
      icon: Calendar,
      description: 'Upcoming events',
      color: 'text-green-600'
    },
    {
      title: 'Donations',
      value: stats?.totalDonations || 0,
      icon: Heart,
      description: 'Total donations',
      color: 'text-red-600'
    },
    {
      title: 'Messages',
      value: stats?.totalMessages || 0,
      icon: Mail,
      description: 'Contact messages',
      color: 'text-purple-600'
    },
    {
      title: 'Media Files',
      value: stats?.totalMedia || 0,
      icon: ImageIcon,
      description: 'Uploaded files',
      color: 'text-yellow-600'
    },
    {
      title: 'Subscribers',
      value: stats?.totalSubscribers || 0,
      icon: Users,
      description: 'Newsletter subscribers',
      color: 'text-indigo-600'
    },
    {
      title: 'Recent Donation',
      value: `₹${stats?.recentDonationAmount || 0}`,
      icon: TrendingUp,
      description: 'Latest donation',
      color: 'text-green-600'
    },
    {
      title: 'Monthly Total',
      value: `₹${stats?.monthlyDonations || 0}`,
      icon: Eye,
      description: 'This month donations',
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-prata text-[#E67A00]">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the temple admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/admin/pages/new"
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileText className="h-6 w-6 text-[#E67A00] mb-2" />
                <div className="font-medium">New Page</div>
                <div className="text-sm text-gray-600">Create a new page</div>
              </a>
              <a
                href="/admin/events/new"
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Calendar className="h-6 w-6 text-[#E67A00] mb-2" />
                <div className="font-medium">New Event</div>
                <div className="text-sm text-gray-600">Add an event</div>
              </a>
              <a
                href="/admin/media"
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ImageIcon className="h-6 w-6 text-[#E67A00] mb-2" />
                <div className="font-medium">Media Library</div>
                <div className="text-sm text-gray-600">Manage files</div>
              </a>
              <a
                href="/admin/donations"
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Heart className="h-6 w-6 text-[#E67A00] mb-2" />
                <div className="font-medium">Donations</div>
                <div className="text-sm text-gray-600">View donations</div>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New donation received</p>
                  <p className="text-xs text-gray-600">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Page updated</p>
                  <p className="text-xs text-gray-600">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New contact message</p>
                  <p className="text-xs text-gray-600">3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}