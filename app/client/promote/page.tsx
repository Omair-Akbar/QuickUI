import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Star, TrendingUp } from "lucide-react"

export default function PromotePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Promote Your Templates</h2>
        <p className="text-muted-foreground">Boost visibility and sales with our promotion options.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Select a Template to Promote</h3>
            <p className="text-muted-foreground">Choose which of your templates you want to promote.</p>
          </div>
          <div className="w-full md:w-64">
            <Select>
              <SelectTrigger className="bg-[#1E1E1E] border-[#2a2a2a]">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E1E] border-[#2a2a2a]">
                <SelectItem value="dashboard">Dashboard Pro</SelectItem>
                <SelectItem value="ecommerce">E-commerce Kit</SelectItem>
                <SelectItem value="portfolio">Portfolio Template</SelectItem>
                <SelectItem value="blog">Blog System</SelectItem>
                <SelectItem value="admin">Admin Panel</SelectItem>
                <SelectItem value="landing">Landing Page Builder</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-[#1E1E1E] border-[#2a2a2a] relative overflow-hidden glow-effect">
            <div className="absolute top-0 right-0 p-1 bg-[#6E00FF] rounded-bl-lg">
              <Badge variant="outline" className="bg-transparent border-white text-white">
                Popular
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Featured Listing</CardTitle>
                <TrendingUp className="h-5 w-5 text-[#6E00FF]" />
              </div>
              <CardDescription>Appear at the top of category listings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">
                $49<span className="text-lg font-normal">/week</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-[#6E00FF]" />
                  <span className="text-sm">Top position in category</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-[#6E00FF]" />
                  <span className="text-sm">Special "Featured" badge</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-[#6E00FF]" />
                  <span className="text-sm">+75% more views on average</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-[#6E00FF]" />
                  <span className="text-sm">Priority in search results</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#6E00FF] hover:bg-[#5500CC] transition-all duration-200">
                Select Plan
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#1E1E1E] border-[#2a2a2a] relative overflow-hidden glow-effect">
            <div className="absolute top-0 right-0 p-1 bg-[#6E00FF] rounded-bl-lg">
              <Badge variant="outline" className="bg-transparent border-white text-white">
                Best Value
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Homepage Spotlight</CardTitle>
                <Sparkles className="h-5 w-5 text-[#6E00FF]" />
              </div>
              <CardDescription>Featured placement on the QuickUI homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">
                $99<span className="text-lg font-normal">/week</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-[#6E00FF]" />
                  <span className="text-sm">Homepage hero section placement</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-[#6E00FF]" />
                  <span className="text-sm">Featured in weekly newsletter</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-[#6E00FF]" />
                  <span className="text-sm">+150% more views on average</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-[#6E00FF]" />
                  <span className="text-sm">Social media promotion</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#6E00FF] hover:bg-[#5500CC] transition-all duration-200">
                Select Plan
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#1E1E1E] border-[#2a2a2a] relative overflow-hidden glow-effect">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Premium Bundle</CardTitle>
                <Star className="h-5 w-5 text-[#6E00FF]" />
              </div>
              <CardDescription>Complete promotion package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">
                $199<span className="text-lg font-normal">/month</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-[#6E00FF]" />
                  <span className="text-sm">All features from other plans</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-[#6E00FF]" />
                  <span className="text-sm">Featured in "Template of the Month"</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-[#6E00FF]" />
                  <span className="text-sm">Developer spotlight interview</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-[#6E00FF]" />
                  <span className="text-sm">Dedicated email campaign</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#6E00FF] hover:bg-[#5500CC] transition-all duration-200">
                Select Plan
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Card className="bg-[#1E1E1E] border-[#2a2a2a]">
        <CardHeader>
          <CardTitle>Promotion Analytics</CardTitle>
          <CardDescription>Track the performance of your promotions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Views Before Promotion</p>
                <p className="text-2xl font-bold">1,245</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Views During Promotion</p>
                <p className="text-2xl font-bold">3,872</p>
                <p className="text-sm text-[#6E00FF]">+211% increase</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">5.8%</p>
                <p className="text-sm text-[#6E00FF]">+2.3% increase</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Previous Promotions Performance</p>
              <div className="h-[200px] flex items-end space-x-2">
                {[30, 45, 60, 75, 90, 65, 80].map((height, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="bg-gradient-to-t from-[#6E00FF] to-[#9D50FF] rounded-t-md w-full"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-muted-foreground">Week {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardHeader>
            <CardTitle>Promotion Tips</CardTitle>
            <CardDescription>Maximize the effectiveness of your promotions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Optimize Your Template Preview</h4>
              <p className="text-sm text-muted-foreground">
                Ensure your template preview images are high quality and showcase the best features of your template.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Time Your Promotions</h4>
              <p className="text-sm text-muted-foreground">
                Run promotions during peak shopping seasons or when your target audience is most active.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Combine With Discounts</h4>
              <p className="text-sm text-muted-foreground">
                Consider offering a limited-time discount alongside your promotion to increase conversion rates.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Our marketing team is here to assist you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Not sure which promotion plan is right for your template? Our marketing experts can help you choose the
              best strategy to maximize your sales.
            </p>
            <div className="flex gap-4">
              <Button className="bg-[#6E00FF] hover:bg-[#5500CC] transition-all duration-200">
                Schedule Consultation
              </Button>
              <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#6E00FF]">
                View Success Stories
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
