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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Search, Eye, Archive, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'

interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  isRead: boolean
  isArchived: boolean
  createdAt: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [search])

  const fetchMessages = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      
      const response = await fetch(`/api/admin/messages?${params}`)
      const data = await response.json()
      setMessages(data.messages)
    } catch (error) {
      console.error('Error fetching messages:', error)
      toast.error('Failed to fetch messages')
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isRead: true })
      })

      if (response.ok) {
        fetchMessages()
      }
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  const archiveMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isArchived: true })
      })

      if (response.ok) {
        toast.success('Message archived')
        fetchMessages()
      }
    } catch (error) {
      console.error('Error archiving message:', error)
      toast.error('Failed to archive message')
    }
  }

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    if (!message.isRead) {
      markAsRead(message.id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-prata text-[#E67A00]">Contact Messages</h1>
          <p className="text-gray-600 mt-2">Manage contact form submissions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id} className={!message.isRead ? 'bg-blue-50' : ''}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{message.name}</div>
                        <div className="text-sm text-gray-600">{message.email}</div>
                        {message.phone && (
                          <div className="text-sm text-gray-600">{message.phone}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{message.subject}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Badge variant={message.isRead ? 'secondary' : 'default'}>
                          {message.isRead ? 'Read' : 'Unread'}
                        </Badge>
                        {message.isArchived && (
                          <Badge variant="outline">Archived</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {format(new Date(message.createdAt), 'MMM dd, yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewMessage(message)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Message from {message.name}</DialogTitle>
                              <DialogDescription>
                                Received on {format(new Date(message.createdAt), 'MMMM dd, yyyy at HH:mm')}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <strong>Subject:</strong> {message.subject}
                              </div>
                              <div>
                                <strong>Email:</strong> {message.email}
                              </div>
                              {message.phone && (
                                <div>
                                  <strong>Phone:</strong> {message.phone}
                                </div>
                              )}
                              <div>
                                <strong>Message:</strong>
                                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                                  {message.message}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => window.open(`mailto:${message.email}?subject=Re: ${message.subject}`)}
                                >
                                  <Mail className="h-4 w-4 mr-2" />
                                  Reply via Email
                                </Button>
                                {!message.isArchived && (
                                  <Button
                                    variant="outline"
                                    onClick={() => archiveMessage(message.id)}
                                  >
                                    <Archive className="h-4 w-4 mr-2" />
                                    Archive
                                  </Button>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {!message.isArchived && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => archiveMessage(message.id)}
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
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