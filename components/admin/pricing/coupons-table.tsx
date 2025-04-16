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

const data: Coupon[] = [
  {
    id: "WELCOME20",
    description: "Welcome discount",
    discountType: "percentage",
    discountValue: 20,
    validFrom: "2023-01-01T00:00:00.000Z",
    validUntil: "2023-12-31T23:59:59.000Z",
    usageLimit: 1000,
    usageCount: 450,
    isActive: true,
  },
  {
    id: "SUMMER30",
    description: "Summer sale",
    discountType: "percentage",
    discountValue: 30,
    validFrom: "2023-06-01T00:00:00.000Z",
    validUntil: "2023-08-31T23:59:59.000Z",
    usageLimit: 500,
    usageCount: 320,
    isActive: true,
  },
  {
    id: "FLAT50",
    description: "Flat discount",
    discountType: "fixed",
    discountValue: 50,
    validFrom: "2023-03-15T00:00:00.000Z",
    validUntil: "2023-04-15T23:59:59.000Z",
    usageLimit: 200,
    usageCount: 200,
    isActive: false,
  },
  {
    id: "PREMIUM25",
    description: "Premium plan discount",
    discountType: "percentage",
    discountValue: 25,
    validFrom: "2023-05-01T00:00:00.000Z",
    validUntil: "2023-12-31T23:59:59.000Z",
    usageLimit: 300,
    usageCount: 150,
    isActive: true,
  },
  {
    id: "BLACKFRIDAY",
    description: "Black Friday sale",
    discountType: "percentage",
    discountValue: 40,
    validFrom: "2023-11-24T00:00:00.000Z",
    validUntil: "2023-11-27T23:59:59.000Z",
    usageLimit: 1000,
    usageCount: 0,
    isActive: true,
  },
  {
    id: "TEMPLATE15",
    description: "Template specific discount",
    discountType: "percentage",
    discountValue: 15,
    validFrom: "2023-02-01T00:00:00.000Z",
    validUntil: "2023-12-31T23:59:59.000Z",
    usageLimit: 500,
    usageCount: 210,
    isActive: true,
  },
]

export type Coupon = {
  id: string
  description: string
  discountType: "percentage" | "fixed"
  discountValue: number
  validFrom: string
  validUntil: string
  usageLimit: number
  usageCount: number
  isActive: boolean
}

export const columns: ColumnDef<Coupon>[] = [
  {
    accessorKey: "id",
    header: "Coupon Code",
    cell: ({ row }) => <div className="font-mono font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "discountValue",
    header: "Discount",
    cell: ({ row }) => {
      const type = row.original.discountType
      const value = row.getValue("discountValue") as number

      return (
        <div>
          {type === "percentage"
            ? `${value}%`
            : new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(value)}
        </div>
      )
    },
  },
  {
    accessorKey: "validUntil",
    header: "Expiry",
    cell: ({ row }) => {
      const date = new Date(row.getValue("validUntil") as string)
      const now = new Date()
      const isExpired = date < now

      return (
        <div className={isExpired ? "text-destructive" : ""}>
          {date.toLocaleDateString()}
          {isExpired && " (Expired)"}
        </div>
      )
    },
  },
  {
    accessorKey: "usageCount",
    header: "Usage",
    cell: ({ row }) => {
      const used = row.getValue("usageCount") as number
      const limit = row.original.usageLimit
      const percentage = Math.round((used / limit) * 100)

      return (
        <div className="flex items-center gap-2">
          <div>
            {used} / {limit}
          </div>
          <Badge variant="outline">{percentage}%</Badge>
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
              Edit coupon
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Duplicate coupon</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete coupon</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function CouponsTable() {
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
