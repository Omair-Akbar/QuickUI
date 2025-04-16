"use client"
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

const data: TopTemplate[] = [
  {
    id: "TEMP-1",
    name: "Modern Dashboard UI Kit",
    category: "Admin",
    downloads: 2450,
    sales: 1850,
    revenue: 18500,
  },
  {
    id: "TEMP-2",
    name: "E-commerce UI Components",
    category: "E-commerce",
    downloads: 2100,
    sales: 1600,
    revenue: 16000,
  },
  {
    id: "TEMP-3",
    name: "Mobile App UI Kit",
    category: "Mobile",
    downloads: 1950,
    sales: 1450,
    revenue: 14500,
  },
  {
    id: "TEMP-4",
    name: "Landing Page Templates",
    category: "Marketing",
    downloads: 1800,
    sales: 1350,
    revenue: 13500,
  },
  {
    id: "TEMP-5",
    name: "Admin Dashboard Components",
    category: "Admin",
    downloads: 1750,
    sales: 1300,
    revenue: 13000,
  },
  {
    id: "TEMP-6",
    name: "Social Media UI Kit",
    category: "Social",
    downloads: 1700,
    sales: 1250,
    revenue: 12500,
  },
  {
    id: "TEMP-7",
    name: "Portfolio Website Templates",
    category: "Portfolio",
    downloads: 1650,
    sales: 1200,
    revenue: 12000,
  },
  {
    id: "TEMP-8",
    name: "Blog UI Components",
    category: "Blog",
    downloads: 1600,
    sales: 1150,
    revenue: 11500,
  },
  {
    id: "TEMP-9",
    name: "Fitness App UI Kit",
    category: "Health",
    downloads: 1550,
    sales: 1100,
    revenue: 11000,
  },
  {
    id: "TEMP-10",
    name: "Restaurant Website Templates",
    category: "Food",
    downloads: 1500,
    sales: 1050,
    revenue: 10500,
  },
]

export type TopTemplate = {
  id: string
  name: string
  category: string
  downloads: number
  sales: number
  revenue: number
}

export const columns: ColumnDef<TopTemplate>[] = [
  {
    accessorKey: "name",
    header: "Template Name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("category")}</Badge>,
  },
  {
    accessorKey: "downloads",
    header: "Downloads",
    cell: ({ row }) => <div className="text-right">{row.getValue("downloads")}</div>,
  },
  {
    accessorKey: "sales",
    header: "Sales",
    cell: ({ row }) => <div className="text-right">{row.getValue("sales")}</div>,
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("revenue"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

export function TopTemplatesTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
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
