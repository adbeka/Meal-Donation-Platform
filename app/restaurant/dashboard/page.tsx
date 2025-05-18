"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Utensils, Truck, CheckCircle, AlertCircle, Clock, ArrowRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RestaurantDashboardLayout } from "@/components/restaurant-dashboard-layout"
import { useAuth } from "@/contexts/auth-context"
import { getUserRestaurant, getRestaurantStats, getRestaurantPickups } from "@/app/actions/food-listing-actions"
import { format } from "date-fns"

export default function RestaurantDashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [restaurant, setRestaurant] = useState(null)
  const [stats, setStats] = useState(null)
  const [recentPickups, setRecentPickups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        setLoading(true)

        // Get restaurant info
        const { restaurant } = await getUserRestaurant(user.id)
        setRestaurant(restaurant)

        if (restaurant) {
          // Get restaurant stats
          const { stats } = await getRestaurantStats(restaurant.id)
          setStats(stats)

          // Get recent pickups
          const { pickups } = await getRestaurantPickups(restaurant.id)
          setRecentPickups(pickups.slice(0, 5)) // Get only the 5 most recent pickups
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to load dashboard data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Restaurant Dashboard</h1>
        <p className="mb-4">Please log in to access your restaurant dashboard.</p>
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <a href="/login">Log In</a>
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <RestaurantDashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-500">Loading dashboard...</p>
        </div>
      </RestaurantDashboardLayout>
    )
  }

  if (error) {
    return (
      <RestaurantDashboardLayout>
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200 mb-6">
          <AlertCircle className="h-5 w-5 inline-block mr-2" />
          {error}
        </div>
      </RestaurantDashboardLayout>
    )
  }

  if (!restaurant) {
    return (
      <RestaurantDashboardLayout>
        <div className="bg-yellow-50 text-yellow-600 p-4 rounded-md border border-yellow-200 mb-6">
          <AlertCircle className="h-5 w-5 inline-block mr-2" />
          No restaurant found for your account. Please contact support.
        </div>
      </RestaurantDashboardLayout>
    )
  }

  return (
    <RestaurantDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Welcome back to your restaurant dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Food Items</p>
                <p className="text-2xl font-bold">{stats?.totalFoodItems || 0}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Utensils className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{stats?.availableFoodItems || 0} items available for pickup</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Pickups</p>
                <p className="text-2xl font-bold">{stats?.totalPickups || 0}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{stats?.completedPickups || 0} pickups completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Scheduled</p>
                <p className="text-2xl font-bold">{stats?.scheduledPickups || 0}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{stats?.inProgressPickups || 0} pickups in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completion Rate</p>
                <p className="text-2xl font-bold">
                  {stats?.totalPickups
                    ? Math.round(
                        (stats.completedPickups /
                          (stats.totalPickups - stats.scheduledPickups - stats.inProgressPickups)) *
                          100,
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{stats?.cancelledPickups || 0} pickups cancelled</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              className="bg-green-600 hover:bg-green-700 h-auto py-4 flex flex-col items-center justify-center"
              onClick={() => router.push("/restaurant/food-listings/new")}
            >
              <Utensils className="h-6 w-6 mb-2" />
              <span>Add New Food Item</span>
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 h-auto py-4 flex flex-col items-center justify-center"
              onClick={() => router.push("/restaurant/pickups")}
            >
              <Truck className="h-6 w-6 mb-2" />
              <span>Manage Pickups</span>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Restaurant Information</CardTitle>
            <CardDescription>Your restaurant details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p>{restaurant.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p>
                {restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zip}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contact</p>
              <p>
                {restaurant.phone} | {restaurant.email}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/restaurant/settings")}>
              Edit Information
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Pickups */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Pickups</CardTitle>
            <CardDescription>Latest pickup requests for your food items</CardDescription>
          </div>
          <Button variant="ghost" className="text-sm text-green-600" onClick={() => router.push("/restaurant/pickups")}>
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {recentPickups.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No recent pickups found.</p>
          ) : (
            <div className="space-y-4">
              {recentPickups.map((pickup) => {
                const statusColors = {
                  scheduled: "bg-blue-50 text-blue-600",
                  "in-progress": "bg-yellow-50 text-yellow-600",
                  completed: "bg-green-50 text-green-600",
                  cancelled: "bg-red-50 text-red-600",
                }

                return (
                  <div key={pickup.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <p className="font-medium">{pickup.food_items?.name}</p>
                        <span className={`ml-2 text-xs px-2 py-1 rounded-full ${statusColors[pickup.status]}`}>
                          {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Requested by: {pickup.profiles?.full_name || "Anonymous"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{format(new Date(pickup.pickup_time), "MMM d, h:mm a")}</p>
                      <p className="text-xs text-gray-500">{format(new Date(pickup.created_at), "MMM d, yyyy")}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </RestaurantDashboardLayout>
  )
}
