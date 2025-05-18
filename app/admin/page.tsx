import Link from "next/link"
import { Database, Users, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your MealShare application</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Seed Data</CardTitle>
              <CardDescription>Add sample data to your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4">
                <Database className="h-12 w-12 text-green-600" />
              </div>
              <p className="text-sm text-gray-500">
                Populate your application with sample restaurants, food items, and more.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/admin/seed">Seed Data</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4">
                <Users className="h-12 w-12 text-green-600" />
              </div>
              <p className="text-sm text-gray-500">View, edit, and manage user accounts and permissions.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/admin/users">Manage Users</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure application settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4">
                <Settings className="h-12 w-12 text-green-600" />
              </div>
              <p className="text-sm text-gray-500">Adjust application settings, notifications, and preferences.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/admin/settings">Settings</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
