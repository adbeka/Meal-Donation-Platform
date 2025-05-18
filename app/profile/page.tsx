"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Building, Bell, Shield, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { getBrowserClient } from "@/lib/supabase"
// Add the import for RestaurantRegistrationCard
import { RestaurantRegistrationCard } from "@/components/restaurant-registration-card"

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const supabase = getBrowserClient()

  const [profile, setProfile] = useState({
    full_name: "",
    avatar_url: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    account_type: "individual",
    organization_name: "",
    organization_description: "",
    tax_id: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        if (error) throw error

        if (data) {
          setProfile({
            full_name: data.full_name || "",
            avatar_url: data.avatar_url || "",
            phone: data.phone || "",
            address: data.address || "",
            city: data.city || "",
            state: data.state || "",
            zip: data.zip || "",
            account_type: data.account_type || "individual",
            organization_name: data.organization_name || "",
            organization_description: data.organization_description || "",
            tax_id: data.tax_id || "",
          })
        }
      } catch (error: any) {
        console.error("Error fetching profile:", error.message)
      }
    }

    fetchProfile()
  }, [user])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error: any) {
      console.error("Error signing out:", error.message)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          city: profile.city,
          state: profile.state,
          zip: profile.zip,
          account_type: profile.account_type,
          organization_name: profile.organization_name,
          organization_description: profile.organization_description,
          tax_id: profile.tax_id,
        })
        .eq("id", user.id)

      if (error) throw error

      setSuccess("Profile updated successfully")
    } catch (error: any) {
      setError(error.message || "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  if (!user) {
    return (
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-gray-500">Please log in to view your profile</p>
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar_url || "/placeholder.svg?height=96&width=96"} alt="Profile" />
                  <AvatarFallback>{profile.full_name?.charAt(0) || user.email?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{profile.full_name || "User"}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    Food Rescuer
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                    Donor
                  </Badge>
                </div>
              </div>

              <Separator className="my-6" />

              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#account">
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#notifications">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#privacy">
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy
                  </a>
                </Button>
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </nav>
            </CardContent>
          </Card>

          <div className="md:col-span-3 space-y-6">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="mt-6 space-y-6">
                <Card id="account">
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Update your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    {success && (
                      <Alert className="bg-green-50 text-green-600 border-green-200">
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}
                    <form onSubmit={handleProfileUpdate}>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>Account Type</Label>
                          <RadioGroup
                            value={profile.account_type}
                            className="flex gap-4"
                            onValueChange={(value) => setProfile((prev) => ({ ...prev, account_type: value }))}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="individual" id="individual" />
                              <Label htmlFor="individual" className="flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                Individual
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="organization" id="organization" />
                              <Label htmlFor="organization" className="flex items-center">
                                <Building className="h-4 w-4 mr-2" />
                                Organization/Charity
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="full_name">
                              {profile.account_type === "individual" ? "Full Name" : "Contact Name"}
                            </Label>
                            <Input
                              id="full_name"
                              name="full_name"
                              value={profile.full_name}
                              onChange={handleInputChange}
                              placeholder={
                                profile.account_type === "individual" ? "Enter your name" : "Enter contact name"
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={user.email || ""} disabled />
                            <p className="text-xs text-gray-500">Email cannot be changed</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={profile.phone}
                              onChange={handleInputChange}
                              placeholder="(555) 123-4567"
                            />
                          </div>
                          {profile.account_type === "organization" && (
                            <div className="space-y-2">
                              <Label htmlFor="tax_id">Tax ID / EIN</Label>
                              <Input
                                id="tax_id"
                                name="tax_id"
                                value={profile.tax_id}
                                onChange={handleInputChange}
                                placeholder="Enter Tax ID or EIN"
                              />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={profile.address}
                            onChange={handleInputChange}
                            placeholder="Enter your address"
                          />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              value={profile.city}
                              onChange={handleInputChange}
                              placeholder="City"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              name="state"
                              value={profile.state}
                              onChange={handleInputChange}
                              placeholder="State"
                            />
                          </div>
                          <div className="space-y-2 col-span-full md:col-span-1">
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input
                              id="zip"
                              name="zip"
                              value={profile.zip}
                              onChange={handleInputChange}
                              placeholder="ZIP Code"
                            />
                          </div>
                        </div>

                        {profile.account_type === "organization" && (
                          <div className="space-y-2">
                            <Label htmlFor="organization_name">Organization Name</Label>
                            <Input
                              id="organization_name"
                              name="organization_name"
                              value={profile.organization_name}
                              onChange={handleInputChange}
                              placeholder="Organization Name"
                            />
                          </div>
                        )}

                        {profile.account_type === "organization" && (
                          <div className="space-y-2">
                            <Label htmlFor="organization_description">Organization Description</Label>
                            <Textarea
                              id="organization_description"
                              name="organization_description"
                              value={profile.organization_description}
                              onChange={handleInputChange}
                              placeholder="Briefly describe your organization and mission"
                              className="min-h-[100px]"
                            />
                          </div>
                        )}

                        <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                          {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Add the RestaurantRegistrationCard here */}
                <RestaurantRegistrationCard />

                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>Update your profile image</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={profile.avatar_url || "/placeholder.svg?height=64&width=64"} alt="Profile" />
                        <AvatarFallback>{profile.full_name?.charAt(0) || user.email?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Upload New Image
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-green-600 hover:bg-green-700">Update Password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-6 space-y-6">
                <Card id="notifications">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-pickups" className="flex-1">
                            Pickup Reminders
                          </Label>
                          <Switch id="email-pickups" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-donations" className="flex-1">
                            Donation Receipts
                          </Label>
                          <Switch id="email-donations" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-news" className="flex-1">
                            Newsletter & Updates
                          </Label>
                          <Switch id="email-news" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-pickups" className="flex-1">
                            Pickup Status Updates
                          </Label>
                          <Switch id="push-pickups" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-nearby" className="flex-1">
                            Nearby Food Availability
                          </Label>
                          <Switch id="push-nearby" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-messages" className="flex-1">
                            New Messages
                          </Label>
                          <Switch id="push-messages" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-green-600 hover:bg-green-700">Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="mt-6 space-y-6">
                <Card id="privacy">
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Manage your privacy preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Profile Visibility</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="visibility-profile" className="flex-1">
                            Show my profile to other users
                          </Label>
                          <Switch id="visibility-profile" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="visibility-history" className="flex-1">
                            Show my donation history
                          </Label>
                          <Switch id="visibility-history" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data Usage</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="data-location" className="flex-1">
                            Use my location to find nearby restaurants
                          </Label>
                          <Switch id="data-location" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="data-analytics" className="flex-1">
                            Share anonymous usage data to improve the service
                          </Label>
                          <Switch id="data-analytics" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      Delete Account
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">Save Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
