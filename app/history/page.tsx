import { Calendar, Clock, MapPin, Utensils, Download, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Sample history data
const activities = [
  {
    id: 1,
    type: "pickup",
    date: "May 15, 2024",
    restaurantName: "Green Leaf Cafe",
    items: ["6 Pastries", "4 Sandwiches", "2 Salads"],
    impact: "12 meals saved, 8.5 lbs of CO2 prevented",
  },
  {
    id: 2,
    type: "donation",
    date: "April 28, 2024",
    amount: "$50.00",
    impact: "Helped provide 20 meals",
  },
  {
    id: 3,
    type: "pickup",
    date: "April 10, 2024",
    restaurantName: "Pasta Paradise",
    items: ["8 Pasta dishes", "12 Bread rolls", "4 Desserts"],
    impact: "24 meals saved, 15 lbs of CO2 prevented",
  },
  {
    id: 4,
    type: "donation",
    date: "March 12, 2024",
    amount: "$25.00",
    impact: "Helped provide 10 meals",
  },
]

export default function HistoryPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">History</h1>
          <p className="text-gray-500">View your past activities and impact</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-3">
            <TabsTrigger value="all">All Activity</TabsTrigger>
            <TabsTrigger value="pickups">Pickups</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <ActivityTimeline activities={activities} />
          </TabsContent>
          <TabsContent value="pickups" className="mt-6">
            <ActivityTimeline activities={activities.filter((a) => a.type === "pickup")} />
          </TabsContent>
          <TabsContent value="donations" className="mt-6">
            <ActivityTimeline activities={activities.filter((a) => a.type === "donation")} />
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Impact</CardTitle>
              <CardDescription>See the difference you've made</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">36</p>
                  <p className="text-center text-sm mt-1">Meals Saved</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">23.5</p>
                  <p className="text-center text-sm mt-1">lbs CO2 Prevented</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">$75</p>
                  <p className="text-center text-sm mt-1">Donated</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">30</p>
                  <p className="text-center text-sm mt-1">People Helped</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Impact
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
              <CardDescription>Your achievements so far</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                <div className="bg-green-100 p-2 rounded-full">
                  <Utensils className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">First Pickup Completed</p>
                  <p className="text-sm text-gray-500">April 10, 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                <div className="bg-green-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">One Month Anniversary</p>
                  <p className="text-sm text-gray-500">May 1, 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg opacity-50">
                <div className="bg-green-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">10 Pickups Completed</p>
                  <p className="text-sm text-gray-500">In progress (4/10)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ActivityTimeline({ activities }) {
  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <div key={activity.id} className="relative">
          {/* Timeline connector */}
          {index < activities.length - 1 && <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>}

          <div className="flex gap-4">
            {/* Timeline icon */}
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
              {activity.type === "pickup" ? (
                <Utensils className="h-6 w-6 text-green-600" />
              ) : (
                <Calendar className="h-6 w-6 text-green-600" />
              )}
            </div>

            {/* Activity card */}
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{activity.type === "pickup" ? "Food Pickup" : "Monetary Donation"}</CardTitle>
                    <CardDescription>{activity.date}</CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      activity.type === "pickup"
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : "bg-green-50 text-green-600 border-green-200"
                    }
                  >
                    {activity.type === "pickup" ? "Pickup" : "Donation"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {activity.type === "pickup" ? (
                  <>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                      <p className="text-sm">{activity.restaurantName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Items:</p>
                      <ul className="text-sm space-y-1">
                        {activity.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <p className="text-sm">Amount: {activity.amount}</p>
                  </div>
                )}

                <Separator />

                <div className="pt-1">
                  <p className="text-sm font-medium">Impact:</p>
                  <p className="text-sm text-green-600">{activity.impact}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ))}
    </div>
  )
}
