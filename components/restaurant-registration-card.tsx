"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Store } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { getBrowserClient } from "@/lib/supabase"

export function RestaurantRegistrationCard() {
  const { user } = useAuth()
  const router = useRouter()
  const [hasRestaurant, setHasRestaurant] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = getBrowserClient()

  useEffect(() => {
    const checkRestaurantStatus = async () => {
      if (!user) return

      try {
        setLoading(true)

        // Check if user already has a restaurant
        const { data, error } = await supabase.from("restaurants").select("id").eq("owner_id", user.id).maybeSingle()

        if (data) {
          setHasRestaurant(true)
        }
      } catch (err) {
        console.error("Error checking restaurant status:", err)
      } finally {
        setLoading(false)
      }
    }

    checkRestaurantStatus()
  }, [user])

  if (loading) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant Management</CardTitle>
        <CardDescription>
          {hasRestaurant
            ? "Manage your restaurant and food listings"
            : "Register as a restaurant to share surplus food"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <Store className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium">{hasRestaurant ? "Restaurant Dashboard" : "Become a Food Provider"}</h3>
            <p className="text-sm text-gray-500">
              {hasRestaurant
                ? "Access your restaurant dashboard to manage food listings and pickups"
                : "Register your restaurant to start sharing surplus food with those in need"}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={() => router.push(hasRestaurant ? "/restaurant/dashboard" : "/profile/restaurant")}
        >
          {hasRestaurant ? "Go to Restaurant Dashboard" : "Register as a Restaurant"}
        </Button>
      </CardFooter>
    </Card>
  )
}
