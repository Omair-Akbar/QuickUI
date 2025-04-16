"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  {
    name: "Jan",
    sales: 4000,
    downloads: 2400,
  },
  {
    name: "Feb",
    sales: 3000,
    downloads: 1398,
  },
  {
    name: "Mar",
    sales: 2000,
    downloads: 9800,
  },
  {
    name: "Apr",
    sales: 2780,
    downloads: 3908,
  },
  {
    name: "May",
    sales: 1890,
    downloads: 4800,
  },
  {
    name: "Jun",
    sales: 2390,
    downloads: 3800,
  },
  {
    name: "Jul",
    sales: 3490,
    downloads: 4300,
  },
  {
    name: "Aug",
    sales: 4000,
    downloads: 2400,
  },
  {
    name: "Sep",
    sales: 3000,
    downloads: 1398,
  },
  {
    name: "Oct",
    sales: 2000,
    downloads: 9800,
  },
  {
    name: "Nov",
    sales: 2780,
    downloads: 3908,
  },
  {
    name: "Dec",
    sales: 1890,
    downloads: 4800,
  },
]

export function StatsOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#6E00FF" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="downloads" stroke="#9B51E0" />
      </LineChart>
    </ResponsiveContainer>
  )
}
