'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Download, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'

interface Donation {
  id: string
  merchantTransactionId: string
  getepayTransactionId?: string
  amount: number
  donorName: string
  donorEmail: string
  donorPhone: string
  purpose?: string
  paymentStatus: string
  paymentMode?: string
  transactionDate?: string
  createdAt: string
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchDonations()
  }, [search, statusFilter])

  const fetchDonations = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (statusFilter !== 'all') params.append('status', statusFilter)
      
      const response = await fetch(`/api/admin/donations?${params}`)
      const data = await response.json()
      setDonations(data.donations)
    } catch (error) {
      console.error('Error fetching donations:', error)
      toast.error('Failed to fetch donations')
    } finally {
      setLoading(false)
    }
  }

  const exportDonations = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (statusFilter !== 'all') params.append('status', statusFilter)
      params.append('export', 'true')
      
      const response = await fetch(`/api/admin/donations?${params}`)
      const blob = await response.blob()
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `donations-${format(new Date(), 'yyyy-MM-dd')}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success('Donations exported successfully')
    } catch (error) {
      console.error('Error exporting donations:', error)
      toast.error('Failed to export donations')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <Badge className="bg-green-100 text-green-800">Success</Badge>
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'FAILED':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-prata text-[#E67A00]">Donations</h1>
          <p className="text-gray-600 mt-2">Track and manage temple donations</p>
        </div>
        <Button onClick={exportDonations} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Donations</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search donations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="SUCCESS">Success</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Transaction ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{donation.donorName}</div>
                        <div className="text-sm text-gray-600">{donation.donorEmail}</div>
                        <div className="text-sm text-gray-600">{donation.donorPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ₹{donation.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {donation.purpose || 'General Donation'}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(donation.paymentStatus)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {donation.paymentMode || '-'}
                    </TableCell>
                    <TableCell className="text-sm">
                      {donation.transactionDate 
                        ? format(new Date(donation.transactionDate), 'MMM dd, yyyy HH:mm')
                        : format(new Date(donation.createdAt), 'MMM dd, yyyy HH:mm')
                      }
                    </TableCell>
                    <TableCell className="text-sm font-mono">
                      {donation.getepayTransactionId || donation.merchantTransactionId}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}