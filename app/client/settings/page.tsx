"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Upload } from "lucide-react"

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#1E1E1E] border border-[#2a2a2a] rounded-lg p-1">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-[#6E00FF]">
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-[#6E00FF]">
            Account
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-[#6E00FF]"
          >
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-4">
          <Card className="bg-[#1E1E1E] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information and how others see you on the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="space-y-4">
                  <div className="text-sm font-medium">Profile Picture</div>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-[#2a2a2a] flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                          <img
                            src={profileImage || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-[#6E00FF]">A</span>
                        )}
                      </div>
                      <label
                        htmlFor="profile-upload"
                        className="absolute -bottom-2 -right-2 bg-[#6E00FF] rounded-full p-1.5 cursor-pointer hover:bg-[#5500CC] transition-colors"
                      >
                        <Upload className="h-4 w-4" />
                        <span className="sr-only">Upload profile picture</span>
                      </label>
                      <input
                        id="profile-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (e) => {
                              setProfileImage(e.target?.result as string)
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Upload a new profile picture</p>
                      <p>JPG, PNG or GIF. 1MB max.</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Alex Johnson" className="bg-[#121212] border-[#2a2a2a]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="alexdev123" className="bg-[#121212] border-[#2a2a2a]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      className="min-h-24 bg-[#121212] border-[#2a2a2a]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio URL</Label>
                  <Input
                    id="portfolio"
                    placeholder="https://yourportfolio.com"
                    className="bg-[#121212] border-[#2a2a2a]"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input id="twitter" placeholder="@username" className="bg-[#121212] border-[#2a2a2a]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input id="github" placeholder="username" className="bg-[#121212] border-[#2a2a2a]" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#6E00FF] hover:bg-[#5500CC] transition-all duration-200">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account" className="mt-4">
          <Card className="bg-[#1E1E1E] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Update your account settings and security preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Address</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="alex@example.com"
                      className="bg-[#121212] border-[#2a2a2a]"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#6E00FF]">
                      Change Email
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" className="bg-[#121212] border-[#2a2a2a]" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" className="bg-[#121212] border-[#2a2a2a]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" className="bg-[#121212] border-[#2a2a2a]" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#6E00FF]">
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Protect your account with 2FA</div>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Delete Account</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all of your content.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <Card className="bg-[#1E1E1E] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Sales and Purchases</div>
                      <div className="text-sm text-muted-foreground">
                        Receive emails when someone purchases your template
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Comments and Reviews</div>
                      <div className="text-sm text-muted-foreground">
                        Receive emails when someone comments on your template
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Affiliate Activity</div>
                      <div className="text-sm text-muted-foreground">Receive emails about your affiliate earnings</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Marketing and Promotions</div>
                      <div className="text-sm text-muted-foreground">
                        Receive emails about new features and special offers
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Platform Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Dashboard Notifications</div>
                      <div className="text-sm text-muted-foreground">Show notifications in your dashboard</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Browser Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive browser notifications when you're online
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#6E00FF] hover:bg-[#5500CC] transition-all duration-200">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
