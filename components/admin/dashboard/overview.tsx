"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    uploads: 40,
    sales: 24,
  },
  {
    name: "Feb",
    uploads: 30,
    sales: 18,
  },
  {
    name: "Mar",
    uploads: 20,
    sales: 12,
  },
  {
    name: "Apr",
    uploads: 27,
    sales: 18,
  },
  {
    name: "May",
    uploads: 18,
    sales: 10,
  },
  {
    name: "Jun",
    uploads: 23,
    sales: 15,
  },
  {
    name: "Jul",
    uploads: 34,
    sales: 22,
  },
  {
    name: "Aug",
    uploads: 45,
    sales: 32,
  },
  {
    name: "Sep",
    uploads: 65,
    sales: 45,
  },
  {
    name: "Oct",
    uploads: 78,
    sales: 50,
  },
  {
    name: "Nov",
    uploads: 90,
    sales: 70,
  },
  {
    name: "Dec",
    uploads: 100,
    sales: 80,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uploads" name="Template Uploads" fill="#6E00FF" />
        <Bar dataKey="sales" name="Template Sales" fill="#9B51E0" />
      </BarChart>
    </ResponsiveContainer>
  )
}
