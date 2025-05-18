"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, AlertCircle, Clock, Phone, Mail, MessageSquare } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { RestaurantDashboardLayout } from "@/components/restaurant-dashboard-layout"
import { useAuth } from "@/contexts/auth-context"
import { getUserRestaurant, getRestaurantPickups, updatePickupStatus } from "@/app/actions/food-listing-actions"

export default function PickupsManagementPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [restaurant, setRestaurant] = useState(null)
  const [pickups, setPickups] = useState([])
  const [filteredPickups, setFilteredPickups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [statusUpdateId, setStatusUpdateId] = useState(null)
  const [newStatus, setNewStatus] = useState(null)
  const [showStatusDialog, setShowStatusDialog] = useState(false)

  const fetchData = async () => {
    if (!user) return

    try {
      setLoading(true)

      // Get restaurant info
      const { restaurant } = await getUserRestaurant(user.id)
      setRestaurant(restaurant)

      if (restaurant) {
        // Get pickups
        const { pickups } = await getRestaurantPickups(restaurant.id)
        setPickups(pickups || [])
        setFilteredPickups(pickups || [])
      }
    } catch (err) {
      console.error("Error fetching pickups:", err)
      setError("Failed to load pickups. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user])

  useEffect(() => {
    // Apply filters and search
    if (!pickups) return

    let filtered = [...pickups]

    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter((pickup) => pickup.status === activeTab)
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (pickup) =>
          pickup.food_items?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pickup.food_items?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pickup.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((pickup) => pickup.status === filterStatus)
    }

    setFilteredPickups(filtered)
  }, [pickups, searchQuery, filterStatus, activeTab])

  const handleStatusUpdate = (id, status) => {
    setStatusUpdateId(id)
    setNewStatus(status)
    setShowStatusDialog(true)
  }

  const handleStatusConfirm = async () => {
    if (!statusUpdateId || !newStatus) return

    try {
      await updatePickupStatus(statusUpdateId, newStatus)

      // Update the local state
      setPickups(pickups.map((pickup) => (pickup.id === statusUpdateId ? { ...pickup, status: newStatus } : pickup)))

      setShowStatusDialog(false)
      setStatusUpdateId(null)
      setNewStatus(null)
    } catch (err) {
      console.error("Error updating pickup status:", err)
      setError("Failed to update pickup status. Please try again.")
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Scheduled
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Cancelled
          </Badge>
        )
      default:
        return null
    }
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Pickup Management</h1>
        <p className="mb-4">Please log in to manage your pickups.</p>
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
          <p className="mt-4 text-gray-500">Loading pickups...</p>
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
        <h1 className="text-2xl font-bold tracking-tight">Pickup Management</h1>
        <p className="text-gray-500">Manage pickup requests for your food items</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200 mb-6">
          <AlertCircle className="h-5 w-5 inline-block mr-2" />
          {error}
        </div>
      )}

      <Tabs defaultValue="all" className="w-full mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-4">
          <TabsTrigger value="all">All Pickups</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search pickups..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pickups List */}
      <TabsContent value={activeTab} className="mt-0">
        {filteredPickups.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No pickups found</h3>
              <p className="text-gray-500 mb-4">
                {pickups.length === 0
                  ? "You don't have any pickup requests yet."
                  : "No pickups match your current filters."}
              </p>
              {pickups.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setFilterStatus("all")
                    setActiveTab("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredPickups.map((pickup) => (
              <Card key={pickup.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 md:p-6 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium flex items-center">
                            {pickup.food_items?.name}
                            <span className="ml-2">{getStatusBadge(pickup.status)}</span>
                          </h3>
                          <p className="text-sm text-gray-500">{pickup.food_items?.description}</p>
                        </div>
                        <div className="mt-2 md:mt-0 text-sm">
                          <p className="font-medium">Pickup Time:</p>
                          <p>{format(new Date(pickup.pickup_time), "MMM d, yyyy h:mm a")}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Requester:</p>
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-2">
                              {pickup.profiles?.full_name?.charAt(0) || "U"}
                            </div>
                            <div>
                              <p>{pickup.profiles?.full_name || "Anonymous"}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <Mail className="h-3.5 w-3.5 mr-1" />
                                <span>{pickup.profiles?.email || "No email provided"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Contact:</p>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8">
                              <Phone className="h-3.5 w-3.5 mr-1" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm" className="h-8">
                              <MessageSquare className="h-3.5 w-3.5 mr-1" />
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>

                      {pickup.notes && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Notes:</p>
                          <p className="text-sm bg-gray-50 p-2 rounded-md">{pickup.notes}</p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {pickup.status === "scheduled" && (
                          <>
                            <Button
                              className="bg-yellow-600 hover:bg-yellow-700"
                              onClick={() => handleStatusUpdate(pickup.id, "in-progress")}
                            >
                              Mark as In Progress
                            </Button>
                            <Button
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleStatusUpdate(pickup.id, "cancelled")}
                            >
                              Cancel Pickup
                            </Button>
                          </>
                        )}
                        {pickup.status === "in-progress" && (
                          <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleStatusUpdate(pickup.id, "completed")}
                          >
                            Mark as Completed
                          </Button>
                        )}
                        {(pickup.status === "completed" || pickup.status === "cancelled") && (
                          <Badge variant="outline" className="px-3 py-1">
                            {pickup.status === "completed" ? "Pickup completed" : "Pickup cancelled"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      {/* Status Update Confirmation Dialog */}
      <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Pickup Status</AlertDialogTitle>
            <AlertDialogDescription>
              {newStatus === "in-progress" && "Are you sure you want to mark this pickup as in progress?"}
              {newStatus === "completed" && "Are you sure you want to mark this pickup as completed?"}
              {newStatus === "cancelled" && "Are you sure you want to cancel this pickup?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={
                newStatus === "in-progress"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : newStatus === "completed"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
              }
              onClick={handleStatusConfirm}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </RestaurantDashboardLayout>
  )
}
