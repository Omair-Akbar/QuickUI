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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

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

const data: Promotion[] = [
  {
    id: "PROMO-1",
    templateName: "Modern Dashboard UI Kit",
    templateId: "TEMP-1",
    status: "approved",
    requestedBy: "John Doe",
    requestDate: "2023-01-15T09:00:00.000Z",
    startDate: "2023-01-20T00:00:00.000Z",
    endDate: "2023-02-20T00:00:00.000Z",
    package: "premium",
  },
  {
    id: "PROMO-2",
    templateName: "E-commerce UI Components",
    templateId: "TEMP-2",
    status: "pending",
    requestedBy: "Jane Smith",
    requestDate: "2023-02-10T10:30:00.000Z",
    startDate: null,
    endDate: null,
    package: "standard",
  },
  {
    id: "PROMO-3",
    templateName: "Mobile App UI Kit",
    templateId: "TEMP-3",
    status: "approved",
    requestedBy: "Robert Johnson",
    requestDate: "2023-03-05T14:15:00.000Z",
    startDate: "2023-03-10T00:00:00.000Z",
    endDate: "2023-04-10T00:00:00.000Z",
    package: "premium",
  },
  {
    id: "PROMO-4",
    templateName: "Landing Page Templates",
    templateId: "TEMP-4",
    status: "rejected",
    requestedBy: "Sarah Williams",
    requestDate: "2023-04-02T11:45:00.000Z",
    startDate: null,
    endDate: null,
    package: "basic",
  },
  {
    id: "PROMO-5",
    templateName: "Admin Dashboard Components",
    templateId: "TEMP-5",
    status: "approved",
    requestedBy: "Michael Brown",
    requestDate: "2023-05-08T08:20:00.000Z",
    startDate: "2023-05-15T00:00:00.000Z",
    endDate: "2023-06-15T00:00:00.000Z",
    package: "premium",
  },
  {
    id: "PROMO-6",
    templateName: "Social Media UI Kit",
    templateId: "TEMP-6",
    status: "pending",
    requestedBy: "Emily Davis",
    requestDate: "2023-06-14T16:30:00.000Z",
    startDate: null,
    endDate: null,
    package: "standard",
  },
  {
    id: "PROMO-7",
    templateName: "Portfolio Website Templates",
    templateId: "TEMP-7",
    status: "approved",
    requestedBy: "David Wilson",
    requestDate: "2023-07-18T13:10:00.000Z",
    startDate: "2023-07-25T00:00:00.000Z",
    endDate: "2023-08-25T00:00:00.000Z",
    package: "basic",
  },
  {
    id: "PROMO-8",
    templateName: "Blog UI Components",
    templateId: "TEMP-8",
    status: "expired",
    requestedBy: "Lisa Martinez",
    requestDate: "2023-08-25T09:45:00.000Z",
    startDate: "2023-09-01T00:00:00.000Z",
    endDate: "2023-10-01T00:00:00.000Z",
    package: "standard",
  },
]

export type Promotion = {
  id: string
  templateName: string
  templateId: string
  status: "pending" | "approved" | "rejected" | "expired"
  requestedBy: string
  requestDate: string
  startDate: string | null
  endDate: string | null
  package: "basic" | "standard" | "premium"
}

export const columns: ColumnDef<Promotion>[] = [
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
    accessorKey: "templateName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Template
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("templateName")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "approved"
              ? "default"
              : status === "pending"
                ? "outline"
                : status === "expired"
                  ? "secondary"
                  : "destructive"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "requestedBy",
    header: "Requested By",
    cell: ({ row }) => <div>{row.getValue("requestedBy")}</div>,
  },
  {
    accessorKey: "package",
    header: "Package",
    cell: ({ row }) => {
      const pkg = row.getValue("package") as string
      return (
        <Badge
          variant="outline"
          className={
            pkg === "premium"
              ? "border-primary text-primary"
              : pkg === "standard"
                ? "border-blue-500 text-blue-500"
                : ""
          }
        >
          {pkg}
        </Badge>
      )
    },
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("requestDate") as string)
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = row.getValue("startDate") as string
      return <div>{date ? new Date(date).toLocaleDateString() : "-"}</div>
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = row.getValue("endDate") as string
      return <div>{date ? new Date(date).toLocaleDateString() : "-"}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const promotion = row.original

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
            <DropdownMenuItem>View details</DropdownMenuItem>
            {promotion.status === "pending" && (
              <>
                <DropdownMenuItem>Approve</DropdownMenuItem>
                <DropdownMenuItem>Reject</DropdownMenuItem>
              </>
            )}
            {promotion.status === "approved" && (
              <>
                <DropdownMenuItem>Extend</DropdownMenuItem>
                <DropdownMenuItem>Cancel</DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function PromotionsTable() {
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
          placeholder="Filter promotions..."
          value={(table.getColumn("templateName")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("templateName")?.setFilterValue(event.target.value)}
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
