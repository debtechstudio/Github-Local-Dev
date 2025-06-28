'use client'

import { useState } from 'react'
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

export default function NewPagePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    layoutType: 'FULL',
    showInNav: true,
    navOrder: 0,
    published: true,
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogImage: '',
    canonicalUrl: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Page created successfully')
        router.push('/admin/pages')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to create page')
      }
    } catch (error) {
      console.error('Error creating page:', error)
      toast.error('Failed to create page')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    const slug = '/' + title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    setFormData(prev => ({ ...prev, slug }))
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
          <h1 className="text-3xl font-prata text-[#E67A00]">New Page</h1>
          <p className="text-gray-600 mt-2">Create a new page for your website</p>
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
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, title: e.target.value }))
                      if (!formData.slug) {
                        generateSlug(e.target.value)
                      }
                    }}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="/page-url"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
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
                        value={formData.metaTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                        placeholder="SEO title for search engines"
                      />
                    </div>
                    <div>
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        value={formData.metaDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                        placeholder="Brief description for search engines"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="keywords">Keywords</Label>
                      <Input
                        id="keywords"
                        value={formData.keywords}
                        onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                        placeholder="Comma-separated keywords"
                      />
                    </div>
                    <div>
                      <Label htmlFor="canonicalUrl">Canonical URL</Label>
                      <Input
                        id="canonicalUrl"
                        value={formData.canonicalUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
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
                    onValueChange={(value) => setFormData(prev => ({ ...prev, layoutType: value }))}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, navOrder: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showInNav">Show in Navigation</Label>
                  <Switch
                    id="showInNav"
                    checked={formData.showInNav}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showInNav: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
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
                {loading ? 'Creating...' : 'Create Page'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}