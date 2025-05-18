"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RegisterRestaurantForm } from "@/components/register-restaurant-form"
import { useAuth } from "@/contexts/auth-context"
import { getBrowserClient } from "@/lib/supabase"

export default function RegisterRestaurantPage() {
  const { user } = useAuth()
  const router = useRouter()
  const supabase = getBrowserClient()

  useEffect(() => {
    const checkRestaurantStatus = async () => {
      if (!user) return

      try {
        // Check if user already has a restaurant
        const { data, error } = await supabase.from("restaurants").select("id").eq("owner_id", user.id).maybeSingle()

        if (data) {
          // User already has a restaurant, redirect to dashboard
          router.push("/restaurant/dashboard")
        }
      } catch (err) {
        console.error("Error checking restaurant status:", err)
      }
    }

    checkRestaurantStatus()
  }, [user, router])

  const handleSuccess = () => {
    router.push("/restaurant/dashboard")
  }

  if (!user) {
    return (
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Register Restaurant</h1>
            <p className="text-gray-500">Please log in to register your restaurant</p>
          </div>
          <Button asChild className="w-fit bg-green-600 hover:bg-green-700">
            <a href="/login">Log in</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Button variant="ghost" className="mr-4" onClick={() => router.push("/profile")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Register as a Restaurant</h1>
            <p className="text-gray-500">Join MealShare as a food provider</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto w-full">
          <RegisterRestaurantForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  )
}
