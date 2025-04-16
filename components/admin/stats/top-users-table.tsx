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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data: TopUser[] = [
  {
    id: "USR-1",
    name: "John Doe",
    email: "john.doe@example.com",
    templates: 15,
    sales: 1850,
    earnings: 18500,
  },
  {
    id: "USR-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    templates: 12,
    sales: 1600,
    earnings: 16000,
  },
  {
    id: "USR-3",
    name: "Robert Johnson",
    email: "robert@example.com",
    templates: 10,
    sales: 1450,
    earnings: 14500,
  },
  {
    id: "USR-4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    templates: 8,
    sales: 1350,
    earnings: 13500,
  },
  {
    id: "USR-5",
    name: "Michael Brown",
    email: "michael@example.com",
    templates: 18,
    sales: 1300,
    earnings: 13000,
  },
  {
    id: "USR-6",
    name: "Emily Davis",
    email: "emily@example.com",
    templates: 6,
    sales: 1250,
    earnings: 12500,
  },
  {
    id: "USR-7",
    name: "David Wilson",
    email: "david@example.com",
    templates: 9,
    sales: 1200,
    earnings: 12000,
  },
  {
    id: "USR-8",
    name: "Lisa Martinez",
    email: "lisa@example.com",
    templates: 7,
    sales: 1150,
    earnings: 11500,
  },
  {
    id: "USR-9",
    name: "Kevin Taylor",
    email: "kevin@example.com",
    templates: 11,
    sales: 1100,
    earnings: 11000,
  },
  {
    id: "USR-10",
    name: "Amanda Garcia",
    email: "amanda@example.com",
    templates: 14,
    sales: 1050,
    earnings: 10500,
  },
]

export type TopUser = {
  id: string
  name: string
  email: string
  templates: number
  sales: number
  earnings: number
}

export const columns: ColumnDef<TopUser>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
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
            <div className="text-sm text-muted-foreground">{email}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "templates",
    header: "Templates",
    cell: ({ row }) => <div className="text-right">{row.getValue("templates")}</div>,
  },
  {
    accessorKey: "sales",
    header: "Sales",
    cell: ({ row }) => <div className="text-right">{row.getValue("sales")}</div>,
  },
  {
    accessorKey: "earnings",
    header: "Earnings",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("earnings"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

export function TopUsersTable() {
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
