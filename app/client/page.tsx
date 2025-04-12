import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Download, DollarSign, Package, Users } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, Alex!</h2>
          <p className="text-muted-foreground">Here's what's happening with your templates today.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <Package className="h-4 w-4 text-[#6E00FF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-[#6E00FF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-[#6E00FF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,395.32</div>
            <p className="text-xs text-muted-foreground">+7% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Affiliate Earnings</CardTitle>
            <Users className="h-4 w-4 text-[#6E00FF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$942.50</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] col-span-4 glow-effect">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end space-x-2">
              {[40, 30, 55, 25, 60, 45, 35, 50, 65, 75, 45, 70].map((height, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-[#6E00FF] to-[#9D50FF] rounded-t-md w-full"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <div>Jan</div>
              <div>Feb</div>
              <div>Mar</div>
              <div>Apr</div>
              <div>May</div>
              <div>Jun</div>
              <div>Jul</div>
              <div>Aug</div>
              <div>Sep</div>
              <div>Oct</div>
              <div>Nov</div>
              <div>Dec</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] col-span-3 glow-effect">
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Stay updated with the latest news</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">New Pricing Structure</h4>
                <span className="text-xs text-muted-foreground">2 days ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                We've updated our pricing structure to better reward high-quality templates. Check out the new tiers!
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Template Contest</h4>
                <span className="text-xs text-muted-foreground">5 days ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Join our monthly template contest for a chance to win $500 and featured placement on the homepage.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">API Access</h4>
                <span className="text-xs text-muted-foreground">1 week ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Developer API access is now available in beta. Apply now to integrate QuickUI into your workflow.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardHeader>
            <CardTitle>Top Performing Template</CardTitle>
            <CardDescription>Your best seller this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video rounded-md bg-[#2a2a2a] overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-medium gradient-text">Dashboard Pro</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Sales</span>
                <span className="text-sm font-medium">87</span>
              </div>
              <Progress value={87} className="h-2 bg-[#2a2a2a]" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Revenue</span>
                <span className="text-sm font-medium">$1,740</span>
              </div>
              <Progress value={74} className="h-2 bg-[#2a2a2a]" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>Latest feedback from customers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Admin Dashboard</h4>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#6E00FF"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                "Excellent design and very well documented. Saved me weeks of work!"
              </p>
              <p className="text-xs text-muted-foreground">- Michael T., 2 days ago</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">E-commerce Kit</h4>
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#6E00FF"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2a2a2a" className="w-4 h-4">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                "Great template, but I had some issues with mobile responsiveness."
              </p>
              <p className="text-xs text-muted-foreground">- Sarah K., 1 week ago</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardHeader>
            <CardTitle>Trending Categories</CardTitle>
            <CardDescription>Most popular template categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Dashboard Templates</span>
                <span className="text-sm font-medium">32%</span>
              </div>
              <Progress value={32} className="h-2 bg-[#2a2a2a]" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Landing Pages</span>
                <span className="text-sm font-medium">28%</span>
              </div>
              <Progress value={28} className="h-2 bg-[#2a2a2a]" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">E-commerce</span>
                <span className="text-sm font-medium">24%</span>
              </div>
              <Progress value={24} className="h-2 bg-[#2a2a2a]" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Mobile Apps</span>
                <span className="text-sm font-medium">16%</span>
              </div>
              <Progress value={16} className="h-2 bg-[#2a2a2a]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
