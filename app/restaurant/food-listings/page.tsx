"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Filter, Edit, Trash2, AlertCircle, Clock, CheckCircle, Utensils } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { getUserRestaurant, getRestaurantFoodItems, deleteFoodItem } from "@/app/actions/food-listing-actions"

export default function FoodListingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [restaurant, setRestaurant] = useState(null)
  const [foodItems, setFoodItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterAvailability, setFilterAvailability] = useState("all")
  const [deleteItemId, setDeleteItemId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const fetchData = async () => {
    if (!user) return

    try {
      setLoading(true)

      // Get restaurant info
      const { restaurant } = await getUserRestaurant(user.id)
      setRestaurant(restaurant)

      if (restaurant) {
        // Get food items
        const { foodItems } = await getRestaurantFoodItems(restaurant.id)
        setFoodItems(foodItems || [])
        setFilteredItems(foodItems || [])
      }
    } catch (err) {
      console.error("Error fetching food items:", err)
      setError("Failed to load food items. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user])

  useEffect(() => {
    // Apply filters and search
    if (!foodItems) return

    let filtered = [...foodItems]

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.food_type.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply food type filter
    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.food_type.toLowerCase() === filterType.toLowerCase())
    }

    // Apply availability filter
    if (filterAvailability !== "all") {
      const isAvailable = filterAvailability === "available"
      filtered = filtered.filter((item) => item.is_available === isAvailable)
    }

    setFilteredItems(filtered)
  }, [foodItems, searchQuery, filterType, filterAvailability])

  const handleDeleteClick = (id) => {
    setDeleteItemId(id)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteItemId) return

    try {
      await deleteFoodItem(deleteItemId)

      // Update the local state
      setFoodItems(foodItems.filter((item) => item.id !== deleteItemId))
      setShowDeleteDialog(false)
      setDeleteItemId(null)
    } catch (err) {
      console.error("Error deleting food item:", err)
      setError("Failed to delete food item. Please try again.")
    }
  }

  const getFoodTypes = () => {
    if (!foodItems) return []

    const types = [...new Set(foodItems.map((item) => item.food_type))]
    return types.sort()
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Food Listings</h1>
        <p className="mb-4">Please log in to manage your food listings.</p>
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
          <p className="mt-4 text-gray-500">Loading food listings...</p>
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
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Food Listings</h1>
          <p className="text-gray-500">Manage your available food items for donation</p>
        </div>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => router.push("/restaurant/food-listings/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Food Item
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200 mb-6">
          <AlertCircle className="h-5 w-5 inline-block mr-2" />
          {error}
        </div>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search food items..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Food Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {getFoodTypes().map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                <SelectTrigger className="w-[180px]">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Food Items List */}
      {filteredItems.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Utensils className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No food items found</h3>
            <p className="text-gray-500 mb-4">
              {foodItems.length === 0
                ? "You haven't added any food items yet."
                : "No items match your current filters."}
            </p>
            {foodItems.length === 0 ? (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => router.push("/restaurant/food-listings/new")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Food Item
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setFilterType("all")
                  setFilterAvailability("all")
                }}
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isAvailable = item.is_available
            const now = new Date()
            const pickupStart = new Date(item.pickup_window_start)
            const pickupEnd = new Date(item.pickup_window_end)
            const isPastPickupWindow = now > pickupEnd

            // Format pickup window
            const isSameDay =
              pickupStart.getDate() === pickupEnd.getDate() &&
              pickupStart.getMonth() === pickupEnd.getMonth() &&
              pickupStart.getFullYear() === pickupEnd.getFullYear()

            const pickupWindowText = isSameDay
              ? `${format(pickupStart, "MMM d")} from ${format(pickupStart, "h:mm a")} to ${format(pickupEnd, "h:mm a")}`
              : `${format(pickupStart, "MMM d, h:mm a")} to ${format(pickupEnd, "MMM d, h:mm a")}`

            return (
              <Card key={item.id} className={isPastPickupWindow ? "opacity-70" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span className="sr-only">Open menu</span>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                          >
                            <path
                              d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/restaurant/food-listings/${item.id}`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(item.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline">{item.food_type}</Badge>
                    <Badge
                      variant="outline"
                      className={
                        isAvailable
                          ? "bg-green-50 text-green-600 border-green-200"
                          : "bg-red-50 text-red-600 border-red-200"
                      }
                    >
                      {isAvailable ? "Available" : "Reserved"}
                    </Badge>
                    {isPastPickupWindow && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                        Past Pickup Window
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 text-gray-500" />
                      <span>{pickupWindowText}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Quantity:</span>
                      <span>{item.quantity}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push(`/restaurant/food-listings/${item.id}`)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Details
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this food item. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </RestaurantDashboardLayout>
  )
}
