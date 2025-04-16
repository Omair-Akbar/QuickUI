"use client"

import { useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { MoreHorizontal, Pencil } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const data: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 49,
    billingPeriod: "monthly",
    features: ["Featured for 7 days", "Basic analytics", "Standard support"],
    isActive: true,
  },
  {
    id: "standard",
    name: "Standard",
    price: 99,
    billingPeriod: "monthly",
    features: ["Featured for 14 days", "Advanced analytics", "Priority support", "Social media promotion"],
    isActive: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 199,
    billingPeriod: "monthly",
    features: [
      "Featured for 30 days",
      "Comprehensive analytics",
      "24/7 support",
      "Social media promotion",
      "Newsletter feature",
      "Homepage spotlight",
    ],
    isActive: true,
  },
  {
    id: "basic-annual",
    name: "Basic (Annual)",
    price: 490,
    billingPeriod: "annual",
    features: ["Featured for 7 days", "Basic analytics", "Standard support"],
    isActive: true,
  },
  {
    id: "standard-annual",
    name: "Standard (Annual)",
    price: 990,
    billingPeriod: "annual",
    features: ["Featured for 14 days", "Advanced analytics", "Priority support", "Social media promotion"],
    isActive: true,
  },
  {
    id: "premium-annual",
    name: "Premium (Annual)",
    price: 1990,
    billingPeriod: "annual",
    features: [
      "Featured for 30 days",
      "Comprehensive analytics",
      "24/7 support",
      "Social media promotion",
      "Newsletter feature",
      "Homepage spotlight",
    ],
    isActive: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 499,
    billingPeriod: "monthly",
    features: [
      "Custom featuring period",
      "Custom analytics dashboard",
      "Dedicated account manager",
      "All premium features",
      "Custom branding options",
    ],
    isActive: false,
  },
]

export type PricingPlan = {
  id: string
  name: string
  price: number
  billingPeriod: "monthly" | "annual"
  features: string[]
  isActive: boolean
}

export const columns: ColumnDef<PricingPlan>[] = [
  {
    accessorKey: "name",
    header: "Plan Name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "billingPeriod",
    header: "Billing Period",
    cell: ({ row }) => {
      const period = row.getValue("billingPeriod") as string
      return <Badge variant="outline">{period}</Badge>
    },
  },
  {
    accessorKey: "features",
    header: "Features",
    cell: ({ row }) => {
      const features = row.getValue("features") as string[]
      return (
        <div className="max-w-[300px] truncate" title={features.join(", ")}>
          {features.join(", ")}
        </div>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const [isActive, setIsActive] = useState(row.original.isActive)

      return (
        <div className="flex items-center">
          <Switch checked={isActive} onCheckedChange={setIsActive} aria-label="Toggle status" />
          <span className="ml-2">{isActive ? "Active" : "Inactive"}</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit plan
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Duplicate plan</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete plan</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function PricingPlansTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}
