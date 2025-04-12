"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, DollarSign, ExternalLink, MousePointer, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample affiliate data
const referrals = [
  {
    id: 1,
    user: "john.doe@example.com",
    date: "Feb 18, 2024",
    purchase: "Dashboard Pro",
    commission: "$10.00",
    status: "Paid",
  },
  {
    id: 2,
    user: "sarah.smith@example.com",
    date: "Feb 15, 2024",
    purchase: "E-commerce Kit",
    commission: "$12.00",
    status: "Pending",
  },
  {
    id: 3,
    user: "mike.johnson@example.com",
    date: "Feb 10, 2024",
    purchase: "Blog System",
    commission: "$8.00",
    status: "Paid",
  },
  {
    id: 4,
    user: "emily.wilson@example.com",
    date: "Feb 5, 2024",
    purchase: "Landing Page Builder",
    commission: "$7.00",
    status: "Pending",
  },
  {
    id: 5,
    user: "david.brown@example.com",
    date: "Jan 28, 2024",
    purchase: "Portfolio Template",
    commission: "$6.00",
    status: "Paid",
  },
]

export default function AffiliatePage() {
  const [copied, setCopied] = useState(false)
  const affiliateLink = "https://quickui.com/ref/alexdev123"

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Affiliate Program</h2>
        <p className="text-muted-foreground">Earn commission by referring new customers to QuickUI.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-[#6E00FF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$942.50</div>
            <p className="text-xs text-muted-foreground">+$43.00 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-[#6E00FF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <ExternalLink className="h-4 w-4 text-[#6E00FF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-[#6E00FF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">379</div>
            <p className="text-xs text-muted-foreground">+42 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1E1E1E] border-[#2a2a2a]">
        <CardHeader>
          <CardTitle>Your Affiliate Link</CardTitle>
          <CardDescription>Share this link to earn 20% commission on all purchases made through it.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Input readOnly value={affiliateLink} className="pr-10 bg-[#121212] border-[#2a2a2a]" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full hover:bg-transparent hover:text-[#6E00FF]"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
            <Button className="bg-[#6E00FF] hover:bg-[#5500CC] transition-all duration-200">
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="referrals" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#1E1E1E] border border-[#2a2a2a] rounded-lg p-1">
          <TabsTrigger
            value="referrals"
            className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-[#6E00FF]"
          >
            Referrals
          </TabsTrigger>
          <TabsTrigger value="payouts" className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-[#6E00FF]">
            Payouts
          </TabsTrigger>
          <TabsTrigger
            value="materials"
            className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-[#6E00FF]"
          >
            Marketing Materials
          </TabsTrigger>
        </TabsList>
        <TabsContent value="referrals" className="mt-4">
          <Card className="bg-[#1E1E1E] border-[#2a2a2a]">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                    <TableHead>User</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Purchase</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((referral) => (
                    <TableRow key={referral.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                      <TableCell className="font-medium">{referral.user}</TableCell>
                      <TableCell>{referral.date}</TableCell>
                      <TableCell>{referral.purchase}</TableCell>
                      <TableCell>{referral.commission}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            referral.status === "Paid"
                              ? "bg-[#6E00FF]/10 text-[#6E00FF]"
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}
                        >
                          {referral.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payouts" className="mt-4">
          <Card className="bg-[#1E1E1E] border-[#2a2a2a]">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Available for Withdrawal</h3>
                  <div className="text-3xl font-bold">$124.50</div>
                  <p className="text-sm text-muted-foreground">Minimum withdrawal amount: $50.00</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Payout Method</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="paypal">PayPal Email</Label>
                      <Input
                        id="paypal"
                        placeholder="your-email@example.com"
                        className="bg-[#121212] border-[#2a2a2a]"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button className="bg-[#6E00FF] hover:bg-[#5500CC] transition-all duration-200">
                        Request Withdrawal
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Recent Payouts</h3>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                        <TableCell>Jan 15, 2024</TableCell>
                        <TableCell>$218.00</TableCell>
                        <TableCell>PayPal</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                            Completed
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                        <TableCell>Dec 10, 2023</TableCell>
                        <TableCell>$175.50</TableCell>
                        <TableCell>PayPal</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                            Completed
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="materials" className="mt-4">
          <Card className="bg-[#1E1E1E] border-[#2a2a2a]">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Promotional Banners</h3>
                  <p className="text-sm text-muted-foreground">
                    Use these banners on your website or social media to promote QuickUI templates.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                    {[1, 2, 3].map((banner) => (
                      <div key={banner} className="border border-[#2a2a2a] rounded-lg overflow-hidden">
                        <div className="aspect-[5/2] bg-[#2a2a2a] flex items-center justify-center">
                          <span className="text-lg font-medium gradient-text">Banner {banner}</span>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <span className="text-sm">728x90</span>
                          <Button variant="ghost" size="sm" className="hover:bg-[#2a2a2a] hover:text-[#6E00FF]">
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Code
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Email Templates</h3>
                  <p className="text-sm text-muted-foreground">
                    Ready-to-use email templates to promote QuickUI to your audience.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <Card className="bg-[#121212] border-[#2a2a2a]">
                      <CardHeader>
                        <CardTitle className="text-base">New User Welcome</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Perfect for introducing new users to QuickUI templates and your affiliate link.
                        </p>
                      </CardContent>
                      <div className="px-6 pb-4">
                        <Button
                          variant="outline"
                          className="w-full border-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#6E00FF]"
                        >
                          View Template
                        </Button>
                      </div>
                    </Card>
                    <Card className="bg-[#121212] border-[#2a2a2a]">
                      <CardHeader>
                        <CardTitle className="text-base">Special Offer</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Promote limited-time discounts and special offers to drive conversions.
                        </p>
                      </CardContent>
                      <div className="px-6 pb-4">
                        <Button
                          variant="outline"
                          className="w-full border-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#6E00FF]"
                        >
                          View Template
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
