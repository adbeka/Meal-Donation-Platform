"use client"

import { useState } from "react"
import { Leaf, Droplets, Map, Users, Utensils, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface ImpactDashboardProps {
  impact: any
}

export function ImpactDashboard({ impact }: ImpactDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(Math.round(num))
  }

  // Colors for charts
  const COLORS = ["#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d"]

  return (
    <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="environmental">Environmental</TabsTrigger>
        <TabsTrigger value="social">Social</TabsTrigger>
        <TabsTrigger value="trends">Trends</TabsTrigger>
        <TabsTrigger value="regional">Regional</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Food Saved</CardTitle>
              <ShoppingBag className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(impact.totalFoodSaved)} kg</div>
              <p className="text-xs text-muted-foreground">
                From {formatNumber(impact.totalPickups)} completed pickups
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Emissions Saved</CardTitle>
              <Leaf className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(impact.environmental.co2Saved)} kg</div>
              <p className="text-xs text-muted-foreground">
                Equivalent to {formatNumber(impact.environmental.co2Saved / 167)} car trips around the Earth
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meals Provided</CardTitle>
              <Utensils className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(impact.social.mealsProvided)}</div>
              <p className="text-xs text-muted-foreground">
                Helping feed {formatNumber(impact.social.mealsProvided / 90)} people for a month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Size</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(impact.totalRestaurants + impact.totalUsers)}</div>
              <p className="text-xs text-muted-foreground">
                {formatNumber(impact.totalRestaurants)} restaurants and {formatNumber(impact.totalUsers)} users
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Monthly Impact</CardTitle>
              <CardDescription>Food saved and CO₂ emissions prevented over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={impact.monthlyStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickFormatter={(value) => {
                      const [year, month] = value.split("-")
                      return `${month}/${year.slice(2)}`
                    }}
                  />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "Food Saved") return [`${formatNumber(value)} kg`, name]
                      if (name === "CO₂ Saved") return [`${formatNumber(value)} kg`, name]
                      return [value, name]
                    }}
                    labelFormatter={(label) => {
                      const [year, month] = label.split("-")
                      const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
                      return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="foodSaved"
                    name="Food Saved"
                    stroke="#16a34a"
                    activeDot={{ r: 8 }}
                  />
                  <Line yAxisId="right" type="monotone" dataKey="co2Saved" name="CO₂ Saved" stroke="#4ade80" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Food Type Distribution</CardTitle>
              <CardDescription>Types of food saved from waste</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={impact.foodTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="quantity"
                    nameKey="type"
                    label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {impact.foodTypeDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${formatNumber(value)} items`, props.payload.type]} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="environmental" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Emissions Saved</CardTitle>
              <Leaf className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(impact.environmental.co2Saved)} kg</div>
              <p className="text-xs text-muted-foreground">
                Equivalent to {formatNumber(impact.environmental.co2Saved / 167)} car trips around the Earth
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Saved</CardTitle>
              <Droplets className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(impact.environmental.waterSaved)} L</div>
              <p className="text-xs text-muted-foreground">
                Equivalent to {formatNumber(impact.environmental.waterSaved / 2000)} household's yearly water use
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Land Use Saved</CardTitle>
              <Map className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(impact.environmental.landSaved)} hectares</div>
              <p className="text-xs text-muted-foreground">
                Equivalent to {formatNumber(impact.environmental.landSaved * 1.4)} football fields
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Environmental Impact Over Time</CardTitle>
            <CardDescription>Monthly CO₂ emissions saved (kg)</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impact.monthlyStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickFormatter={(value) => {
                    const [year, month] = value.split("-")
                    return `${month}/${year.slice(2)}`
                  }}
                />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${formatNumber(value)} kg`, "CO₂ Saved"]}
                  labelFormatter={(label) => {
                    const [year, month] = label.split("-")
                    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
                    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
                  }}
                />
                <Legend />
                <Bar dataKey="co2Saved" name="CO₂ Saved" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="social" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meals Provided</CardTitle>
              <Utensils className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(impact.social.mealsProvided)}</div>
              <p className="text-xs text-muted-foreground">
                Helping feed {formatNumber(impact.social.mealsProvided / 90)} people for a month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Restaurants Participating</CardTitle>
              <Utensils className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(impact.totalRestaurants)}</div>
              <p className="text-xs text-muted-foreground">Committed to reducing food waste</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(impact.totalUsers)}</div>
              <p className="text-xs text-muted-foreground">Helping reduce food waste in their communities</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Community Growth</CardTitle>
            <CardDescription>Monthly pickups completed</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impact.monthlyStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickFormatter={(value) => {
                    const [year, month] = value.split("-")
                    return `${month}/${year.slice(2)}`
                  }}
                />
                <YAxis />
                <Tooltip
                  formatter={(value) => [value, "Pickups"]}
                  labelFormatter={(label) => {
                    const [year, month] = label.split("-")
                    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
                    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
                  }}
                />
                <Legend />
                <Bar dataKey="pickups" name="Pickups" fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="trends" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Food Saved</CardTitle>
              <CardDescription>Kilograms of food saved per month</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={impact.monthlyStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickFormatter={(value) => {
                      const [year, month] = value.split("-")
                      return `${month}/${year.slice(2)}`
                    }}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${formatNumber(value)} kg`, "Food Saved"]}
                    labelFormatter={(label) => {
                      const [year, month] = label.split("-")
                      const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
                      return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="foodSaved" name="Food Saved" stroke="#16a34a" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Pickups</CardTitle>
              <CardDescription>Number of completed pickups per month</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={impact.monthlyStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickFormatter={(value) => {
                      const [year, month] = value.split("-")
                      return `${month}/${year.slice(2)}`
                    }}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [value, "Pickups"]}
                    labelFormatter={(label) => {
                      const [year, month] = label.split("-")
                      const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
                      return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="pickups" name="Pickups" stroke="#4ade80" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Food Type Trends</CardTitle>
            <CardDescription>Distribution of food types saved from waste</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={impact.foodTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="quantity"
                  nameKey="type"
                  label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                >
                  {impact.foodTypeDistribution.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${formatNumber(value)} items`, props.payload.type]} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="regional" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Regional Impact</CardTitle>
              <CardDescription>Food saved by city (kg)</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={impact.regionalImpact}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="city" />
                  <Tooltip formatter={(value) => [`${formatNumber(value)} kg`, "Food Saved"]} />
                  <Legend />
                  <Bar dataKey="foodSaved" name="Food Saved" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Participation</CardTitle>
              <CardDescription>Number of pickups by city</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={impact.regionalImpact}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="city" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pickups" name="Pickups" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Impact Summary by Region</CardTitle>
            <CardDescription>Food saved and pickups by city</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">City</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Pickups</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Food Saved (kg)</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">CO₂ Saved (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {impact.regionalImpact.map((region: any, index: number) => (
                    <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">{region.city}</td>
                      <td className="p-4 align-middle">{formatNumber(region.pickups)}</td>
                      <td className="p-4 align-middle">{formatNumber(region.foodSaved)}</td>
                      <td className="p-4 align-middle">{formatNumber(region.foodSaved * 2.5)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
