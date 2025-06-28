'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

interface Page {
  id: string
  title: string
  slug: string
  content: string
  layoutType: string
  showInNav: boolean
  navOrder: number
  published: boolean
  metaTitle?: string
  metaDescription?: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
}

export default function EditPagePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [formData, setFormData] = useState<Page | null>(null)

  useEffect(() => {
    fetchPage()
  }, [params.id])

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/admin/pages/${params.id}`)
      if (response.ok) {
        const page = await response.json()
        setFormData(page)
      } else {
        toast.error('Page not found')
        router.push('/admin/pages')
      }
    } catch (error) {
      console.error('Error fetching page:', error)
      toast.error('Failed to fetch page')
    } finally {
      setPageLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setLoading(true)

    try {
      const response = await fetch(`/api/admin/pages/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Page updated successfully')
        router.push('/admin/pages')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update page')
      }
    } catch (error) {
      console.error('Error updating page:', error)
      toast.error('Failed to update page')
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!formData) {
    return <div>Page not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/admin/pages">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pages
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-prata text-[#E67A00]">Edit Page</h1>
          <p className="text-gray-600 mt-2">Update page content and settings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => prev ? { ...prev, title: e.target.value } : null)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => prev ? { ...prev, slug: e.target.value } : null)}
                    placeholder="/page-url"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => prev ? { ...prev, content: e.target.value } : null)}
                    rows={15}
                    placeholder="Enter your page content here..."
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    You can use HTML tags for formatting
                  </p>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="seo" className="w-full">
              <TabsList>
                <TabsTrigger value="seo">SEO Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="seo">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO & Meta Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="metaTitle">Meta Title</Label>
                      <Input
                        id="metaTitle"
                        value={formData.metaTitle || ''}
                        onChange={(e) => setFormData(prev => prev ? { ...prev, metaTitle: e.target.value } : null)}
                        placeholder="SEO title for search engines"
                      />
                    </div>
                    <div>
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        value={formData.metaDescription || ''}
                        onChange={(e) => setFormData(prev => prev ? { ...prev, metaDescription: e.target.value } : null)}
                        placeholder="Brief description for search engines"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="keywords">Keywords</Label>
                      <Input
                        id="keywords"
                        value={formData.keywords || ''}
                        onChange={(e) => setFormData(prev => prev ? { ...prev, keywords: e.target.value } : null)}
                        placeholder="Comma-separated keywords"
                      />
                    </div>
                    <div>
                      <Label htmlFor="canonicalUrl">Canonical URL</Label>
                      <Input
                        id="canonicalUrl"
                        value={formData.canonicalUrl || ''}
                        onChange={(e) => setFormData(prev => prev ? { ...prev, canonicalUrl: e.target.value } : null)}
                        placeholder="https://example.com/page"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="layoutType">Layout Type</Label>
                  <Select
                    value={formData.layoutType}
                    onValueChange={(value) => setFormData(prev => prev ? { ...prev, layoutType: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FULL">Full Width</SelectItem>
                      <SelectItem value="BOXED">Boxed</SelectItem>
                      <SelectItem value="SIDEBAR">With Sidebar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="navOrder">Navigation Order</Label>
                  <Input
                    id="navOrder"
                    type="number"
                    value={formData.navOrder}
                    onChange={(e) => setFormData(prev => prev ? { ...prev, navOrder: parseInt(e.target.value) || 0 } : null)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showInNav">Show in Navigation</Label>
                  <Switch
                    id="showInNav"
                    checked={formData.showInNav}
                    onCheckedChange={(checked) => setFormData(prev => prev ? { ...prev, showInNav: checked } : null)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData(prev => prev ? { ...prev, published: checked } : null)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1 bg-[#E67A00] hover:bg-[#d16e00]"
                disabled={loading}
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Updating...' : 'Update Page'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}