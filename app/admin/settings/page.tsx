'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Save } from 'lucide-react'

interface SiteSettings {
  site_name: string
  site_tagline: string
  temple_address: string
  temple_phone: string
  temple_email: string
  facebook_url: string
  instagram_url: string
  twitter_url: string
  youtube_url: string
  google_maps_embed: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: '',
    site_tagline: '',
    temple_address: '',
    temple_phone: '',
    temple_email: '',
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
    youtube_url: '',
    google_maps_embed: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      const data = await response.json()
      
      // Convert array of settings to object
      const settingsObj: any = {}
      data.settings.forEach((setting: any) => {
        settingsObj[setting.key] = setting.value
      })
      
      setSettings(settingsObj)
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Failed to fetch settings')
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        toast.success('Settings saved successfully')
      } else {
        toast.error('Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-prata text-[#E67A00]">Site Settings</h1>
          <p className="text-gray-600 mt-2">Manage your website configuration</p>
        </div>
        <Button
          onClick={saveSettings}
          disabled={saving}
          className="bg-[#E67A00] hover:bg-[#d16e00]"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="site_name">Site Name</Label>
                <Input
                  id="site_name"
                  value={settings.site_name}
                  onChange={(e) => handleInputChange('site_name', e.target.value)}
                  placeholder="Shri Jagannath Temple"
                />
              </div>
              <div>
                <Label htmlFor="site_tagline">Site Tagline</Label>
                <Input
                  id="site_tagline"
                  value={settings.site_tagline}
                  onChange={(e) => handleInputChange('site_tagline', e.target.value)}
                  placeholder="Sacred Abode of Lord Jagannath"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="temple_address">Temple Address</Label>
                <Textarea
                  id="temple_address"
                  value={settings.temple_address}
                  onChange={(e) => handleInputChange('temple_address', e.target.value)}
                  placeholder="Enter temple address"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="temple_phone">Phone Number</Label>
                <Input
                  id="temple_phone"
                  value={settings.temple_phone}
                  onChange={(e) => handleInputChange('temple_phone', e.target.value)}
                  placeholder="+91 6752 222002"
                />
              </div>
              <div>
                <Label htmlFor="temple_email">Email Address</Label>
                <Input
                  id="temple_email"
                  type="email"
                  value={settings.temple_email}
                  onChange={(e) => handleInputChange('temple_email', e.target.value)}
                  placeholder="info@isanpurjagannath.in"
                />
              </div>
              <div>
                <Label htmlFor="google_maps_embed">Google Maps Embed URL</Label>
                <Textarea
                  id="google_maps_embed"
                  value={settings.google_maps_embed}
                  onChange={(e) => handleInputChange('google_maps_embed', e.target.value)}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <Input
                  id="facebook_url"
                  value={settings.facebook_url}
                  onChange={(e) => handleInputChange('facebook_url', e.target.value)}
                  placeholder="https://facebook.com/your-page"
                />
              </div>
              <div>
                <Label htmlFor="instagram_url">Instagram URL</Label>
                <Input
                  id="instagram_url"
                  value={settings.instagram_url}
                  onChange={(e) => handleInputChange('instagram_url', e.target.value)}
                  placeholder="https://instagram.com/your-account"
                />
              </div>
              <div>
                <Label htmlFor="twitter_url">Twitter URL</Label>
                <Input
                  id="twitter_url"
                  value={settings.twitter_url}
                  onChange={(e) => handleInputChange('twitter_url', e.target.value)}
                  placeholder="https://twitter.com/your-account"
                />
              </div>
              <div>
                <Label htmlFor="youtube_url">YouTube URL</Label>
                <Input
                  id="youtube_url"
                  value={settings.youtube_url}
                  onChange={(e) => handleInputChange('youtube_url', e.target.value)}
                  placeholder="https://youtube.com/your-channel"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}