"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RestaurantDashboardLayout } from "@/components/restaurant-dashboard-layout"
import { useAuth } from "@/contexts/auth-context"
import { getBrowserClient } from "@/lib/supabase"

export default function RestaurantSettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [restaurant, setRestaurant] = useState(null)
  const supabase = getBrowserClient()

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!user) {
        router.push("/login?redirect=/restaurant/settings")
        return
      }

      try {
        setLoading(true)
        const { data, error } = await supabase.from("restaurants").select("*").eq("owner_id", user.id).single()

        if (error) {
          console.error("Error fetching restaurant:", error)
          toast.error("Failed to load restaurant information")
          router.push("/profile")
          return
        }

        setRestaurant(data)
      } catch (error) {
        console.error("Error:", error)
        toast.error("An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurant()
  }, [user, router, supabase])

  const handleChange = (e) => {
    const { name, value } = e.target
    setRestaurant((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (name, checked) => {
    setRestaurant((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!restaurant) return

    try {
      setSaving(true)

      const { error } = await supabase
        .from("restaurants")
        .update({
          name: restaurant.name,
          description: restaurant.description,
          address: restaurant.address,
          city: restaurant.city,
          state: restaurant.state,
          zip: restaurant.zip,
          phone: restaurant.phone,
          email: restaurant.email,
          website: restaurant.website,
          image_url: restaurant.image_url,
          is_active: restaurant.is_active,
        })
        .eq("id", restaurant.id)

      if (error) {
        console.error("Error updating restaurant:", error)
        toast.error("Failed to update restaurant information")
        return
      }

      toast.success("Restaurant information updated successfully")
    } catch (error) {
      console.error("Error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <RestaurantDashboardLayout>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Restaurant Settings</h1>
            <p className="text-gray-500">Loading restaurant information...</p>
          </div>
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </div>
      </RestaurantDashboardLayout>
    )
  }

  if (!restaurant) {
    return (
      <RestaurantDashboardLayout>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Restaurant Settings</h1>
            <p className="text-gray-500">No restaurant found</p>
          </div>
          <Button onClick={() => router.push("/profile/restaurant")} className="w-fit">
            Register Your Restaurant
          </Button>
        </div>
      </RestaurantDashboardLayout>
    )
  }

  return (
    <RestaurantDashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Restaurant Settings</h1>
          <p className="text-gray-500">Manage your restaurant information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your restaurant's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input id="name" name="name" value={restaurant.name || ""} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    name="image_url"
                    value={restaurant.image_url || ""}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={restaurant.description || ""}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update your restaurant's contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" value={restaurant.phone || ""} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={restaurant.email || ""} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={restaurant.website || ""}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Update your restaurant's location information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" name="address" value={restaurant.address || ""} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={restaurant.city || ""} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" value={restaurant.state || ""} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" name="zip" value={restaurant.zip || ""} onChange={handleChange} required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Restaurant Status</CardTitle>
              <CardDescription>Control your restaurant's visibility on the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="is_active">Active Status</Label>
                  <p className="text-sm text-gray-500">When turned off, your restaurant will not be visible to users</p>
                </div>
                <Switch
                  id="is_active"
                  checked={restaurant.is_active || false}
                  onCheckedChange={(checked) => handleSwitchChange("is_active", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </RestaurantDashboardLayout>
  )
}
