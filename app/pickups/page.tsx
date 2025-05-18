"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Clock, MapPin, AlertCircle, Truck, Phone } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"
import { getUserPickups, updatePickupStatus } from "@/app/actions/pickup-actions"

export default function PickupsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [pickups, setPickups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPickups = async () => {
      if (!user) return

      try {
        setLoading(true)
        const { pickups } = await getUserPickups(user.id)
        setPickups(pickups || [])
      } catch (err) {
        console.error("Error fetching pickups:", err)
        setError("Failed to load pickups. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchPickups()
  }, [user])

  const handleUpdateStatus = async (pickupId, newStatus) => {
    try {
      await updatePickupStatus(pickupId, newStatus)

      // Update the local state
      setPickups((prevPickups) =>
        prevPickups.map((pickup) => (pickup.id === pickupId ? { ...pickup, status: newStatus } : pickup)),
      )
    } catch (err) {
      console.error("Error updating pickup status:", err)
    }
  }

  const filteredPickups =
    activeTab === "all"
      ? pickups
      : pickups.filter((pickup) =>
          activeTab === "scheduled"
            ? pickup.status === "scheduled"
            : activeTab === "in-progress"
              ? pickup.status === "in-progress"
              : pickup.status === "completed",
        )

  if (!user) {
    return (
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Track Pickups</h1>
            <p className="text-gray-500">Please log in to view your pickups</p>
          </div>
          <Button asChild className="w-fit bg-green-600 hover:bg-green-700">
            <a href="/login">Log in</a>
          </Button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Track Pickups</h1>
            <p className="text-gray-500">Loading your pickups...</p>
          </div>
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Track Pickups</h1>
          <p className="text-gray-500">Monitor the status of your food pickups</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200">
            <AlertCircle className="h-5 w-5 inline-block mr-2" />
            {error}
          </div>
        )}

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-3">
            <TabsTrigger value="all">All Pickups</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            {filteredPickups.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">You don't have any pickups yet.</p>
                <Button asChild variant="link" className="mt-2 text-green-600">
                  <a href="/restaurants">Find restaurants</a>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPickups.map((pickup) => (
                  <PickupCard key={pickup.id} pickup={pickup} onUpdateStatus={handleUpdateStatus} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="scheduled" className="mt-6">
            {filteredPickups.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">You don't have any scheduled pickups.</p>
                <Button asChild variant="link" className="mt-2 text-green-600">
                  <a href="/restaurants">Find restaurants</a>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPickups.map((pickup) => (
                  <PickupCard key={pickup.id} pickup={pickup} onUpdateStatus={handleUpdateStatus} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            {filteredPickups.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">You don't have any completed pickups.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPickups.map((pickup) => (
                  <PickupCard key={pickup.id} pickup={pickup} onUpdateStatus={handleUpdateStatus} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function PickupCard({ pickup, onUpdateStatus }) {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "scheduled":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "in-progress":
        return <Truck className="h-5 w-5 text-yellow-600" />
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "cancelled":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getProgressValue = (status) => {
    switch (status) {
      case "scheduled":
        return 25
      case "in-progress":
        return 75
      case "completed":
        return 100
      case "cancelled":
        return 0
      default:
        return 0
    }
  }

  const formatPickupTime = (pickupTime) => {
    const date = new Date(pickupTime)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()

    const isTomorrow =
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()

    const dayText = isToday ? "Today" : isTomorrow ? "Tomorrow" : format(date, "EEE, MMM d")
    return `${dayText}, ${format(date, "h:mm a")}`
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{pickup.restaurants?.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {pickup.restaurants?.address}, {pickup.restaurants?.city}
            </CardDescription>
          </div>
          {getStatusBadge(pickup.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{formatPickupTime(pickup.pickup_time)}</span>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Items:</p>
          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div>
              <p className="text-sm font-medium">{pickup.food_items?.name}</p>
              <p className="text-xs text-gray-500">{pickup.food_items?.description}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Contact:</p>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-3.5 w-3.5 text-gray-500" />
            {pickup.restaurants?.phone}
          </div>
        </div>

        {pickup.notes && (
          <div>
            <p className="text-sm font-medium mb-1">Notes:</p>
            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md">{pickup.notes}</p>
          </div>
        )}

        {pickup.status !== "completed" && pickup.status !== "cancelled" && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium">Pickup Progress</p>
              <span className="text-xs">{getProgressValue(pickup.status)}%</span>
            </div>
            <Progress value={getProgressValue(pickup.status)} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        {pickup.status === "scheduled" && (
          <>
            <Button
              className="flex-1 bg-yellow-600 hover:bg-yellow-700"
              onClick={() => onUpdateStatus(pickup.id, "in-progress")}
            >
              Start Pickup
            </Button>
            <Button className="flex-1" variant="outline" onClick={() => onUpdateStatus(pickup.id, "cancelled")}>
              Cancel
            </Button>
          </>
        )}
        {pickup.status === "in-progress" && (
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => onUpdateStatus(pickup.id, "completed")}
          >
            Complete Pickup
          </Button>
        )}
        {pickup.status === "completed" && (
          <Button className="w-full" variant="outline">
            Leave Review
          </Button>
        )}
        {pickup.status === "cancelled" && (
          <Button asChild className="w-full" variant="outline">
            <a href="/restaurants">Find New Pickup</a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
