"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const data: Template[] = [
  {
    id: "TEMP-1",
    name: "Modern Dashboard UI Kit",
    status: "published",
    featured: true,
    trending: true,
    inventory: 100,
    vendor: "John Doe",
    createdAt: "2023-01-15T09:00:00.000Z",
  },
  {
    id: "TEMP-2",
    name: "E-commerce UI Components",
    status: "published",
    featured: true,
    trending: false,
    inventory: 75,
    vendor: "Jane Smith",
    createdAt: "2023-02-20T10:30:00.000Z",
  },
  {
    id: "TEMP-3",
    name: "Mobile App UI Kit",
    status: "published",
    featured: false,
    trending: true,
    inventory: 50,
    vendor: "Robert Johnson",
    createdAt: "2023-03-10T14:15:00.000Z",
  },
  {
    id: "TEMP-4",
    name: "Landing Page Templates",
    status: "draft",
    featured: false,
    trending: false,
    inventory: 25,
    vendor: "Sarah Williams",
    createdAt: "2023-04-05T11:45:00.000Z",
  },
  {
    id: "TEMP-5",
    name: "Admin Dashboard Components",
    status: "published",
    featured: true,
    trending: true,
    inventory: 120,
    vendor: "Michael Brown",
    createdAt: "2023-05-12T08:20:00.000Z",
  },
  {
    id: "TEMP-6",
    name: "Social Media UI Kit",
    status: "published",
    featured: false,
    trending: false,
    inventory: 80,
    vendor: "Emily Davis",
    createdAt: "2023-06-18T16:30:00.000Z",
  },
  {
    id: "TEMP-7",
    name: "Portfolio Website Templates",
    status: "draft",
    featured: false,
    trending: false,
    inventory: 40,
    vendor: "David Wilson",
    createdAt: "2023-07-22T13:10:00.000Z",
  },
  {
    id: "TEMP-8",
    name: "Blog UI Components",
    status: "published",
    featured: true,
    trending: false,
    inventory: 90,
    vendor: "Lisa Martinez",
    createdAt: "2023-08-30T09:45:00.000Z",
  },
  {
    id: "TEMP-9",
    name: "Fitness App UI Kit",
    status: "published",
    featured: false,
    trending: true,
    inventory: 60,
    vendor: "Kevin Taylor",
    createdAt: "2023-09-14T15:20:00.000Z",
  },
  {
    id: "TEMP-10",
    name: "Restaurant Website Templates",
    status: "draft",
    featured: false,
    trending: false,
    inventory: 30,
    vendor: "Amanda Garcia",
    createdAt: "2023-10-25T10:05:00.000Z",
  },
]

export type Template = {
  id: string
  name: string
  status: "published" | "draft"
  featured: boolean
  trending: boolean
  inventory: number
  vendor: string
  createdAt: string
}

export const columns: ColumnDef<Template>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <Badge variant={status === "published" ? "default" : "secondary"}>{status}</Badge>
    },
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => {
      const isFeatured = row.getValue("featured") as boolean
      return isFeatured ? (
        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
      ) : (
        <Star className="h-4 w-4 text-muted-foreground" />
      )
    },
  },
  {
    accessorKey: "trending",
    header: "Trending",
    cell: ({ row }) => {
      const isTrending = row.getValue("trending") as boolean
      return isTrending ? (
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
          Trending
        </Badge>
      ) : (
        <span className="text-muted-foreground">-</span>
      )
    },
  },
  {
    accessorKey: "inventory",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Inventory
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("inventory")}</div>,
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
    cell: ({ row }) => <div>{row.getValue("vendor")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string)
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const template = row.original

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
            <DropdownMenuItem>View template</DropdownMenuItem>
            <DropdownMenuItem>Edit template</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{template.featured ? "Remove from featured" : "Mark as featured"}</DropdownMenuItem>
            <DropdownMenuItem>{template.trending ? "Remove from trending" : "Mark as trending"}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete template</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function TemplatesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter templates..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
