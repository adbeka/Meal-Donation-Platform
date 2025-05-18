"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { AlertCircle, ArrowLeft, Save } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RestaurantDashboardLayout } from "@/components/restaurant-dashboard-layout"
import { useAuth } from "@/contexts/auth-context"
import {
  getUserRestaurant,
  getRestaurantFoodItems,
  createFoodItem,
  updateFoodItem,
} from "@/app/actions/food-listing-actions"

// Food types options
const FOOD_TYPES = [
  "Pastries",
  "Sandwiches",
  "Pasta",
  "Bread",
  "Salads",
  "Bowls",
  "Wraps",
  "Desserts",
  "Cakes",
  "Fruits",
  "Vegetables",
  "Prepared Meals",
  "Other",
]

export default function FoodItemFormPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const isEditing = params.id !== "new"
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 1,
    food_type: "",
    pickup_date: "",
    pickup_start_time: "",
    pickup_end_time: "",
    is_available: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        setLoading(true)

        // Get restaurant info
        const { restaurant } = await getUserRestaurant(user.id)
        setRestaurant(restaurant)

        // If editing, fetch the food item
        if (isEditing && restaurant) {
          const { foodItems } = await getRestaurantFoodItems(restaurant.id)
          const foodItem = foodItems.find((item) => item.id === params.id)

          if (foodItem) {
            const pickupStart = new Date(foodItem.pickup_window_start)
            const pickupEnd = new Date(foodItem.pickup_window_end)

            setFormData({
              name: foodItem.name,
              description: foodItem.description,
              quantity: foodItem.quantity,
              food_type: foodItem.food_type,
              pickup_date: format(pickupStart, "yyyy-MM-dd"),
              pickup_start_time: format(pickupStart, "HH:mm"),
              pickup_end_time: format(pickupEnd, "HH:mm"),
              is_available: foodItem.is_available,
            })
          } else {
            setError("Food item not found")
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, isEditing, params.id])

  const handleInputChange = (e) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseInt(value) : value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!restaurant) {
      setError("Restaurant information not found")
      return
    }

    // Validate form
    if (
      !formData.name ||
      !formData.food_type ||
      !formData.pickup_date ||
      !formData.pickup_start_time ||
      !formData.pickup_end_time
    ) {
      setError("Please fill in all required fields")
      return
    }

    // Create pickup window dates
    const pickupDate = new Date(formData.pickup_date)

    const [startHours, startMinutes] = formData.pickup_start_time.split(":").map(Number)
    const pickupWindowStart = new Date(pickupDate)
    pickupWindowStart.setHours(startHours, startMinutes, 0, 0)

    const [endHours, endMinutes] = formData.pickup_end_time.split(":").map(Number)
    const pickupWindowEnd = new Date(pickupDate)
    pickupWindowEnd.setHours(endHours, endMinutes, 0, 0)

    // Validate pickup window
    if (pickupWindowEnd <= pickupWindowStart) {
      setError("Pickup end time must be after start time")
      return
    }

    // Prepare data for API
    const foodItemData = {
      restaurant_id: restaurant.id,
      name: formData.name,
      description: formData.description,
      quantity: formData.quantity,
      food_type: formData.food_type,
      pickup_window_start: pickupWindowStart.toISOString(),
      pickup_window_end: pickupWindowEnd.toISOString(),
      is_available: formData.is_available,
    }

    try {
      setSaving(true)
      setError(null)
      setSuccess(null)

      if (isEditing) {
        await updateFoodItem(params.id, foodItemData)
        setSuccess("Food item updated successfully")
      } else {
        await createFoodItem(foodItemData)
        setSuccess("Food item created successfully")

        // Reset form after successful creation
        if (!isEditing) {
          setFormData({
            name: "",
            description: "",
            quantity: 1,
            food_type: "",
            pickup_date: "",
            pickup_start_time: "",
            pickup_end_time: "",
            is_available: true,
          })
        }
      }

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/restaurant/food-listings")
      }, 1500)
    } catch (err) {
      console.error("Error saving food item:", err)
      setError("Failed to save food item. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Food Item</h1>
        <p className="mb-4">Please log in to manage your food items.</p>
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
          <p className="mt-4 text-gray-500">Loading...</p>
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
      <div className="mb-6 flex items-center">
        <Button variant="ghost" className="mr-4" onClick={() => router.push("/restaurant/food-listings")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{isEditing ? "Edit Food Item" : "Add New Food Item"}</h1>
          <p className="text-gray-500">
            {isEditing ? "Update the details of your food item" : "Add a new food item for donation"}
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 text-green-600 border-green-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Food Item Details</CardTitle>
            <CardDescription>Provide information about the food item you're offering</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Item Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Assorted Pastries"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="food_type">
                    Food Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.food_type}
                    onValueChange={(value) => handleSelectChange("food_type", value)}
                    required
                  >
                    <SelectTrigger id="food_type">
                      <SelectValue placeholder="Select food type" />
                    </SelectTrigger>
                    <SelectContent>
                      {FOOD_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the food item (e.g., ingredients, preparation, etc.)"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">
                  Quantity <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pickup Window</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup_date">
                    Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="pickup_date"
                    name="pickup_date"
                    type="date"
                    value={formData.pickup_date}
                    onChange={handleInputChange}
                    min={format(new Date(), "yyyy-MM-dd")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickup_start_time">
                    Start Time <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="pickup_start_time"
                    name="pickup_start_time"
                    type="time"
                    value={formData.pickup_start_time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickup_end_time">
                    End Time <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="pickup_end_time"
                    name="pickup_end_time"
                    type="time"
                    value={formData.pickup_end_time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_available"
                checked={formData.is_available}
                onCheckedChange={(checked) => handleSwitchChange("is_available", checked)}
              />
              <Label htmlFor="is_available">Available for pickup</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/restaurant/food-listings")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : isEditing ? "Update Food Item" : "Create Food Item"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </RestaurantDashboardLayout>
  )
}
