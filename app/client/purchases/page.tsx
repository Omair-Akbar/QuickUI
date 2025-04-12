import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Star } from "lucide-react"

// Sample purchase data
const purchases = [
  {
    id: "INV-001-2024",
    template: "Dashboard Pro",
    date: "Feb 20, 2024",
    price: "$49.99",
    status: "completed",
    rated: true,
  },
  {
    id: "INV-002-2024",
    template: "E-commerce Kit",
    date: "Feb 15, 2024",
    price: "$59.99",
    status: "completed",
    rated: false,
  },
  {
    id: "INV-003-2024",
    template: "Blog System",
    date: "Jan 28, 2024",
    price: "$39.99",
    status: "completed",
    rated: true,
  },
  {
    id: "INV-004-2024",
    template: "Landing Page Builder",
    date: "Jan 10, 2024",
    price: "$34.99",
    status: "completed",
    rated: false,
  },
  {
    id: "INV-005-2024",
    template: "Portfolio Template",
    date: "Dec 22, 2023",
    price: "$29.99",
    status: "completed",
    rated: true,
  },
]

export default function PurchasesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Purchases</h2>
        <p className="text-muted-foreground">View and download templates you've purchased.</p>
      </div>

      <Card className="bg-[#1E1E1E] border-[#2a2a2a]">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                <TableHead>Invoice ID</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((purchase) => (
                <TableRow key={purchase.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                  <TableCell className="font-medium">{purchase.id}</TableCell>
                  <TableCell>{purchase.template}</TableCell>
                  <TableCell>{purchase.date}</TableCell>
                  <TableCell>{purchase.price}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-[#6E00FF]/10 text-[#6E00FF] border-[#6E00FF]/20">
                      {purchase.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#6E00FF]"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      {!purchase.rated && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#6E00FF]"
                        >
                          <Star className="mr-2 h-4 w-4" />
                          Rate
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Need Support?</h3>
              <p className="text-muted-foreground">
                If you're having issues with any of your purchased templates, our support team is here to help.
              </p>
              <Button className="bg-[#6E00FF] hover:bg-[#5500CC] transition-all duration-200">Contact Support</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#2a2a2a] glow-effect">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Template Updates</h3>
              <p className="text-muted-foreground">
                All your purchased templates include free updates. Check regularly for new features and improvements.
              </p>
              <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#6E00FF]">
                Check for Updates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
