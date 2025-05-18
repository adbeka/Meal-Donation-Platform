"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle } from "lucide-react"
import { format } from "date-fns"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { createPickup } from "@/app/actions/pickup-actions"
import { useAuth } from "@/contexts/auth-context"

export function ReservationModal({
  isOpen,
  onClose,
  restaurant,
  foodItems,
  onSuccess,
}: {
  isOpen: boolean
  onClose: () => void
  restaurant: any
  foodItems: any[]
  onSuccess?: () => void
}) {
  const { user } = useAuth()
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({})
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleItemToggle = (itemId: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const handleReserve = async () => {
    if (!user) {
      setError("You must be logged in to reserve a pickup")
      return
    }

    const selectedItemIds = Object.entries(selectedItems)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id)

    if (selectedItemIds.length === 0) {
      setError("Please select at least one food item")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Find the earliest pickup time from selected items
      const selectedFoodItems = foodItems.filter((item) => selectedItems[item.id])
      const earliestPickupTime = new Date(
        Math.min(...selectedFoodItems.map((item) => new Date(item.pickup_window_start).getTime())),
      )

      // Create a pickup for each selected item
      for (const itemId of selectedItemIds) {
        await createPickup({
          userId: user.id,
          restaurantId: restaurant.id,
          foodItemId: itemId,
          pickupTime: earliestPickupTime.toISOString(),
          notes,
        })
      }

      setSuccess(true)
      setTimeout(() => {
        onClose()
        if (onSuccess) onSuccess()
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to reserve pickup")
    } finally {
      setIsLoading(false)
    }
  }

  // Group food items by type
  const foodItemsByType = foodItems.reduce((acc, item) => {
    if (!acc[item.food_type]) {
      acc[item.food_type] = []
    }
    acc[item.food_type].push(item)
    return acc
  }, {})

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reserve Pickup at {restaurant?.name}</DialogTitle>
          <DialogDescription>Select the items you'd like to pick up</DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 text-green-600 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Pickup reserved successfully!</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
            <div>
              <p className="text-sm">
                {restaurant?.address}, {restaurant?.city}
              </p>
              <p className="text-xs text-gray-500">
                {restaurant?.state} {restaurant?.zip}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Available Food Items</h3>

            {Object.entries(foodItemsByType).map(([type, items]) => (
              <div key={type} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500">{type}</h4>
                <div className="space-y-2">
                  {(items as any[]).map((item) => {
                    const pickupWindow = `${format(new Date(item.pickup_window_start), "h:mm a")} - ${format(
                      new Date(item.pickup_window_end),
                      "h:mm a",
                    )}`

                    const pickupDate = format(new Date(item.pickup_window_start), "EEE, MMM d")

                    return (
                      <div
                        key={item.id}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${
                          selectedItems[item.id]
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleItemToggle(item.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                          <Badge variant="outline">{item.quantity} available</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{pickupDate}</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>{pickupWindow}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Notes for Restaurant</h3>
            <Textarea
              placeholder="Add any special instructions or notes for the restaurant"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleReserve} className="bg-green-600 hover:bg-green-700" disabled={isLoading || success}>
            {isLoading ? "Reserving..." : "Reserve Pickup"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
