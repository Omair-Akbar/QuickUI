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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data: SupportTicket[] = [
  {
    id: "TICKET-1",
    subject: "Payment issue with template purchase",
    user: "John Doe",
    email: "john.doe@example.com",
    status: "open",
    priority: "high",
    category: "billing",
    createdAt: "2023-01-15T09:00:00.000Z",
    lastUpdated: "2023-01-15T09:00:00.000Z",
  },
  {
    id: "TICKET-2",
    subject: "Cannot download purchased template",
    user: "Jane Smith",
    email: "jane.smith@example.com",
    status: "in-progress",
    priority: "medium",
    category: "download",
    createdAt: "2023-02-10T10:30:00.000Z",
    lastUpdated: "2023-02-11T14:20:00.000Z",
  },
  {
    id: "TICKET-3",
    subject: "Request for refund",
    user: "Robert Johnson",
    email: "robert@example.com",
    status: "open",
    priority: "high",
    category: "refund",
    createdAt: "2023-03-05T14:15:00.000Z",
    lastUpdated: "2023-03-05T14:15:00.000Z",
  },
  {
    id: "TICKET-4",
    subject: "Template compatibility issue",
    user: "Sarah Williams",
    email: "sarah@example.com",
    status: "in-progress",
    priority: "medium",
    category: "technical",
    createdAt: "2023-04-02T11:45:00.000Z",
    lastUpdated: "2023-04-03T09:30:00.000Z",
  },
  {
    id: "TICKET-5",
    subject: "Account access problem",
    user: "Michael Brown",
    email: "michael@example.com",
    status: "open",
    priority: "high",
    category: "account",
    createdAt: "2023-05-08T08:20:00.000Z",
    lastUpdated: "2023-05-08T08:20:00.000Z",
  },
  {
    id: "TICKET-6",
    subject: "Question about licensing",
    user: "Emily Davis",
    email: "emily@example.com",
    status: "closed",
    priority: "low",
    category: "licensing",
    createdAt: "2023-06-14T16:30:00.000Z",
    lastUpdated: "2023-06-15T10:45:00.000Z",
  },
  {
    id: "TICKET-7",
    subject: "Feature request for template",
    user: "David Wilson",
    email: "david@example.com",
    status: "closed",
    priority: "low",
    category: "feature",
    createdAt: "2023-07-18T13:10:00.000Z",
    lastUpdated: "2023-07-20T11:25:00.000Z",
  },
  {
    id: "TICKET-8",
    subject: "Problem with template customization",
    user: "Lisa Martinez",
    email: "lisa@example.com",
    status: "in-progress",
    priority: "medium",
    category: "technical",
    createdAt: "2023-08-25T09:45:00.000Z",
    lastUpdated: "2023-08-26T14:30:00.000Z",
  },
]

export type SupportTicket = {
  id: string
  subject: string
  user: string
  email: string
  status: "open" | "in-progress" | "closed"
  priority: "low" | "medium" | "high"
  category: string
  createdAt: string
  lastUpdated: string
}

export const columns: ColumnDef<SupportTicket>[] = [
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
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Subject
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("subject")}</div>,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const name = row.getValue("user") as string
      const email = row.original.email
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-xs text-muted-foreground">{email}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "open" ? "default" : status === "in-progress" ? "outline" : "secondary"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string
      return (
        <Badge
          variant="outline"
          className={
            priority === "high"
              ? "border-red-500 text-red-500"
              : priority === "medium"
                ? "border-yellow-500 text-yellow-500"
                : ""
          }
        >
          {priority}
        </Badge>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string)
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ticket = row.original

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
            <DropdownMenuItem>Reply</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Assign to me</DropdownMenuItem>
            <DropdownMenuItem>Change priority</DropdownMenuItem>
            <DropdownMenuItem>{ticket.status === "closed" ? "Reopen ticket" : "Close ticket"}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function SupportTable() {
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
          placeholder="Filter tickets..."
          value={(table.getColumn("subject")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("subject")?.setFilterValue(event.target.value)}
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
