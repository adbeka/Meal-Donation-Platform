"use client"

import { useState } from "react"
import { CreditCard, DollarSign, ShoppingBag, ArrowRight, Building, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function DonationsPage() {
  const [donationType, setDonationType] = useState("money")

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Donations</h1>
          <p className="text-gray-500">Support our mission by donating funds or food</p>
        </div>

        <Tabs defaultValue="donate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-2">
            <TabsTrigger value="donate">Make a Donation</TabsTrigger>
            <TabsTrigger value="history">Donation History</TabsTrigger>
          </TabsList>
          <TabsContent value="donate" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Make a Donation</CardTitle>
                  <CardDescription>Choose how you'd like to contribute</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    defaultValue="money"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    onValueChange={setDonationType}
                  >
                    <div>
                      <RadioGroupItem value="money" id="money" className="peer sr-only" />
                      <Label
                        htmlFor="money"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-600 [&:has([data-state=checked])]:border-green-600"
                      >
                        <DollarSign className="mb-3 h-6 w-6" />
                        <div className="text-center">
                          <p className="font-medium">Monetary Donation</p>
                          <p className="text-sm text-muted-foreground">Donate funds to support our operations</p>
                        </div>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="food" id="food" className="peer sr-only" />
                      <Label
                        htmlFor="food"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-600 [&:has([data-state=checked])]:border-green-600"
                      >
                        <ShoppingBag className="mb-3 h-6 w-6" />
                        <div className="text-center">
                          <p className="font-medium">Food Donation</p>
                          <p className="text-sm text-muted-foreground">Register food items for donation</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <Separator />

                  {donationType === "money" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Donation Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                          <Input id="amount" type="number" placeholder="0.00" className="pl-9" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" className="w-full">
                          $10
                        </Button>
                        <Button variant="outline" className="w-full">
                          $25
                        </Button>
                        <Button variant="outline" className="w-full">
                          $50
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card">Card Information</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                          <Input id="card" placeholder="Card number" className="pl-9" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="CVC" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>I am donating as a</Label>
                        <RadioGroup defaultValue="individual" className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="individual" id="individual" />
                            <Label htmlFor="individual" className="flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              Individual
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="business" id="business" />
                            <Label htmlFor="business" className="flex items-center">
                              <Building className="h-4 w-4 mr-2" />
                              Business
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="food-type">Food Type</Label>
                        <Select>
                          <SelectTrigger id="food-type">
                            <SelectValue placeholder="Select food type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prepared">Prepared Meals</SelectItem>
                            <SelectItem value="produce">Fresh Produce</SelectItem>
                            <SelectItem value="canned">Canned Goods</SelectItem>
                            <SelectItem value="bakery">Bakery Items</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quantity">Approximate Quantity</Label>
                        <Input id="quantity" placeholder="e.g., 5 meals, 10 lbs of produce" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pickup-address">Pickup Address</Label>
                        <Input id="pickup-address" placeholder="Enter address for pickup" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pickup-time">Preferred Pickup Time</Label>
                        <Select>
                          <SelectTrigger id="pickup-time">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                            <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    {donationType === "money" ? "Complete Donation" : "Register Food Donation"}
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Donation Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                      <p className="text-4xl font-bold text-green-600">$25</p>
                      <p className="text-center text-sm">Provides meals for 10 people in need</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                      <p className="text-4xl font-bold text-green-600">$50</p>
                      <p className="text-center text-sm">Helps rescue 100 lbs of food from waste</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                      <p className="text-4xl font-bold text-green-600">$100</p>
                      <p className="text-center text-sm">Supports a local charity for a week</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      If you have questions about donations or need assistance, our team is here to help.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="history" className="mt-6">
            <DonationHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function DonationHistory() {
  // Sample donation history data
  const donations = [
    {
      id: 1,
      date: "May 15, 2024",
      type: "Monetary",
      amount: "$50.00",
      status: "Completed",
      receipt: "#D12345",
    },
    {
      id: 2,
      date: "April 28, 2024",
      type: "Food",
      amount: "10 meals",
      status: "Completed",
      receipt: "#F67890",
    },
    {
      id: 3,
      date: "March 12, 2024",
      type: "Monetary",
      amount: "$25.00",
      status: "Completed",
      receipt: "#D23456",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Donation History</CardTitle>
          <CardDescription>View all your past contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 p-4 font-medium border-b">
              <div>Date</div>
              <div>Type</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Receipt</div>
            </div>
            {donations.map((donation) => (
              <div key={donation.id} className="grid grid-cols-5 p-4 border-b last:border-0">
                <div>{donation.date}</div>
                <div>{donation.type}</div>
                <div>{donation.amount}</div>
                <div>{donation.status}</div>
                <div>
                  <Button variant="link" className="p-0 h-auto">
                    {donation.receipt}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Impact</CardTitle>
          <CardDescription>See the difference your donations have made</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg">
              <p className="text-4xl font-bold text-green-600">$75</p>
              <p className="text-center text-sm mt-2">Total Monetary Donations</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg">
              <p className="text-4xl font-bold text-green-600">10</p>
              <p className="text-center text-sm mt-2">Meals Donated</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg">
              <p className="text-4xl font-bold text-green-600">30</p>
              <p className="text-center text-sm mt-2">People Helped</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Make Another Donation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
