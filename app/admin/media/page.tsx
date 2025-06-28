'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Upload, Search, Trash2, Edit, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface MediaFile {
  id: string
  filename: string
  originalName: string
  url: string
  mimeType: string
  size: number
  altText?: string
  tags?: string
  uploadedAt: string
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [editData, setEditData] = useState({ altText: '', tags: '' })

  useEffect(() => {
    fetchMedia()
  }, [search])

  const fetchMedia = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      
      const response = await fetch(`/api/admin/media?${params}`)
      const data = await response.json()
      setMedia(data.media)
    } catch (error) {
      console.error('Error fetching media:', error)
      toast.error('Failed to fetch media')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/admin/media/upload', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }
      }

      toast.success('Files uploaded successfully')
      fetchMedia()
    } catch (error) {
      console.error('Error uploading files:', error)
      toast.error('Failed to upload files')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  const updateMedia = async () => {
    if (!selectedFile) return

    try {
      const response = await fetch(`/api/admin/media/${selectedFile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editData)
      })

      if (response.ok) {
        toast.success('Media updated successfully')
        setSelectedFile(null)
        fetchMedia()
      } else {
        toast.error('Failed to update media')
      }
    } catch (error) {
      console.error('Error updating media:', error)
      toast.error('Failed to update media')
    }
  }

  const deleteMedia = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Media deleted successfully')
        fetchMedia()
      } else {
        toast.error('Failed to delete media')
      }
    } catch (error) {
      console.error('Error deleting media:', error)
      toast.error('Failed to delete media')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-prata text-[#E67A00]">Media Library</h1>
          <p className="text-gray-600 mt-2">Manage your uploaded files and images</p>
        </div>
        <div className="flex gap-2">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <Button
            asChild
            className="bg-[#E67A00] hover:bg-[#d16e00]"
            disabled={uploading}
          >
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Files'}
            </label>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Media</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {media.map((file) => (
                <div key={file.id} className="group relative">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {file.mimeType.startsWith('image/') ? (
                      <Image
                        src={file.url}
                        alt={file.altText || file.originalName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setSelectedFile(file)
                            setEditData({
                              altText: file.altText || '',
                              tags: file.tags || ''
                            })
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Media</DialogTitle>
                          <DialogDescription>
                            Update the alt text and tags for this file
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="altText">Alt Text</Label>
                            <Input
                              id="altText"
                              value={editData.altText}
                              onChange={(e) => setEditData(prev => ({ ...prev, altText: e.target.value }))}
                              placeholder="Describe this image"
                            />
                          </div>
                          <div>
                            <Label htmlFor="tags">Tags</Label>
                            <Textarea
                              id="tags"
                              value={editData.tags}
                              onChange={(e) => setEditData(prev => ({ ...prev, tags: e.target.value }))}
                              placeholder="Comma-separated tags"
                              rows={3}
                            />
                          </div>
                          <Button onClick={updateMedia} className="w-full">
                            Update Media
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMedia(file.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium truncate">{file.originalName}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatFileSize(file.size)}</span>
                      <Badge variant="outline" className="text-xs">
                        {file.mimeType.split('/')[1].toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}