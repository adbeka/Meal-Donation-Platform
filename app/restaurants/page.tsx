"use client"

import { useEffect, useState } from "react"
import { MapPin, Clock, Filter, Info, Search, Locate, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getBrowserClient } from "@/lib/supabase"
import { format } from "date-fns"
import { useAuth } from "@/contexts/auth-context"
import { ReservationModal } from "@/components/reservation-modal"
import { calculateDistance, formatDistance } from "@/utils/distance"

export default function RestaurantsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [restaurants, setRestaurants] = useState([])
  const [foodItems, setFoodItems] = useState({})
  const [loading, setLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const [location, setLocation] = useState("")
  const [foodType, setFoodType] = useState("all")
  const [pickupTime, setPickupTime] = useState("all")
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [allRestaurants, setAllRestaurants] = useState([])
  const [userCoordinates, setUserCoordinates] = useState(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const supabase = getBrowserClient()

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data: restaurantsData, error: restaurantsError } = await supabase
        .from("restaurants")
        .select("*")
        .eq("is_active", true)

      if (restaurantsError) throw restaurantsError

      // Add distance property if user coordinates are available
      let restaurantsWithDistance = restaurantsData || []
      if (userCoordinates) {
        restaurantsWithDistance = restaurantsWithDistance.map((restaurant) => {
          if (restaurant.latitude && restaurant.longitude) {
            const distance = calculateDistance(
              userCoordinates.latitude,
              userCoordinates.longitude,
              restaurant.latitude,
              restaurant.longitude,
            )
            return { ...restaurant, distance }
          }
          return { ...restaurant, distance: null }
        })
      }

      setAllRestaurants(restaurantsWithDistance)
      setRestaurants(restaurantsWithDistance)

      // Fetch food items for each restaurant
      const foodItemsMap = {}
      for (const restaurant of restaurantsData || []) {
        const { data: foodItemsData, error: foodItemsError } = await supabase
          .from("food_items")
          .select("*")
          .eq("restaurant_id", restaurant.id)
          .eq("is_available", true)

        if (foodItemsError) throw foodItemsError

        foodItemsMap[restaurant.id] = foodItemsData || []
      }

      setFoodItems(foodItemsMap)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Update restaurants when user coordinates change
  useEffect(() => {
    if (userCoordinates && allRestaurants.length > 0) {
      const restaurantsWithDistance = allRestaurants.map((restaurant) => {
        if (restaurant.latitude && restaurant.longitude) {
          const distance = calculateDistance(
            userCoordinates.latitude,
            userCoordinates.longitude,
            restaurant.latitude,
            restaurant.longitude,
          )
          return { ...restaurant, distance }
        }
        return { ...restaurant, distance: null }
      })

      setAllRestaurants(restaurantsWithDistance)

      // Apply current filters to the updated restaurants
      handleSearch(restaurantsWithDistance)
    }
  }, [userCoordinates])

  // Sort restaurants when sortBy changes
  useEffect(() => {
    if (sortBy === "distance" && restaurants.length > 0) {
      const sorted = [...restaurants].sort((a, b) => {
        if (a.distance === null) return 1
        if (b.distance === null) return -1
        return a.distance - b.distance
      })
      setRestaurants(sorted)
    } else if (sortBy === "default") {
      // Reset to original order
      handleSearch()
    }
  }, [sortBy])

  const getUserLocation = () => {
    setLocationLoading(true)
    setLocationError("")

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      setLocationLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setUserCoordinates({ latitude, longitude })

        try {
          // Attempt to get address from coordinates using reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
          )
          const data = await response.json()

          if (data && data.address) {
            const address = data.address
            const city = address.city || address.town || address.village || ""
            const state = address.state || ""

            if (city) {
              setLocation(city)
            }
          }

          // Sort restaurants by distance
          setSortBy("distance")
        } catch (error) {
          console.error("Error getting address from coordinates:", error)
        }

        setLocationLoading(false)
      },
      (error) => {
        console.error("Error getting location:", error)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location permission denied. Please enable location services.")
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.")
            break
          case error.TIMEOUT:
            setLocationError("The request to get location timed out.")
            break
          default:
            setLocationError("An unknown error occurred while getting location.")
            break
        }
        setLocationLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  const handleSearch = (restaurantsToFilter = allRestaurants) => {
    setSearchLoading(true)

    // Filter restaurants based on user selections
    const filtered = restaurantsToFilter.filter((restaurant) => {
      // Filter by location
      if (
        location &&
        !restaurant.address?.toLowerCase().includes(location.toLowerCase()) &&
        !restaurant.city?.toLowerCase().includes(location.toLowerCase()) &&
        !restaurant.zip?.toLowerCase().includes(location.toLowerCase()) &&
        !restaurant.state?.toLowerCase().includes(location.toLowerCase())
      ) {
        return false
      }

      // Filter by food type
      if (foodType !== "all") {
        const restaurantFoodItems = foodItems[restaurant.id] || []
        const hasFoodType = restaurantFoodItems.some((item) => item.food_type.toLowerCase() === foodType.toLowerCase())
        if (!hasFoodType) return false
      }

      // Filter by pickup time
      if (pickupTime !== "all") {
        const restaurantFoodItems = foodItems[restaurant.id] || []
        const now = new Date()

        if (pickupTime === "today") {
          const endOfDay = new Date(now)
          endOfDay.setHours(23, 59, 59, 999)

          const hasPickupToday = restaurantFoodItems.some((item) => new Date(item.pickup_window_end) <= endOfDay)
          if (!hasPickupToday) return false
        } else if (pickupTime === "tomorrow") {
          const startOfTomorrow = new Date(now)
          startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)
          startOfTomorrow.setHours(0, 0, 0, 0)

          const endOfTomorrow = new Date(startOfTomorrow)
          endOfTomorrow.setHours(23, 59, 59, 999)

          const hasPickupTomorrow = restaurantFoodItems.some(
            (item) =>
              new Date(item.pickup_window_start) >= startOfTomorrow &&
              new Date(item.pickup_window_end) <= endOfTomorrow,
          )
          if (!hasPickupTomorrow) return false
        }
      }

      return true
    })

    // Sort by distance if that option is selected
    let sortedFiltered = [...filtered]
    if (sortBy === "distance") {
      sortedFiltered = sortedFiltered.sort((a, b) => {
        if (a.distance === null) return 1
        if (b.distance === null) return -1
        return a.distance - b.distance
      })
    }

    setRestaurants(sortedFiltered)

    // Simulate a short delay to show the loading state
    setTimeout(() => {
      setSearchLoading(false)
    }, 500)
  }

  const handleReserveClick = (restaurant) => {
    if (!user) {
      router.push("/login?redirect=/restaurants")
      return
    }

    setSelectedRestaurant(restaurant)
    setIsReservationModalOpen(true)
  }

  const handleReservationSuccess = () => {
    // Refresh the data to update availability
    fetchData()
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const resetFilters = () => {
    setLocation("")
    setFoodType("all")
    setPickupTime("all")
    setSortBy("default")
    setRestaurants(allRestaurants)
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Find Restaurants</h1>
            <p className="text-gray-500">Loading restaurants...</p>
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
          <h1 className="text-3xl font-bold tracking-tight">Find Restaurants</h1>
          <p className="text-gray-500">Discover nearby restaurants offering surplus food</p>
        </div>

        {locationError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription>{locationError}</AlertDescription>
          </Alert>
        )}

        {/* Filters */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative w-full md:w-auto flex-1">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-9 pr-24"
                placeholder="Search by city, address, or zip code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Info className="h-4 w-4 text-gray-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Search by city, street address, state, or zip code</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  onClick={() => handleSearch()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={searchLoading}
                >
                  {searchLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span className="ml-2">Search</span>
                </Button>
              </div>
            </div>
            <Button onClick={getUserLocation} variant="outline" className="w-full md:w-auto" disabled={locationLoading}>
              {locationLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Locate className="h-4 w-4 mr-2" />
              )}
              Use My Location
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Select
              value={foodType}
              onValueChange={(value) => {
                setFoodType(value)
              }}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Food Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Food Types</SelectItem>
                <SelectItem value="pastries">Pastries</SelectItem>
                <SelectItem value="sandwiches">Sandwiches</SelectItem>
                <SelectItem value="pasta">Pasta</SelectItem>
                <SelectItem value="bread">Bread</SelectItem>
                <SelectItem value="salads">Salads</SelectItem>
                <SelectItem value="bowls">Bowls</SelectItem>
                <SelectItem value="wraps">Wraps</SelectItem>
                <SelectItem value="desserts">Desserts</SelectItem>
                <SelectItem value="cakes">Cakes</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={pickupTime}
              onValueChange={(value) => {
                setPickupTime(value)
              }}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <Clock className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Pickup Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value)
              }}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="distance" disabled={!userCoordinates}>
                  Distance (Nearest First)
                </SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={resetFilters} className="w-full md:w-auto">
              Clear Filters
            </Button>
          </div>
        </div>

        <Separator />

        {/* Restaurant Cards */}
        {restaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No restaurants found matching your criteria.</p>
            <Button variant="link" className="mt-2 text-green-600" onClick={resetFilters}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => {
              const restaurantFoodItems = foodItems[restaurant.id] || []
              const foodTypes = [...new Set(restaurantFoodItems.map((item) => item.food_type))]

              // Find the earliest and latest pickup times
              let earliestPickup = null
              let latestPickup = null

              if (restaurantFoodItems.length > 0) {
                earliestPickup = new Date(
                  Math.min(...restaurantFoodItems.map((item) => new Date(item.pickup_window_start).getTime())),
                )
                latestPickup = new Date(
                  Math.max(...restaurantFoodItems.map((item) => new Date(item.pickup_window_end).getTime())),
                )
              }

              // Format pickup times
              let pickupTimeText = "No pickups available"
              if (earliestPickup && latestPickup) {
                const today = new Date()
                const tomorrow = new Date(today)
                tomorrow.setDate(tomorrow.getDate() + 1)

                const isToday =
                  earliestPickup.getDate() === today.getDate() &&
                  earliestPickup.getMonth() === today.getMonth() &&
                  earliestPickup.getFullYear() === today.getFullYear()

                const isTomorrow =
                  earliestPickup.getDate() === tomorrow.getDate() &&
                  earliestPickup.getMonth() === tomorrow.getMonth() &&
                  earliestPickup.getFullYear() === tomorrow.getFullYear()

                const dayText = isToday ? "Today" : isTomorrow ? "Tomorrow" : format(earliestPickup, "MMM d")
                pickupTimeText = `${dayText}, ${format(earliestPickup, "h:mm a")} - ${format(latestPickup, "h:mm a")}`
              }

              const hasAvailableItems = restaurantFoodItems.length > 0

              return (
                <Card key={restaurant.id} className="overflow-hidden">
                  <img
                    src={restaurant.image_url || "/placeholder.svg?height=200&width=300"}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{restaurant.name}</CardTitle>
                    <CardDescription>{restaurant.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                      <div className="flex-1">
                        <p className="text-sm">
                          {restaurant.address}, {restaurant.city}
                        </p>
                        <p className="text-xs text-gray-500">
                          {restaurant.state} {restaurant.zip}
                          {restaurant.distance !== null && (
                            <span className="ml-2 font-medium text-green-600">
                              {formatDistance(restaurant.distance)}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 text-gray-500" />
                      <p className="text-sm">{pickupTimeText}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {foodTypes.map((type) => (
                        <Badge key={type} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!hasAvailableItems}
                      onClick={() => handleReserveClick(restaurant)}
                    >
                      {hasAvailableItems ? "Reserve Pickup" : "No Items Available"}
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {selectedRestaurant && (
        <ReservationModal
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
          restaurant={selectedRestaurant}
          foodItems={foodItems[selectedRestaurant.id] || []}
          onSuccess={handleReservationSuccess}
        />
      )}
    </div>
  )
}
